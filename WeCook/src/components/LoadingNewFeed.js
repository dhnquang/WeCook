import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const w = Dimensions.get('screen').width;
const h = Dimensions.get('screen').height;

export const LoadingNewFeed = () => {
  return (
    <ScrollView style={styles.container}>
      <SkeletonPlaceholder>
        <View style={styles.feedBox}></View>
        <View style={styles.feedBox}></View>
        <View style={styles.feedBox}></View>
        <View style={styles.feedBox}></View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedBox: {
    alignSelf: 'center',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    width: '95%',
    height: h/4.5,
    marginTop: '2%',
  },
});
