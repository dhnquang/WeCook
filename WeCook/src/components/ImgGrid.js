import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import { profileStyle } from '../styles/profileStyle';

export const ImgGrid = ({item, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailRecipe', {id: item.id, uID: item.uID})} style={profileStyle.imgBox}>
      <Image
        source={{uri: item.PostImage}}
        resizeMode="cover"
        style={profileStyle.imgPost}
      />
    </TouchableOpacity>
  );
};
