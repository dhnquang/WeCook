import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Like from 'react-native-vector-icons/AntDesign';
import Save from 'react-native-vector-icons/FontAwesome';
import Delete from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import Icons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

import {AuthContext} from '../routes/AuthProvider';
import {ImageModal} from '../components/ImageModal';
import {postDetailStyle} from '../styles/postDetailStyle';


export default function DetailRecipe({route}) {
  const [count, setCount] = useState(0);
  const [userLike, setUserLike] = useState([]);
  const {user} = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [save, setSave] = useState(false);
  const [post, setPost] = useState(null);
  const [ingredients, setIngredient] = useState(null);
  const [steps, setStep] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [users, setUsers] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation();

   const handleLike = () => {
    if (userLike.includes(user.uid)) {
      submitDisLike();
    } else {
      submitLike();
    }
  };

  const submitLike = async() => {
    await firestore()
      .collection('Posts')
      .doc(route.params.id)
      .update({
        UserLikes: firestore.FieldValue.arrayUnion(user.uid),
      })
      .then(() => {
        // console.log(userLike)
        console.log('user like update');
      })
      .catch(e => console.log(e))
    CountLike();
  };

  const submitDisLike = async() => {
    await firestore()
      .collection('Posts')
      .doc(route.params.id)
      .update({
        UserLikes: firestore.FieldValue.arrayRemove(user.uid),
      })
      .then(() => {
        // console.log(userLike)
        console.log('user like remove');
      })
      .catch(e => console.log(e))
    CountLike();
  };

  const CountLike = async () => {
    try {
      await firestore()
        .collection('Posts')
        .doc(route.params.id)
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

  const getPost = async () => {
    await firestore()
      .collection('Posts')
      .doc(route.params.id)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('user post data', documentSnapshot.data());
          setPost(documentSnapshot.data());
          setIngredient(documentSnapshot.data().Ingredient);
          setStep(documentSnapshot.data().Step);
          setQuantity(documentSnapshot.data().IngredientQuantity);
        }
      });
    if (loading) {
      setLoading(false);
    }
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
    CountLike();
  }, []);

  return (
    <View style={postDetailStyle.container}>
      {loading ? (
        <>
          <ImageBackground
            source={require('../assets/backgrounds/backgroundPhoto.png')}
            resizeMode="cover"
            style={postDetailStyle.image}>
            {user.uid == route.params.uID ? (
              <Delete name="delete" size={35} />
            ) : null}
          </ImageBackground>
          <View style={[postDetailStyle.body, {justifyContent: 'center', alignItems: 'center'}]}>
            <ActivityIndicator size={50} color="#28B446" />
          </View>
        </>
      ) : (
        <ScrollView>
          <TouchableOpacity
            style={postDetailStyle.image}
            onPress={() => setModalVisible(!modalVisible)}>
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
          </TouchableOpacity>
          <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <ImageModal
              data={post.postImg}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </Modal>
          <View
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
                  onPress={handleLike}
                  color={liked ? 'gray' : '#D7443E'}
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
                <View style={postDetailStyle.button}>
                  <Like name="heart" size={20} color="#D7443E" />
                  <Text style={postDetailStyle.likeText}>{count}</Text>
                </View>
              </View>
              <View style={{marginLeft: '45%'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Icons name='clockcircleo' size={25} color='#6A6666'/>
                    <Text style={postDetailStyle.detail}>{post ? post.Time : '0'} {t('min')}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon name='local-restaurant' size={25} color='#6A6666'/>
                    <Text style={postDetailStyle.detail}>{post ? post.Ration : '0'}</Text>
                  </View>
              </View>
            </View>
            <View style={postDetailStyle.box}>
              <Text style={postDetailStyle.info}>{t('information')}</Text>
              <Text style={postDetailStyle.detail}>
                {post ? post.Description : ''}
              </Text>
            </View>
            <View style={postDetailStyle.box}>
              <Text style={postDetailStyle.info}>{t('ingredient')}</Text>
              <View style={postDetailStyle.ingredientBox}>
                <FlatList
                  data={ingredients}
                  renderItem={({item}) => (
                    <View style={{flex: 9}}>
                      <Text style={postDetailStyle.ingredientText}>{item.text}</Text>
                    </View>
                  )}
                  scrollEnabled={false}
                  keyExtractor={item => item.index}
                />
                <FlatList
                  data={quantity}
                  renderItem={({item}) => (
                    <View style={postDetailStyle.quantityBox}>
                      <Text style={postDetailStyle.ingredientText}>{item.text}</Text>
                    </View>
                  )}
                  scrollEnabled={false}
                  keyExtractor={item => item.index}
                />
              </View>
            </View>
            <View style={postDetailStyle.box}>
              <Text style={postDetailStyle.info}>{t('step')}</Text>
              <FlatList
                data={steps}
                renderItem={({item}) => (
                  <View style={postDetailStyle.stepBox}>
                    <View style={postDetailStyle.index}>
                      <Text style={postDetailStyle.textIndex}>{item.index + 1}</Text>
                    </View>
                    <Text style={postDetailStyle.textStep}>{item.text}</Text>
                  </View>
                )}
                scrollEnabled={false}
                keyExtractor={item => item.index}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
