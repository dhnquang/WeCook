import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Menu from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {feedStyle} from '../styles/feedStyle';
import {Post} from '../components/Post';
import {LoadingNewFeed} from '../components/LoadingNewFeed';
import {AuthContext} from '../routes/AuthProvider';
import { useTranslation } from 'react-i18next';

export default function NewFeed({navigation}) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {t} = useTranslation();
  // const {user} = useContext(AuthContext)

  const fetchPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('Posts')
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
      setRefresh(false);
      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log('Fetch post', e);
    }
  };
  const fetchPosts1 = async () => {
    try {
      const list = [];
      await firestore()
        .collection('Posts')
        .orderBy('postTime', 'asc')
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
      // console.log(list);
      setPosts(list);
      setRefresh(false);
      if (loading) {
        setLoading(false);
      }
      // console.log('Posts: ', list);
    } catch (e) {
      console.log('Fetch post', e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = postId => {
    Alert.alert(
      t('delete'),
      t('confirm'),
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = postId => {
    // console.log('Current Post Id: ', postId);
    firestore()
      .collection('Posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();
          const storageRef = storage().refFromURL(postImg);
          const imageRef = storage().ref(storageRef.fullPath);
          imageRef
            .delete()
            .then(() => {
              // console.log(`${postImg} has been deleted`);
              deleteFirestoreData(postId);
              setDeleted(true);
            })
            .catch(e => {
              console.log('Error while deleting image', e);
            });
        }
      });
  };

  const handleRefresh = () => {
    setRefresh(true);
    fetchPosts();
  };

  const deleteFirestoreData = postId => {
    firestore()
      .collection('Posts')
      .doc(postId)
      .delete()
      .then(() => {
        ToastAndroid.show(
          t('delNotification'),
          ToastAndroid.SHORT,
        );
      })
      .catch(e => console.log('Error deleting post.', e));
  };

  return (
    <View style={feedStyle.container}>
      <View style={feedStyle.headerBar}>
        <Menu
          name="menu"
          size={30}
          onPress={() => navigation.openDrawer()}
          style={feedStyle.menu}
        />
        <Text style={feedStyle.header}> {t('newFeed')}</Text>
      </View>
      {loading || refresh ? (
        <LoadingNewFeed />
      ) : (
        <View style={{flex: 1}}>
          <View style={feedStyle.filterView}>
            <TouchableOpacity
              onPress={fetchPosts}
              style={feedStyle.filterButton}>
              <Text style={feedStyle.filterText}>{t('newest')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={fetchPosts1}
              style={feedStyle.filterButton}>
              <Text style={feedStyle.filterText}>{t('oldest')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={feedStyle.filterButton}>
              <Text style={feedStyle.filterText}>{t('hottest')}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={feedStyle.footer}
            data={posts}
            renderItem={({item}) => (
              <Post
                item={item}
                navigation={navigation}
                onPress={() =>
                  navigation.navigate('HomeProfile', {uID: item.uID})
                }
                onDelete={handleDelete}
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            refreshing={refresh}
            onRefresh={handleRefresh}
          />
        </View>
      )}
    </View>
  );
}
