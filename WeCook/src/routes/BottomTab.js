import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, View, TouchableOpacity} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome';
import Ico from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

import {tabStyle} from '../styles/tabStyle';
import NewFeed from '../screens/NewFeed';
import DetailRecipe from '../screens/DetailRecipe';
import Chat from '../screens/Chat';
import ChatDetail from '../screens/ChatDetail';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import PostScreen from '../screens/PostScreen';
import {ProfileModal} from '../components/ProfileModal';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const UserRep = () => {
  return (
    <Stack.Navigator initialRouteName="NewFeed" headerMode="none">
      <Stack.Screen name="NewFeed" component={NewFeed} />
      <Stack.Screen name="DetailRecipe" component={DetailRecipe} />
      <Stack.Screen name="HomeProfile" component={Profile} />
      <Stack.Screen name="SearchPost" component={Search} />
    </Stack.Navigator>
  );
};

const UserProfile = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Edit" component={ProfileModal} />
    </Stack.Navigator>
  );
};

const MessagesScreen = () => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={Chat}
        options={{headerTintColor: '#28B446', title: t('message')}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatDetail}
        options={({route}) => ({
          title: route.params.userName,
          headerTintColor: '#28B446',
        })}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = ({barColor}) => {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    if (routeName == 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      initialRouteName="NewFeed"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#51BC10',
        style: {
          height: 65,
          elevation: 5,
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen
        name="Feed"
        component={UserRep}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={tabStyle.button}>
              <Ico
                name="home"
                size={focused ? 40 : 30}
                color={focused ? '#51BC10' : 'gray'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={tabStyle.button}>
              <Icon
                name="search1"
                size={focused ? 40 : 30}
                color={focused ? '#51BC10' : 'gray'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/icons/plus.png')}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
                tintColor: 'white',
              }}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate('Upload Post');
          },
        })}
      />
      <Tab.Screen
        name="Chat"
        component={MessagesScreen}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({focused}) => (
            <View style={tabStyle.button}>
              <Icon
                name="wechat"
                size={focused ? 40 : 30}
                color={focused ? '#51BC10' : 'gray'}
              />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={tabStyle.button}>
              <Icons
                name="user-circle-o"
                size={focused ? 40 : 30}
                color={focused ? '#51BC10' : 'gray'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity style={tabStyle.shadow} onPress={onPress}>
    <View style={tabStyle.PostView}>{children}</View>
  </TouchableOpacity>
);

export default TabNavigator;
