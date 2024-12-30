import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList ,RootStackParamList3} from './types';
import LottieView from 'lottie-react-native';

const AppScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const navigation2 = useNavigation<NavigationProp<RootStackParamList3>>();

  const handleLogin = () => {
    console.log('Login clicked');
    navigation2.navigate('LoginScreen');
  };

  const handleSignUp = () => {
    console.log('Sign Up clicked');
    navigation.navigate('SignUpScreen');
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
    // Şifremi Unuttum ekranına yönlendirme işlemi 
  };

  return (
    <ImageBackground
      source={require('../../assets/images/arkaplan.jpg')} 
      style={styles.background}
    >
      <View style={styles.overlay}>

      <LottieView source={require('../../assets/animations/m.json')} autoPlay loop style={styles.icon} />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <Text style={styles.text}>ÜYE DEĞİL MİSİNİZ</Text>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Üye Ol</Text>
        </TouchableOpacity>
        <Text style={styles.link} onPress={handleForgotPassword}>
          Şifremi Unuttum
        </Text>
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
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  loginButton: {
    backgroundColor: '#703879', 
    padding: 10,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: '#703879', 
    padding: 10,
    borderRadius: 10,
    width: 220,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white', 
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  link: {
    fontSize: 17,
    color: '#703879',
  },
  icon: {
    width: 200,
    height: 140,
  },
  animation: {
    width: 400,
    height: 100,
    alignSelf: 'center',
  },
});

export default AppScreen;
