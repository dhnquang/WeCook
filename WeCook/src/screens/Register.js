import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {RegisterInput} from '../components/InputText';
import {AuthContext} from '../routes/AuthProvider';
import {registerStyle} from '../styles/registerStyle';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [cfPassword, setCfPassword] = useState('');
  const [phone, setPhone] = useState('');

  const {register, user} = useContext(AuthContext);

  const HandleValidPassword = () => {
    if (password.length < 7) {
      return (
        <Text style={registerStyle.warning1}>
          Password must be 7 characters long.
        </Text>
      );
    } else {
      return null;
    }
  };

  const CheckPassword = () => {
    if (cfPassword != password) {
      return <Text style={registerStyle.warning2}>Wrong password</Text>;
    } else {
      return null;
    }
  };

  const checkRegister = () => {
    if (
      email.length == 0 ||
      password.length == 0 ||
      name.length == 0 ||
      cfPassword.length == 0 ||
      phone.length == 0
    ) {
      Alert.alert('OOPS!', 'Missing information', [
        {text: 'Understood', onPress: () => console.log('alert close')},
      ]);
    } else {
      register(email, password, name, phone);
    }
  };

  return (
    <ScrollView style={registerStyle.container}>
      <LinearGradient
        colors={['#A8D842', '#78BC9F']}
        style={registerStyle.cover}>
        <Image source={require('../assets/backgrounds/banner.png')} />
      </LinearGradient>
      <View style={registerStyle.body}>
        <Text style={registerStyle.headerText}>Register</Text>
        <Text style={registerStyle.bodyText}>Signup to get started</Text>
        <RegisterInput
          text="Name :"
          isSecurity={false}
          inputValue={name}
          listenerChangeText={setName}
        />
        <RegisterInput
          text="Email :"
          isSecurity={false}
          inputValue={email}
          listenerChangeText={setEmail}
        />
        <RegisterInput
          text="Password :"
          isSecurity={true}
          inputStyle={{fontSize: 15}}
          inputValue={password}
          listenerChangeText={setPassword}
        />
        <HandleValidPassword />
        <RegisterInput
          text="Confirm Password :"
          isSecurity={true}
          inputStyle={{fontSize: 15}}
          inputValue={cfPassword}
          listenerChangeText={setCfPassword}
        />
        <CheckPassword />
        <RegisterInput
          text="Phone"
          isSecurity={false}
          isNumber="number-pad"
          inputValue={phone}
          listenerChangeText={setPhone}
        />
        <View style={registerStyle.textBox}>
          <Text style={{fontFamily: 'Cabin-Regular', fontSize: 13}}>
            Already have account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={registerStyle.navText}>Login here</Text>
          </TouchableOpacity>
        </View>
        <View style={registerStyle.registerButton}>
          <Button title="Register" color="#B8E892" onPress={checkRegister} />
        </View>
      </View>
    </ScrollView>
  );
}
