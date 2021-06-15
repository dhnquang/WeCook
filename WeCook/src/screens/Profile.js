import React, {useContext, useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EditIcon from 'react-native-vector-icons/EvilIcons';
import Menu from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import PagerView from 'react-native-pager-view';

import {profileStyle} from '../styles/profileStyle';
import {AuthContext} from '../routes/AuthProvider';
import {ProfileModal} from '../components/ProfileModal';
import {ImgGrid} from '../components/ImgGrid';

export default function Profile({navigation, route}) {
  const {user, logout} = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('Posts')
        .where('uID', '==', route.params ? route.params.uID : user.uid)
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          // console.log('Total Posts:', querySnapshot.size);
          querySnapshot.forEach(doc => {
            const {uID, Recipe, Like, postImg, postTime, Time, Ration} =
              doc.data();
            list.push({
              id: doc.id,
              uID,
              PostImage: postImg,
              postTime: postTime,
              PrepareTime: Time,
              ration: Ration,
              like: Like,
              recipe: Recipe,
            });
          });
        });
      setPosts(list);
      if (loading) {
        setLoading(false);
      }
      // console.log('Posts: ', list);
    } catch (e) {
      console.log('Fetch post', e);
    }
  };

  const getUser = async () => {
    await firestore()
      .collection('Users')
      .doc(route.params ? route.params.uID : user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [])

  useEffect(() => {
    getUser();
    fetchPosts();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <View style={profileStyle.container}>
      <LinearGradient
        colors={['#B5D96A', '#F4FBFA']}
        style={profileStyle.cover}>
        <View style={profileStyle.boxIcon}>
          <View style={profileStyle.menuIcon}>
            <Menu
              name="menu"
              size={30}
              color="#fff"
              onPress={() => navigation.openDrawer()}
            />
          </View>
          {route.params ? (
            <></>
          ) : (
            <View style={profileStyle.editIcon}>
              <EditIcon
                name="pencil"
                size={35}
                color="#fff"
                onPress={() => navigation.navigate('Edit')}
              />
            </View>
          )}
        </View>
        <View style={profileStyle.content}>
          <View style={profileStyle.avaContainer}>
            <Image
              source={{
                uri: userData
                  ? userData.Avatar ||
                    'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2Fuser-profile.png?alt=media&token=ca27a206-cc1f-4785-b310-a620137d4f74'
                  : 'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2Fuser-profile.png?alt=media&token=ca27a206-cc1f-4785-b310-a620137d4f74',
              }}
              resizeMode="cover"
              style={profileStyle.avatar}
            />
          </View>
          <Text style={profileStyle.username}>
            {userData ? userData.Name || 'User' : 'User'}
          </Text>
          {/* <Text>{route.params ? route.params.uID : user.uid}</Text> */}
          <Text style={profileStyle.userBio}>
            {userData ? userData.Bio || 'No details added.' : ''}
          </Text>
        </View>
      </LinearGradient>
      <View style={profileStyle.footer}>
        <PagerView style={styles.pagerView} initialPage={0}>
          <View key="1">
            <FlatList
              data={posts}
              renderItem={({item}) => <ImgGrid item={item} />}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              numColumns={3}
            />
          </View>
          <View key="2">
            <Text>Second page</Text>
          </View>
        </PagerView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
