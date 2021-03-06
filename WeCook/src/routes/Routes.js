import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {AuthContext} from './AuthProvider'
import AuthStack from './AuthStack';
// import TabNavigator from './BottomTab';
import DrawerNavigator from './Drawer';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if(initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChanged);
    return subscribe;
  }, [])

  if(initializing) return null;

  return(
    <NavigationContainer>
      {user ? <DrawerNavigator/> : <AuthStack/>}
    </NavigationContainer>
  );
};

export default Routes;