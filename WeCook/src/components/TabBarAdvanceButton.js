import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {TabBg} from '../svg';

type Props = BottomTabBarButtonProps & {
  bgColor?: string,
};

export const TabBarAdvancedButton: React.FC<Props> = ({bgColor, ...props}) => (
  <View style={styles.container} pointerEvents="box-none">
    <TabBg color={bgColor} style={styles.background} />
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Image
        source={require('../assets/icons/plus.png')}
        resizeMode="contain"
        style={{
          height: 25,
          width: 25,
          tintColor: '#fff',
        }}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#B8E892',
  },
});
