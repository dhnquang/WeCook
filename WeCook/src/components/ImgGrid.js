import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import { profileStyle } from '../styles/profileStyle';

export const ImgGrid = ({item}) => {
  return (
    <TouchableOpacity style={profileStyle.imgBox}>
      <Image
        source={{uri: item.PostImage}}
        resizeMode="cover"
        style={profileStyle.imgPost}
      />
    </TouchableOpacity>
  );
};
