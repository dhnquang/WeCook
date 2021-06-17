import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Like from 'react-native-vector-icons/AntDesign';
import Save from 'react-native-vector-icons/FontAwesome';
import Delete from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import {feedStyle} from '../styles/feedStyle';
import {AuthContext} from '../routes/AuthProvider';

export const Post = ({item, navigation, onDelete, onPress}) => {
  const [count, setCount] = useState(0);
  const [userLike, setUserLike] = useState([]);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userData, setUserData] = useState(null);
  const {user} = useContext(AuthContext);

  const handleLike = () => {
    if (userLike.includes(user.uid)) {
      submitDisLike();
    } else {
      submitLike();
    }
  };

  const submitLike = async () => {
    await firestore()
      .collection('Posts')
      .doc(item.id)
      .update({
        UserLikes: firestore.FieldValue.arrayUnion(user.uid),
      })
      .then(() => {
        console.log('user like update');
      })
      .catch(e => console.log(e))
    await CountLike();
  };

  const submitDisLike = async () => {
    await firestore()
      .collection('Posts')
      .doc(item.id)
      .update({
        UserLikes: firestore.FieldValue.arrayRemove(user.uid),
      })
      .then(() => {
        console.log('user like remove');
      })
      .catch(e => console.log(e))
    await CountLike();
  };

  const CountLike = async () => {
    try {
      await firestore()
        .collection('Posts')
        .doc(item.id)
        .get()
        .then(documentSnapshot => {
          // console.log('User exists: ', documentSnapshot.exists);
          if (documentSnapshot.exists) {
            setUserLike(documentSnapshot.data().UserLikes);
            setCount(documentSnapshot.data().UserLikes.length);
          }
        });
      if (userLike.includes(user.uid)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (e) {
      console.log('Fetch user likes', e);
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

  // useEffect(() => {
  //   CountLike();
  // }, [submitDisLike, submitLike]);

  useEffect(() => {
    getUser();
    CountLike();
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DetailRecipe', {
          id: item.id,
          uID: item.uID,
        })
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
            <Like
              name="heart"
              size={18}
              color="#D7443E"
              style={feedStyle.heart}
            />
            <Text style={feedStyle.text}>{count}</Text>
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
              onPress={handleLike}
              // color={'#D7443E'}
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
