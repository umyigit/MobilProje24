import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { API_BASE_URL } from '../../constants/Config';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';


const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<string[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  useEffect(() => {
    fetch(`${API_BASE_URL}/display_alerts`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success' && data.alerts && data.alerts.length > 0) {
          setNotifications(data.alerts);
        }
        else {
         // console.error('Error fetching alerts:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  useEffect(() => {
    setNotificationCount(notifications.length);
  }, [notifications]);

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-circle-o-left" size={30} color="black" />
      </TouchableOpacity>
      {notifications.map((notification, index) => (
        <Text key={index} style={styles.notificationText}>
          {notification}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eee2df',
    borderRadius: 5,
    top: 40,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 100, 
},
});

export default NotificationScreen;