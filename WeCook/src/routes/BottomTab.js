import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, View, Text} from 'react-native';

import {TabBarAdvancedButton} from '../components/TabBarAdvanceButton';
import {tabStyle} from '../styles/tabStyle';
import NewFeed from '../screens/NewFeed';
import DetailRecipe from '../screens/DetailRecipe';
import Chat from '../screens/Chat';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import PostScreen from '../screens/PostScreen';
import { ProfileModal } from '../components/ProfileModal';

const Tab = createBottomTabNavigator();
const Recipe = createStackNavigator();
const Pro = createStackNavigator();

const UserRep = () => {
  return (
    <Recipe.Navigator initialRouteName="NewFeed" headerMode='none'>
      <Recipe.Screen name="NewFeed" component={NewFeed} />
      <Recipe.Screen name="DetailRecipe" component={DetailRecipe} />
      <Recipe.Screen name="HomeProfile" component={Profile}/>
    </Recipe.Navigator>
  );
};

const UserProfile = () => {
  return(
    <Pro.Navigator initialRouteName="Profile" headerMode='none'>
      <Pro.Screen name="Profile" component={Profile}/>
      <Pro.Screen name="Edit" component={ProfileModal}/>
    </Pro.Navigator>
  );
};

type Props = {
  barColor: string,
};

const TabNavigator: React.FC<Props> = ({barColor}) => (
  <Tab.Navigator
    initialRouteName="Feed"
    tabBar={props => (
      <View style={tabStyle.navigatorContainer}>
        <BottomTabBar {...props} />
      </View>
    )}
    tabBarOptions={{
      showLabel: false,
      activeTintColor: '#51BC10',
      style: tabStyle.navigator,
      tabStyle: {
        backgroundColor: '#fff',
      },
    }}>
    <Tab.Screen
      name="Feed"
      component={UserRep}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={tabStyle.button}>
            <Image
              source={require('../assets/icons/NewFeed.png')}
              resizeMode="contain"
              style={{tintColor: focused ? '#51BC10' : 'gray'}}
            />
            <Text
              style={{
                color: focused ? '#51BC10' : 'gray',
                fontFamily: 'Cabin-Medium',
                fontSize: 12,
              }}>
              New Feed
            </Text>
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
            <Image
              source={require('../assets/icons/Search.png')}
              resizeMode="contain"
              style={{tintColor: focused ? '#51BC10' : 'gray'}}
            />
            <Text
              style={{
                color: focused ? '#51BC10' : 'gray',
                fontFamily: 'Cabin-Medium',
                fontSize: 12,
              }}>
              Search
            </Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Post"
      component={PostScreen}
      options={{
        tabBarButton: props => (
          <TabBarAdvancedButton bgColor={barColor} {...props} />
        ),
      }}
      listeners={({navigation}) => ({
        tabPress: event => {
          event.preventDefault();
          navigation.navigate("Upload Post")
        }
      })}
    />
    <Tab.Screen
      name="Chat"
      component={Chat}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={tabStyle.button}>
            <Image
              source={require('../assets/icons/chat.png')}
              resizeMode="contain"
              style={{tintColor: focused ? '#51BC10' : 'gray'}}
            />
            <Text
              style={{
                color: focused ? '#51BC10' : 'gray',
                fontFamily: 'Cabin-Medium',
                fontSize: 12,
              }}>
              Chat
            </Text>
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={UserProfile}
      options={{
        tabBarIcon: ({focused}) => (
          <View style={tabStyle.button}>
            <Image
              source={require('../assets/icons/profile.png')}
              resizeMode="contain"
              style={{tintColor: focused ? '#51BC10' : 'gray'}}
            />
            <Text
              style={{
                color: focused ? '#51BC10' : 'gray',
                fontFamily: 'Cabin-Medium',
                fontSize: 12,
              }}>
              Profile
            </Text>
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

// const CustomTabBarButton = ({children, onPress}) => (
//   <TouchableOpacity style={tabStyle.shadow} onPress={onPress}>
//     <View style={tabStyle.PostView}>{children}</View>
//   </TouchableOpacity>
// );

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="NewFeed"
//       tabBarOptions={{
//         showLabel: false,
//         activeTintColor: '#51BC10',
//         style: {
//           position: 'absolute',
//           height: 60,
//         },
//       }}>
//       <Tab.Screen
//         name="NewFeed"
//         component={NewFeed}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View style={tabStyle.button}>
//               <Image
//                 source={require('../assets/icons/NewFeed.png')}
//                 resizeMode="contain"
//                 style={{tintColor: focused ? '#51BC10' : 'gray'}}
//               />
//               <Text
//                 style={{
//                   color: focused ? '#51BC10' : 'gray',
//                   fontFamily: 'Cabin-Medium',
//                   fontSize: 12,
//                 }}>
//                 New Feed
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={Search}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View style={tabStyle.button}>
//               <Image
//                 source={require('../assets/icons/Search.png')}
//                 resizeMode="contain"
//                 style={{tintColor: focused ? '#51BC10' : 'gray'}}
//               />
//               <Text
//                 style={{
//                   color: focused ? '#51BC10' : 'gray',
//                   fontFamily: 'Cabin-Medium',
//                   fontSize: 12,
//                 }}>
//                 Search
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Post"
//         component={PostScreen}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <Image
//               source={require('../assets/icons/plus.png')}
//               resizeMode="contain"
//               style={{
//                 height: 35,
//                 width: 35,
//                 tintColor: 'white',
//               }}
//             />
//           ),
//           tabBarButton: props => <CustomTabBarButton {...props} />,
//         }}
//       />
//       <Tab.Screen
//         name="Chat"
//         component={Chat}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View style={tabStyle.button}>
//               <Image
//                 source={require('../assets/icons/chat.png')}
//                 resizeMode="contain"
//                 style={{tintColor: focused ? '#51BC10' : 'gray'}}
//               />
//               <Text
//                 style={{
//                   color: focused ? '#51BC10' : 'gray',
//                   fontFamily: 'Cabin-Medium',
//                   fontSize: 12,
//                 }}>
//                 Chat
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View style={tabStyle.button}>
//               <Image
//                 source={require('../assets/icons/profile.png')}
//                 resizeMode="contain"
//                 style={{tintColor: focused ? '#51BC10' : 'gray'}}
//               />
//               <Text
//                 style={{
//                   color: focused ? '#51BC10' : 'gray',
//                   fontFamily: 'Cabin-Medium',
//                   fontSize: 12,
//                 }}>
//                 Profile
//               </Text>
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

export default TabNavigator;
