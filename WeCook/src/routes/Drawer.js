import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import AppRecipe from '../screens/AppRecipe';
import About from '../screens/About';
import Setting from '../screens/Setting';
import TabNavigator from '../routes/BottomTab';
import PostScreen from '../screens/PostScreen';
import {DrawerContent} from '../components/DrawContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return(
    <Drawer.Navigator 
      initialRouteName="Home"
      drawerContent = {props => <DrawerContent {...props}/>}
    >
    <Drawer.Screen
      name="Home"
      component={TabNavigator}
    />
    <Drawer.Screen
      name="App Recipe"
      component={AppRecipe}
    />
    <Drawer.Screen
      name="About"
      component={About}
    />
    <Drawer.Screen 
      name="Setting"
      component={Setting}
    />
    <Drawer.Screen 
      name="Upload Post"
      component={PostScreen}
    />
  </Drawer.Navigator>
  );
}

export default DrawerNavigator;