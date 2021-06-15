import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';

import {searchStyle} from '../styles/searchStyle';
import { SearchInfo } from '../components/SearchiInfo';

export default function Search() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState(null);

  // const handleSearch = (text) => {
  //   setText(text);
  //   // const newPosts = posts.filter(posts => posts.recipe.toLowerCase().includes(text.toLowerCase()));
  //   // setPosts(newPosts);
  //   // console.log(newPosts)
  // }

  const fetchPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('Posts')
        .orderBy('postTime', 'desc')
        .where('Recipe', 'in', [text, text])
        .get()
        .then(querySnapshot => {
          // console.log('Total Posts:', querySnapshot.size);
          querySnapshot.forEach(doc => {
            const {uID, Recipe, Like, postImg, postTime, Time, Ration} = doc.data();
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

  return (
    <View style={searchStyle.container}>
      <View style={searchStyle.headerBar}>
        <LinearGradient
          colors={['#A8EB7F', '#51A68C']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={searchStyle.searchBox}>
          <SearchIcon
            name="search1"
            size={25}
            color="#fff"
            style={searchStyle.searchIcon}
            onPress={fetchPosts}
          />
          <TextInput
            style={searchStyle.inputText}
            placeholder="Find recipes, ingredients"
            placeholderTextColor="#fff"
            value={text}
            onChangeText={setText}
          />
        </LinearGradient>
      </View>
      <View style={searchStyle.footer}>
        <Text style={searchStyle.recentText}>Recent Search</Text>
        <FlatList
          style={searchStyle.body}
          data={posts}
          renderItem={({item}) => <SearchInfo item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}
