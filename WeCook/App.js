import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen'

import Providers from './src/routes';

export default function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return <Providers />;
}

