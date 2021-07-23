import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {searchStyle} from '../styles/searchStyle';
import firestore from '@react-native-firebase/firestore';

export const SearchInfo = ({item, navigation}) => {
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firestore()
      .collection('Users')
      .doc(item.uID)
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
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DetailRecipe', {id: item.id, uID: item.uID});
      }}
      style={searchStyle.searchBar}>
      <Image
        source={{uri: item.PostImage}}
        resizeMode="cover"
        style={searchStyle.ava}
      />
      <View>
        <Text style={searchStyle.recipeText}>{item.recipe}</Text>
        <Text style={searchStyle.userText}>
          {userData ? userData.Name : 'User'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
