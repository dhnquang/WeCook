import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {splashStyles} from '../styles/splashStyle';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  });
  return (
    <LinearGradient
      colors={['#A8D842', '#78BC9F']}
      style={splashStyles.background}>
      <View style={splashStyles.banner}>
        <Image source={require('../assets/backgrounds/banner.png')} />
      </View>
      <View style={splashStyles.slogan}>
        <Text style={splashStyles.sloganText}>The art of cooking.</Text>
        <Text style={splashStyles.sloganText}>Make your life easier.</Text>
      </View>
    </LinearGradient>
  );
}
