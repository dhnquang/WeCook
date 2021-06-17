import React from 'react';
import {View, Text} from 'react-native';
import {TabBar} from 'react-native-tab-view';

export const renderTabBar = props => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#fff'}}
      style={{backgroundColor: '#B8E892'}}
    />
  );
};
