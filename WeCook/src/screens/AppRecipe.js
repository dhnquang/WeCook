import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import {TabView, SceneMap} from 'react-native-tab-view';
import Save from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { useTranslation } from 'react-i18next';

import {renderTabBar} from '../components/TabBar';
import {Appetizer} from './Category/Appetizer';
import {Entree} from './Category/Entree';
import {Dessert} from './Category/Dessert';
import {recipeStyle} from '../styles/recipeStyle';

const post = [
  {
    id: '1',
    RecipeImage: require('../assets/backgrounds/bugger.png'),
    RecipeTitle: 'Bugger',
    Time: '90 min',
    Calories: '550 cal',
  },
  {
    id: '2',
    RecipeImage: require('../assets/backgrounds/chicken.png'),
    RecipeTitle: 'Chicken Wings',
    Time: '30 min',
    Calories: '550 cal',
  },
  {
    id: '3',
    RecipeImage: require('../assets/backgrounds/pizza.png'),
    RecipeTitle: 'Peperoni Pizza',
    Time: '120 min',
    Calories: '550 cal',
  },
  {
    id: '4',
    RecipeImage: require('../assets/backgrounds/soup.png'),
    RecipeTitle: 'Pumpkin Soup',
    Time: '20 min',
    Calories: '20 cal',
  },
];

export default function AppRecipe({navigation}) {
  const [text, setText] = useState('');
  const [index, setIndex] = React.useState(0);
  const [appetizer, setAppetizer] = useState(null);
  const [entree, setEntree] = useState(null);
  const [dessert, setDessert] = useState(null);
  const {t} = useTranslation();

  const [routes] = React.useState([
    {key: 'first', title: t('breakfast')},
    {key: 'second', title: t('appetizer')},
    {key: 'third', title: t('entree')},
    {key: 'fourth', title: t('dessert')},
  ]);

  const BreakfastRoute = () => {
    return <View style={{flex: 1}}></View>;
  };
  const AppetizerRoute = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={appetizer}
          renderItem={({item}) => (
            <Appetizer item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  const EntreeRoute = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={entree}
          renderItem={({item}) => (
            <Entree item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  const DessertRoute = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={dessert}
          renderItem={({item}) => (
            <Dessert item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderScene = SceneMap({
    first: BreakfastRoute,
    second: AppetizerRoute,
    third: EntreeRoute,
    fourth: DessertRoute,
  });

  const getAppetizer = async () => {
    const list1 = [];
    await firestore()
      .collection('Category')
      .doc('Appetizers')
      .collection('Recipe')
      .get()
      .then(querySnapshot => {
        // console.log('Total Recipe: ', querySnapshot.size);
        querySnapshot.forEach(doc => {
          const {Name, img, Ration, CategoryID} = doc.data();
          list1.push({
            id: doc.id,
            Name: Name,
            Ration: Ration,
            img: img,
            CategoryID: CategoryID,
          });
        });
      });
    setAppetizer(list1);
  };

  const getEntree = async () => {
    const list2 = [];
    await firestore()
      .collection('Category')
      .doc('Entree')
      .collection('Recipe')
      .get()
      .then(querySnapshot => {
        // console.log('Total Recipe: ', querySnapshot.size);
        querySnapshot.forEach(doc => {
          const {Name, img, Ration, CategoryID} = doc.data();
          list2.push({
            id: doc.id,
            Name: Name,
            Ration: Ration,
            img: img,
            CategoryID: CategoryID,
          });
        });
      });
    setEntree(list2);
  };

  const getDessert = async () => {
    const list3 = [];
    await firestore()
      .collection('Category')
      .doc('Dessert')
      .collection('Recipe')
      .get()
      .then(querySnapshot => {
        // console.log('Total Recipe: ', querySnapshot.size);
        querySnapshot.forEach(doc => {
          const {Name, img, Ration, CategoryID} = doc.data();
          list3.push({
            id: doc.id,
            Name: Name,
            Ration: Ration,
            img: img,
            CategoryID: CategoryID,
          });
        });
      });
    setDessert(list3);
  };

  useEffect(() => {
    getAppetizer();
    getEntree();
    getDessert();
  }, []);

  return (
    <View style={recipeStyle.container}>
      <View style={recipeStyle.headerBar}>
        <Text style={recipeStyle.header}>{t('header')}</Text>
      </View>
      <LinearGradient
        colors={['#A8EB7F', '#51A68C']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={recipeStyle.searchBar}>
        <SearchIcon
          name="search1"
          size={25}
          color="#fff"
          style={recipeStyle.searchIcon}
          onPress={() => {}}
        />
        <TextInput
          style={recipeStyle.inputText}
          placeholder={t('search')}
          placeholderTextColor="#fff"
          value={text}
          onChangeText={setText}
        />
      </LinearGradient>
      <Text style={recipeStyle.text}>{t('saveRep')}</Text>
      <View style={recipeStyle.horizontalPost}>
        <FlatList
          data={post}
          renderItem={({item}) => (
            <View style={recipeStyle.recipe}>
              <Image
                source={item.RecipeImage}
                resizeMode="cover"
                style={recipeStyle.image}
              />
              <View style={recipeStyle.textBox}>
                <View style={recipeStyle.textView}>
                  <Text style={[recipeStyle.textRecipe]}>
                    {item.RecipeTitle}
                  </Text>
                  <View style={recipeStyle.info}>
                    <Text style={recipeStyle.textInfo}>{item.Time} </Text>
                    <Text style={recipeStyle.textInfo}>{item.Calories}</Text>
                  </View>
                </View>
                <View style={recipeStyle.icon}>
                  <Save name="bookmark" size={30} color="gray" />
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={true}
          horizontal={true}
        />
      </View>
      <View style={{flex: 2}}>
        <Text style={recipeStyle.text}>{t('menu')}</Text>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: '100%'}}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
}
