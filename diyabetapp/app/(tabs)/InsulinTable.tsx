import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { API_BASE_URL } from '../../constants/Config';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList3 } from './types';
import { FontAwesome } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from 'axios';
import { schedulePushNotification } from './NotificationsService';
import NotificationScreen from './NotificationScreen';
import MainScreen from './MainScreen';


interface Entry {
  bloodSugar: string[];
  insulinDose: string[];
}

const getTurkishDayName = (date: Date) => {
  const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  return days[date.getDay()];
};

type NotificationScreenProp = StackNavigationProp<RootStackParamList3, 'NotificationScreen'>;

const InsulinTable: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList3, 'InsulinTable'>>();
  const email = route.params?.email;
  const navigation = useNavigation<NotificationScreenProp>();
  const [entries, setEntries] = useState<Record<string, Entry>>({});
  const [times, setTimes] = useState<string[]>([]);
  const [date, setDate] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [previousDay, setPreviousDay] = useState<string>('');
  const [notifications, setNotifications] = useState<string[]>([]);


  useEffect(() => {
    const fetchInsulinUnits = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/insulin_units/${email}`);
        const data = await response.json();
        const insulinUnitsCount = parseInt(data.insulinUnits, 10);

        if (isNaN(insulinUnitsCount)) {
          throw new Error('Invalid insulin units value');
        }
        const today = new Date();
        const previousDay = new Date(today.setDate(today.getDate()));
        const formattedDate = today.toLocaleDateString('tr-TR').replace(/\./g, '-');;
        const dayName = getTurkishDayName(previousDay);

        setDate(formattedDate);
        setDay(dayName);

        const bloodSugarCount = insulinUnitsCount * 2;
        const timesArray: string[] = [];
        for (let i = 0; i < insulinUnitsCount - 1; i++) {
          if (insulinUnitsCount <= 4) {
            let a = 8;
            if (i == 0) {
              timesArray.push(`${i * 2 + a}:00\n(AÇ)`);
              timesArray.push(`${i * 2 + a + 2}:00\n(TOK)`);
            }
            if (i == 1) {
              timesArray.push(`${i * 2 + a + 2}:00\n(AÇ)`);
              timesArray.push(`${i * 2 + a + 4}:00\n(TOK)`);
            }
            if (i % 2 == 0 && i != 2 && i != 0) {
              timesArray.push(`${i * 2 + a}:00\n(AÇ)`);
              timesArray.push(`${i * 2 + a + 2}:00\n(TOK)`);
            }
            if (i == 2) {
              timesArray.push(`${i * 2 + a + 4}:00\n(AÇ)`);
              timesArray.push(`${i * 2 + a + 6}:00\n(TOK)`);
            }
            if (i % 2 != 0 && i != 1) {
              timesArray.push(`${i * 2 + a + 6}:00\n(AÇ)`);
              timesArray.push(`${i * 2 + a + 8}:00\n(TOK)`);
            }
          }
          if (insulinUnitsCount >= 5) {
            let a = 15 / (insulinUnitsCount * 2);
            if (i == 0) {
              timesArray.push(`${i * 2 + 8}:00\n(AÇ)`);
              timesArray.push(`${i * 2 + 8 + a}\n(TOK)`);
            }
            if (i % 2 == 0 && i != 0) {
              timesArray.push(`${i * 2 + 8 + 4 + a}\n(AÇ)`);
              timesArray.push(`${i * 2 + 8 + 4 * a}\n(TOK)`);
            }
            if (i % 2 != 0) {
              timesArray.push(`${i * 2 + 8 + 2 * a}\n(AÇ)`);
              timesArray.push(`${i * 2 + 8 + 4 + a}\n(TOK)`);
            }
          }
        }

        timesArray.push('23:00\n(AÇ)');
        timesArray.push('03:00\n(GECE)');

        setTimes(timesArray);

        setEntries((prevEntries) => ({
          ...prevEntries,
          [formattedDate]: {
            bloodSugar: Array(bloodSugarCount).fill(''),
            insulinDose: Array(insulinUnitsCount).fill(''),
          },
        }));
      } catch (error) {
        console.error('Failed to fetch insulin units:', error);
        //Alert.alert('Error', 'Unable to fetch insulin units');
      }
    };

    fetchInsulinUnits();
  }, [email]);

  const handleInputChange = (type: 'bloodSugar' | 'insulinDose', index: number, value: string) => {
    setEntries((prevEntries) => ({
      ...prevEntries,
      [date]: {
        ...prevEntries[date],
        [type]: prevEntries[date] ? prevEntries[date][type].map((item, i) => (i === index ? value : item)) : [],
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const insulinResponse = await fetch(`${API_BASE_URL}/insulin_record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          entries: entries,
          date: date,
        }),
      });
      const insulinResult = await insulinResponse.json();
      if (insulinResponse.ok) {
        const checkResponse = await fetch(`${API_BASE_URL}/check_blood_sugar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            entries: entries,
            date: date,
          }),
        });
        const checkResult = await checkResponse.json();
        console.log('checkResult:', checkResult);
        if (checkResponse.ok) {
          const checkResultAlerts = checkResult.alerts; 
          checkResultAlerts.forEach(alert => {
            const mesaj = JSON.stringify(alert);
            console.log(mesaj);
            const title = "DİKKAT!!!!!";
            const body = mesaj;
            const data = { data: 'goes here', test: { test1: 'more data' } };
          
            schedulePushNotification(title, body, data);
          });
          if (checkResult.alerts && checkResult.alerts.length > 0) {
            Alert.alert(
              '', 
              'KAYIT BAŞARILI.',  
              [
                {text: 'TAMAM', onPress: () => navigation.navigate('MainScreen', { email: email })},  
              ],
              {cancelable: false} 
            );
            

            fetch(`${API_BASE_URL}/parse_message`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: JSON.stringify(checkResult.alerts) }),
            })
              .then(response => response.json())
              .then(data => {
                
                console.log('Success:', data);
              })
              .catch(error => {
                console.error('Error:', error);
              });
          } else {
           // Alert.alert('Başarılı', checkResult.message);
          }
        } else {
        //  Alert.alert('Hata', checkResult.error || 'Bir hata oluştu');
        }
      } else {
        //Alert.alert('Hata', insulinResult.error || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error('Sunucu ile bağlantı hatası:', error);
      //Alert.alert('Hata', 'Sunucuya bağlanırken bir hata oluştu');
    }
  };

  const renderInputCell = (type: 'bloodSugar' | 'insulinDose', index: number) => {
    return (
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange(type, index, text)}
        value={type === 'bloodSugar' ? entries[date]?.bloodSugar[index] : entries[date]?.insulinDose[index]}
        placeholder={type === 'bloodSugar' ? 'Kan Şekeri' : 'İnsülin Dozu'}
        keyboardType="numeric"
      />
    );
  };

  const renderInsulinDoseCell = (index: number) => {
    const doseIndex = Math.floor(index / 2);
    return (
      <Cell
        data={
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange('insulinDose', doseIndex, text)}
            value={entries[date]?.insulinDose[doseIndex]}
            placeholder="İnsülin Dozu"
            keyboardType="numeric"
          />
        }
        width={widthArr[3]}
        textStyle={styles.text}
      />
    );
  };

  const tableHead = ['TARİH', 'SAAT', 'KAN\nŞEKERİ', 'İNSÜLİN\nDOZU'];
  const widthArr = [100, 68, 95, 107];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-circle-o-left" size={30} color="black" />
      </TouchableOpacity>

      <View style={styles.tableContainer}>
        <Table borderStyle={{ borderWidth: 2, borderColor: 'white' }}>
          <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.tableHeaderText} />
          <TableWrapper style={styles.row}>
            <Cell data={`${date}\n${day}`} width={widthArr[0]} textStyle={styles.text} />
            <TableWrapper style={styles.innerTable}>
              {times.map((time, index) => (
                <TableWrapper key={index} style={styles.innerRow}>
                  <Cell data={time} width={widthArr[1]} textStyle={styles.text} />
                  <Cell data={renderInputCell('bloodSugar', index)} width={widthArr[2]} textStyle={styles.text} />
                  {index % 2 === 0 ? renderInsulinDoseCell(index) : <Cell data={null} width={widthArr[3]} />}
                </TableWrapper>
              ))}
            </TableWrapper>
          </TableWrapper>
        </Table>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Kayıtları Gönder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#eee2df',
  },
  tableContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    height: 80,
    backgroundColor: '#F5DCF0',
  },
  tableHeaderText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#3E2723',
    fontSize: 18,
  },
  text: {
    textAlign: 'center',
    color: '#3E2723',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#F8EBEB',
  },
  innerRow: {
    flexDirection: 'row',
    backgroundColor: '#F8EBEB',
  },
  innerTable: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 45.3,
    borderColor: 'gray',
    borderWidth: 0.6,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 14,
    backgroundColor: '#fff',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#703879',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 100,
  },
});

export default InsulinTable;
