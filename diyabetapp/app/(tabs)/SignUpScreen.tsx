import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, TextInput, Avatar, Paragraph } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { API_BASE_URL } from '../../constants/Config';

type FormData = {
  name: string;
  surname: string;
  age: string;
  gender: string;
  pregnancyStatus: string;
  weight: string;
  height: string;
  diabetesDuration: string;
  insulinUnits: string;
  email: string;
  password: string;
  selectedInsulins?: string[];
};

const SignUpScreen: React.FC = () => {
  const { control, handleSubmit, formState: {errors} } = useForm<FormData>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  


  const navigateToInsulinSelection = ( data:FormData ) => {
    navigation.navigate('InsulinSelectionScreen', { userData: data });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/arkaplan.jpg')} 
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Card>
          <Card.Title
            title="ÜYE OL"
            left={(props) => <Avatar.Icon {...props} icon="account-plus" />}
          />
          <Card.Content>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="İsim"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.name}
                  style={styles.input}
                />
              )}
              name="name"
            />
            {errors.name && <Paragraph style={styles.error}>Bu alan zorunludur.</Paragraph>}

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Soyisim"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.surname}
                  style={styles.input}
                />
              )}
              name="surname"
            />
            {errors.surname && <Paragraph style={styles.error}>Bu alan zorunludur.</Paragraph>}

            <Controller
              control={control}
              rules={{ required: true, pattern: /^\S+@\S+$/ }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="E-posta adresi"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={!!errors.email}
                  style={styles.input}
                />
              )}
              name="email"
            />
            {errors.email && <Paragraph style={styles.error}>Geçerli bir e-posta adresi giriniz.</Paragraph>}

            <Controller
              control={control}
              rules={{ required: true, pattern: /^\d+$/ }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Yaş"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  error={!!errors.age}
                  style={styles.input}
                />
              )}
              name="age"
            />
            {errors.age && <Paragraph style={styles.error}>Bu alan zorunludur ve sayısal olmalıdır.</Paragraph>}

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View style={styles.picker}>
                  <RNPickerSelect
                    onValueChange={onChange}
                    items={[
                      { label: 'Kadın', value: 'Kadın' },
                      { label: 'Erkek', value: 'Erkek' },
                    ]}
                    placeholder={{
                      label: 'Cinsiyet',
                      value: null,
                    }}
                    value={value}
                  />
                </View>
              )}
              name="gender"
            />
            {errors.gender && <Paragraph style={styles.error}>Bu alan zorunludur.</Paragraph>}

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View style={styles.picker}>
                  <RNPickerSelect
                    onValueChange={onChange}
                    items={[
                      { label: 'Evet', value: 'Evet' },
                      { label: 'Hayır', value: 'Hayır' },
                    ]}
                    placeholder={{
                      label: 'Gebelik Durumu',
                      value: null,
                    }}
                    value={value}
                  />
                </View>
              )}
              name="pregnancyStatus"
            />
            {errors.pregnancyStatus && <Paragraph style={styles.error}>Bu alan zorunludur.</Paragraph>}

            <Controller
              control={control}
              rules={{ required: true, pattern: /^\d+$/ }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Kilo"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  error={!!errors.weight}
                  style={styles.input}
                />
              )}
              name="weight"
            />
            {errors.weight && <Paragraph style={styles.error}>Bu alan zorunludur ve sayısal olmalıdır.</Paragraph>}

            <Controller
              control={control}
              rules={{ required: true, pattern: /^\d+$/ }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Boy"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  error={!!errors.height}
                  style={styles.input}
                />
              )}
              name="height"
            />
            {errors.height && <Paragraph style={styles.error}>Bu alan zorunludur ve sayısal olmalıdır.</Paragraph>}

            <Controller
              control={control}
              rules={{ required: true, pattern: /^\d+$/ }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Kaç yıldır şeker hastasısınız?"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  error={!!errors.diabetesDuration}
                  style={styles.input}
                />
              )}
              name="diabetesDuration"
            />
            {errors.diabetesDuration && <Paragraph style={styles.error}>Bu alan zorunludur ve sayısal olmalıdır.</Paragraph>}

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Günde kaç ünite insülin kullanıyorsunuz?"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  error={!!errors.insulinUnits}
                  style={styles.input}
                />
              )}
              name="insulinUnits"
            />
            {errors.insulinUnits && <Paragraph style={styles.error}>Bu alan zorunludur ve sayısal olmalıdır.</Paragraph>}

            <Controller
              control={control}
              rules={{ required: true, minLength: 6 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Şifre"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  error={!!errors.password}
                  style={styles.input}
                />
              )}
              name="password"
            />
            {errors.password && <Paragraph style={styles.error}>Şifre en az 6 karakter olmalıdır.</Paragraph>}

            <TouchableOpacity
               onPress={handleSubmit(navigateToInsulinSelection)}
              style={styles.iconButton}
            >
              <Icon name="arrow-right" size={30} color="#ffffff" />
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#F3E8F0',
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 12,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  buttonContainer: {
    backgroundColor: '#61106D',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#703879',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default SignUpScreen;
