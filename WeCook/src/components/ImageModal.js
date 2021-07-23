import React from 'react';
import {View,Image} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

export const ImageModal = ({data, modalVisible, setModalVisible}) => {
	return(
		<View style={{flex: 1, backgroundColor: '#2F2F2F', justifyContent:'center', alignItems:'center'}}>
			<Icon name='close' size={30} color='#fff' style={{alignSelf: 'flex-start', marginTop: '10%'}} onPress={() => setModalVisible(!modalVisible)}/>
			<Image
				source={{uri: data}}
				resizeMode='contain'
				style={{width: '100%', height: '100%'}}
			/>
		</View>
	);
}