import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Logout from 'react-native-vector-icons/MaterialIcons';
import HomeIcon from 'react-native-vector-icons/MaterialIcons';
import AccountIcon from 'react-native-vector-icons/MaterialIcons';
import RecipeIcon from 'react-native-vector-icons/MaterialIcons';
import SettingIcon from 'react-native-vector-icons/AntDesign';
import AboutIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import { useTranslation } from 'react-i18next';

import {AuthContext} from '../routes/AuthProvider';
import {drawerStyle} from '../styles/drawerStyle';

export function DrawerContent(props) {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const {t} = useTranslation();

  const getUser = async () => {
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <LinearGradient colors={['#A8D842', '#4CB287']} style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={drawerStyle.drawerContent}>
          <View style={drawerStyle.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: '3%'}}>
              <View style={drawerStyle.avaBox}>
                <Image
                  source={{
                    uri: userData
                      ? userData.Avatar ||
                        'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2Fuser-profile.png?alt=media&token=ca27a206-cc1f-4785-b310-a620137d4f74'
                      : 'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2Fuser-profile.png?alt=media&token=ca27a206-cc1f-4785-b310-a620137d4f74',
                  }}
                  resizeMode="cover"
                  style={drawerStyle.ava}
                />
              </View>
              <View style={{marginLeft: '2%', alignSelf: 'center'}}>
                <Text style={drawerStyle.title}>
                  {userData ? userData.Name : 'User'}
                </Text>
              </View>
            </View>
          </View>
          <View style={drawerStyle.drawerSection}>
            <DrawerItem
              icon={() => <HomeIcon name="home" color="#fff" size={30} />}
              label={t('home')}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={() => (
                <RecipeIcon name="local-restaurant" color="#fff" size={30} />
              )}
              label={t('app')}
              onPress={() => {
                props.navigation.navigate('AppRecipe');
              }}
            />
            <DrawerItem
              icon={() => (
                <AccountIcon name="account-circle" color="#fff" size={30} />
              )}
              label={t('acc')}
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={() => <SettingIcon name="setting" color="#fff" size={30} />}
              label={t('setting')}
              onPress={() => {
                props.navigation.navigate('Setting');
              }}
            />
            <DrawerItem
              icon={() => <AboutIcon name="info" color="#fff" size={30} />}
              label={t('about')}
              onPress={() => {
                props.navigation.navigate('About');
              }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={drawerStyle.bottomDrawerSection}>
        <DrawerItem
          icon={() => <Logout name="logout" color="#fff" size={30} />}
          label={t('logout')}
          onPress={logout}
        />
      </View>
    </LinearGradient>
  );
}
