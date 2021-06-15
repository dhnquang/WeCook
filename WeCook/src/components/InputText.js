import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';

import {registerStyle} from '../styles/registerStyle';
import {loginStyle} from '../styles/loginStyle';

export const RegisterInput = props => {
  return (
    <View style={registerStyle.input}>
      <Text style={registerStyle.text}>{props.text}</Text>
      <TextInput
        style={[registerStyle.inputText, props.inputStyle]}
        secureTextEntry={props.isSecurity}
        keyboardType={props.isNumber}
        value={props.inputValue}
        onChangeText={props.listenerChangeText}
      />
    </View>
  );
};

export const LoginInput = props => {
  return (
    <View style={loginStyle.input}>
      <Image
        source={props.link}
        style={loginStyle.emailIcon}
      />
      <TextInput 
        style={[loginStyle.inputText, props.inputStyle]}
        secureTextEntry={props.isSecurity}
        value={props.inputValue}
        onChangeText={props.listenerChangeText}
      />
    </View>
  );
};
