import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground ,Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList3 } from './types';
import { Card, TextInput, Button, Text, Avatar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { API_BASE_URL } from '../../constants/Config';


const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList3>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    function validateEmail(email: string | null | undefined): boolean {
        if (!email) return false; 
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    
  
    const handleLogin = async (email, password) => {
        fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
          if (data.result === 'Giriş başarılı!') {
            console.log("giris basarili");
            navigation.navigate('MainScreen', { email: email });

          } else {
            console.log("giris basarisiz");
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      };
      
      
      
    return (
        <ImageBackground
            source={require('../../assets/images/arkaplan.jpg')}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Card style={styles.card}>
                    <Card.Title
                        title="GİRİŞ YAP"
                        left={(props) => <Avatar.Icon {...props} icon="login" />}
                    />
                    <Card.Content>
                        {error && <Text style={styles.errorMessage}>{error}</Text>}
                        <TextInput
                            label="E-posta Adresi"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                        <TextInput
                            label="Şifre"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                        />
                        <Button 
                            icon="login" 
                            mode="contained" 
                            onPress={() => handleLogin(email, password)} 
                            style={styles.button}
                            labelStyle={styles.buttonText}
                        >
                            GİRİŞ YAP
                        </Button>
                    </Card.Content>
                </Card>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    },
    card: {
        borderRadius: 10,
    },
    input: {
        marginBottom: 20,
        backgroundColor: 'white',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#703879',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorMessage: {
        color: 'red',
        fontSize: 16,
        marginBottom: 12,
        textAlign: 'center',
    },
});

export default LoginScreen;