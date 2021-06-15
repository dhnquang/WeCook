import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createStackNavigator();

GoogleSignin.configure({
  webClientId:
    '710929240559-a4tl5mfetk0t06rk3k98k1qvee5bdqmo.apps.googleusercontent.com',
});

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Splash" headerMode="none">
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

export default AuthStack;
