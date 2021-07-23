import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {recipeStyle} from '../../styles/recipeStyle';

export const Entree = ({item, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', {id: item.id, CategoryID: item.CategoryID})} style={recipeStyle.recipeBox}>
      <Image
        source={{uri: item.img}}
        resizeMode="cover"
        style={recipeStyle.img}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={recipeStyle.textRecipe}>{item.Name}</Text>
        <Text style={recipeStyle.textInfo}>{item.Ration}</Text>
      </View>
    </TouchableOpacity>
  );
};
