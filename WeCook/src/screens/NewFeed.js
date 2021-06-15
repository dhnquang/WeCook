import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import Menu from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {feedStyle} from '../styles/feedStyle';
import {Post} from '../components/Post';
import {LoadingNewFeed} from '../components/LoadingNewFeed';

export default function NewFeed({navigation}) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
      'Delete post',
      'Are you sure?',
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
    console.log('Current Post Id: ', postId);
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
              console.log(`${postImg} has been deleted`);
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
  }

  const deleteFirestoreData = postId => {
    firestore()
      .collection('Posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
          [{text: 'Ok', onPress: () => console.log('alert close')}],
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
          style={{alignSelf: 'center'}}
        />
        <Text style={feedStyle.header}> Food Recipe</Text>
      </View>
      {loading || refresh ? (
        <LoadingNewFeed />
      ) : (
        <FlatList
          style={feedStyle.footer}
          data={posts}
          renderItem={({item}) => (
            <Post item={item} navigation={navigation} onPress={() => navigation.navigate('HomeProfile', {uID: item.uID})} onDelete={handleDelete} />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshing={ refresh}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
}
