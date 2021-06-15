import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Like from 'react-native-vector-icons/AntDesign';
import Save from 'react-native-vector-icons/FontAwesome';
import Delete from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import firebase from '@react-native-firebase/storage';

import {feedStyle} from '../styles/feedStyle';
import {AuthContext} from '../routes/AuthProvider';

export const Post = ({item, navigation, onDelete, onPress}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [saved, setSaved] = useState(false);
  const [userData, setUserData] = useState(null);
  const {user} = useContext(AuthContext);

  const submitLike = () => {
    UpdateLike();
    // console.log(likes);
    firestore()
      .collection('Posts')
      .doc(item.id)
      .update({
        Like: likes,
      })
      .then(() => {
        console.log('User Updated');
      });
  };

  const UpdateLike = () => {
    if (liked == false) {
      setLiked(true);
      setLikes(likes + 1);
    } else {
      setLiked(false);
      setLikes(likes - 1);
    }
  };

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
      onPress={() =>
        navigation.navigate('DetailRecipe', {id: item.id, uID: item.uID})
      }>
      <View style={feedStyle.feedBox}>
        <Image
          source={{uri: item.PostImage}}
          resizeMode="cover"
          style={feedStyle.postImage}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={feedStyle.infoBox}>
            <Text style={feedStyle.text}>Cooked: {item.PrepareTime} mins</Text>
            <Text style={feedStyle.text}>.</Text>
            <Text style={feedStyle.text}>Ration for {item.ration}</Text>
            <Text style={feedStyle.text}>.</Text>
            <Image
              source={require('../assets/icons/heart.png')}
              resizeMode="contain"
              style={feedStyle.heart}
            />
            <Text style={feedStyle.text}>{item.like}</Text>
          </View>
          <View style={feedStyle.timeBox}>
            <Text style={feedStyle.textTime}>
              {moment(item.postTime.toDate()).fromNow()}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: '1%'}}>
          <TouchableOpacity onPress={onPress} style={feedStyle.avaBox}>
            <Image
              source={{
                uri: userData
                  ? userData.Avatar ||
                    'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2Fuser-profile.png?alt=media&token=ca27a206-cc1f-4785-b310-a620137d4f74'
                  : 'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2Fuser-profile.png?alt=media&token=ca27a206-cc1f-4785-b310-a620137d4f74',
              }}
              resizeMode="cover"
              style={feedStyle.ava}
            />
          </TouchableOpacity>
          <View style={feedStyle.textBox}>
            <Text style={feedStyle.title}>{item.recipe}</Text>
            <TouchableOpacity style={{width: '60%'}} onPress={onPress}>
              <Text style={feedStyle.userName}>
                {userData ? userData.Name : 'User'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={feedStyle.buttonBox}>
            <Like
              name="heart"
              size={25}
              onPress={submitLike}
              color={liked ? 'gray' : '#D7443E'}
            />
            <Save
              name="bookmark"
              size={25}
              onPress={() => setSaved(!saved)}
              color={saved ? 'black' : 'gray'}
            />
            {user.uid == item.uID ? (
              <Delete
                name="delete"
                size={25}
                onPress={() => onDelete(item.id)}
              />
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
