import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {loginStyle} from '../styles/loginStyle';
import {LoginInput} from '../components/InputText';
import {AuthContext} from '../routes/AuthProvider';

export default function Login({navigation}) {
  const {login, googleLogin, facebookLogin, reset} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkLogin = () => {
    if(email.length == 0 && password.length == 0) {
      Alert.alert('OOPS!', 'Type email and password', [
        {text: 'Understood', onPress: () => console.log('alert close')},
      ]);
    } else {
      login(email,password);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <View style={loginStyle.container}>
        <LinearGradient colors={['#A8D842', '#78BC9F']} style={loginStyle.cover}>
          <Image source={require('../assets/backgrounds/banner.png')} />
        </LinearGradient>
        <View style={loginStyle.body}>
          <Text style={loginStyle.headerText}>Welcome</Text>
          <Text style={loginStyle.bodyText}>Login to continue</Text>
          <LoginInput
            link={require('../assets/icons/email.png')}
            inputText={email}
            listenerChangeText={setEmail}
          />
          <LoginInput
            link={require('../assets/icons/padlock.png')}
            inputStyle={{fontSize: 15}}
            inputText={password}
            listenerChangeText={setPassword}
            isSecurity={true}
          />
          <View style={loginStyle.textBox}>
            <TouchableOpacity onPress={() => reset(email)}>
              <Text style={loginStyle.text}>Forget password ?</Text>
            </TouchableOpacity>
          </View>
          <View style={loginStyle.loginButton}>
            <Button
              title="Login"
              color="#B8E892"
              onPress={checkLogin}
            />
          </View>
          <View style={loginStyle.navBox}>
            <Text style={loginStyle.navText1}>Don't have account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={loginStyle.navText}>Register here</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              marginTop: '5%',
            }}>
            <TouchableOpacity onPress={() => facebookLogin()}>
              <Image source={require('../assets/icons/facebook.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => googleLogin()}>
              <Image source={require('../assets/icons/google.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
