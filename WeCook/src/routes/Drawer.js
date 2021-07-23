import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import AppRecipe from '../screens/AppRecipe';
import About from '../screens/About';
import Setting from '../screens/Setting';
import TabNavigator from '../routes/BottomTab';
import PostScreen from '../screens/PostScreen';
import {DrawerContent} from '../components/DrawContent';
import { Recipe } from '../screens/Recipe';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Recipes = () => {
  return(
    <Stack.Navigator initialRouteName="Main" headerMode='none'>
      <Stack.Screen name="Main" component={AppRecipe} />
      <Stack.Screen name="Detail" component={Recipe} />
    </Stack.Navigator>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="AppRecipe" component={Recipes} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="Upload Post" component={PostScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
