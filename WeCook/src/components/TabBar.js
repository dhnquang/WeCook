import React from 'react';
import {Text} from 'react-native';
import {TabBar} from 'react-native-tab-view';

export const renderTabBar = props => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#28B446'}}
      style={{backgroundColor: '#E3EECA'}}
      renderLabel={({route, focused}) => (
        <Text style={{fontSize: 18, fontFamily: 'Cabin-Regular', color: focused ? '#28B446': '#000000'}}>{route.title}</Text>
      )}
    />
  );
};
