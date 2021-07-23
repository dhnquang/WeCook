import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

import {recipeStyle} from '../styles/recipeStyle';
import {ImageModal} from '../components/ImageModal';

export const Recipe = ({navigation, route}) => {
  const [data, setData] = useState(null);
  const [ingredients, setIngredient] = useState(null);
  const [step, setStep] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(nutrition);

  const getRecipe = async () => {
    await firestore()
      .collection('Category')
      .doc(route.params.CategoryID)
      .collection('Recipe')
      .doc(route.params.id)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('user post data', documentSnapshot.data());
          setData(documentSnapshot.data());
          setIngredient(documentSnapshot.data().Ingredients);
          setStep(documentSnapshot.data().Step);
          setNutrition(documentSnapshot.data().Nutrition);
        }
      });
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <ScrollView
      // showsVerticalScrollIndicator={false}
      style={recipeStyle.container}>
      {loading ? (
        <View style={{alignItems: 'center', marginTop: '90%'}}>
          <ActivityIndicator size={50} color="#28B446" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <TouchableOpacity style={recipeStyle.background} onPress={() => setModalVisible(!modalVisible)}>
            <ImageBackground
              source={
                data
                  ? {uri: data.img}
                  : require('../assets/backgrounds/backgroundPhoto.png')
              }
              resizeMode="cover"
              style={recipeStyle.background}>
              <TouchableOpacity
                style={{width: 35}}
                onPress={() => navigation.goBack()}>
                <Icons name="arrowleft" size={35} color="#fff" />
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <ImageModal data={data.img} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
          </Modal>
          <View style={recipeStyle.infoBox}>
            <View style={{marginHorizontal: '2%'}}>
              <Text style={recipeStyle.titleText}>
                {data ? data.Name : 'Recipe'}
              </Text>
              <View style={recipeStyle.headerBox}>
                <View style={recipeStyle.timeBox}>
                  <Icons name="clockcircleo" size={25} color="#6A6666" />
                  <Text style={recipeStyle.subText}>
                    {data ? data.Time : '0 min'}
                  </Text>
                </View>
                <View style={recipeStyle.direction}>
                  <Icon name="local-restaurant" size={25} color="#6A6666" />
                  <Text style={recipeStyle.subText}>
                    {data ? data.Ration : '0'}
                  </Text>
                </View>
              </View>
              <Text style={recipeStyle.heading}>Ingredients</Text>
              <FlatList
                style={recipeStyle.ingredientList}
                data={ingredients}
                renderItem={({item}) => (
                  <View style={recipeStyle.direction}>
                    <View style={recipeStyle.ingredientBox}>
                      <View style={recipeStyle.ingredientImgBox}>
                        <Image
                          source={{uri: item.img}}
                          style={{height: 90, width: 90, borderRadius: 45}}
                        />
                      </View>
                      <Text style={{fontFamily: 'Cabin-Regular', fontSize: 16}}>
                        {item.name}
                      </Text>
                      <Text style={recipeStyle.subText}>{item.quantity}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={true}
                horizontal={true}
              />
              <Text style={recipeStyle.heading}>Nutrition information</Text>
              <FlatList
                style={recipeStyle.nutritionBox}
                data={nutrition}
                renderItem={({item}) => (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={recipeStyle.nutritionText}>{item.name}</Text>
                    <Text style={recipeStyle.nutritionInfo}>
                      {item.quantity}
                    </Text>
                  </View>
                )}
                scrollEnabled={false}
                keyExtractor={item => item.name}
              />
              <Text style={recipeStyle.heading}>Steps</Text>
              <FlatList
                data={step}
                renderItem={({item, index}) => (
                  <View style={recipeStyle.stepBox}>
                    <View style={recipeStyle.index}>
                      <Text style={recipeStyle.textIndex}>{index + 1}</Text>
                    </View>
                    <Text style={recipeStyle.textStep}>{item}</Text>
                  </View>
                )}
                keyExtractor={item => item}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
