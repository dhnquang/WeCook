import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ImageBackground, ScrollView, Image} from 'react-native';
import Like from 'react-native-vector-icons/AntDesign';
import Save from 'react-native-vector-icons/FontAwesome';
import Delete from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../routes/AuthProvider';
import {postDetailStyle} from '../styles/postDetailStyle';

export default function DetailRecipe({route}) {
  const {user} = useContext(AuthContext);
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [post, setPost] = useState(null);
  const [users, setUsers] = useState(null);

  const getPost = async () => {
    await firestore()
      .collection('Posts')
      .doc(route.params.id)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('user post data', documentSnapshot.data());
          setPost(documentSnapshot.data());
        }
      });
  };

  const getUser = async () => {
    await firestore()
      .collection('Users')
      .doc(route.params.uID)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('User Data', documentSnapshot.data());
          setUsers(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getPost();
    getUser();
  }, []);

  return (
    <View style={postDetailStyle.container}>
      <ImageBackground
        source={
          post
            ? {uri: post.postImg}
            : require('../assets/backgrounds/backgroundPhoto.png')
        }
        resizeMode="cover"
        style={postDetailStyle.image}>
        {user.uid == route.params.uID ? (
          <Delete name="delete" size={35} />
        ) : null}
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={postDetailStyle.body}>
        <View style={postDetailStyle.header}>
          <Text style={postDetailStyle.headerText}>
            {post ? post.Recipe : 'Recipe'}
          </Text>
          <View style={postDetailStyle.buttonBox}>
            <Like
              name="heart"
              size={30}
              onPress={() => setLike(!like)}
              color={like ? '#D7443E' : 'gray'}
            />
            <Save
              name="bookmark"
              size={30}
              onPress={() => setSave(!save)}
              color={save ? 'black' : 'gray'}
            />
          </View>
        </View>
        <View style={postDetailStyle.userBox}>
          <View style={postDetailStyle.avaContainer}>
            <Image
              source={{
                uri: users
                  ? users.Avatar ||
                    'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2Fuser-profile.png?alt=media&token=ca27a206-cc1f-4785-b310-a620137d4f74'
                  : 'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2Fuser-profile.png?alt=media&token=ca27a206-cc1f-4785-b310-a620137d4f74',
              }}
              resizeMode="cover"
              style={postDetailStyle.ava}
            />
          </View>
          <View style={{marginLeft: '2%'}}>
            <Text style={postDetailStyle.userText}>
              {users ? users.Name : 'User'}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Like name="heart" size={20} color="#D7443E" />
              <Text style={postDetailStyle.likeText}>19</Text>
            </View>
          </View>
        </View>
        <View style={postDetailStyle.box}>
          <Text style={postDetailStyle.info}>Information</Text>
          <Text>Ration for {post ? post.Ration : '0'} peoples</Text>
          <Text>Preparation time: {post ? post.Time : '0'} minutes</Text>
        </View>
        <View style={postDetailStyle.box}>
          <Text style={postDetailStyle.info}>Ingredients</Text>
        </View>
        <View style={postDetailStyle.box}>
          <Text style={postDetailStyle.info}>Step</Text>
        </View>
      </ScrollView>
    </View>
  );
}
