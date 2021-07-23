import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Close from 'react-native-vector-icons/AntDesign';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useTranslation } from 'react-i18next';

import {profileStyle} from '../styles/profileStyle';
import {AuthContext} from '../routes/AuthProvider';

export const ProfileModal = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const {t} = useTranslation();

  const getUser = async () => {
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();
    console.log('ava url', imgUrl);

    if (imgUrl == null && userData.Avatar) {
      imgUrl = userData.Avatar;
    }

    firestore()
      .collection('Users')
      .doc(user.uid)
      .update({
        Name: userData.Name,
        Email: userData.Email,
        Bio: userData.Bio,
        Avatar: imgUrl,
        Phone: userData.Phone
      })
      .then(() => {
        console.log('User Updated');
        ToastAndroid.show(
          'Your profile has been updated successfully',
          ToastAndroid.SHORT,
        );
      });
  };

  //Upload Image
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to file name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    const storageRef = storage().ref(`Avatar/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setImage(null);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  //Use photo and camera
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      // console.log(image);
      setImage(image.path);
    });
    bs.current.snapTo(1);
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      // console.log(image);
      setImage(image.path);
    });
    bs.current.snapTo(1);
  };

  //Create Bottom Sheet
  const renderInner = () => (
    <View style={profileStyle.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={profileStyle.panelTitle}>{t('upload')}</Text>
        <Text style={profileStyle.panelSubtitle}>{t('choose')}</Text>
      </View>
      <TouchableOpacity
        style={profileStyle.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={profileStyle.panelButtonTitle}>{t('camera')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={profileStyle.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={profileStyle.panelButtonTitle}>{t('library')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={profileStyle.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={profileStyle.panelButtonTitle}>{t('cancel')}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderHeader = () => (
    <View style={profileStyle.header}>
      <View style={profileStyle.panelHeader}>
        <View style={profileStyle.panelHandle}></View>
      </View>
    </View>
  );

  return (
    <View style={profileStyle.modalContainer}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <View style={{flex: 1}}>
        <View style={profileStyle.headerBar}>
          <View style={profileStyle.closeIcon}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={{width: 30}}>
              <Close name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={profileStyle.box}>
            <TouchableOpacity
              onPress={handleUpdate}
              style={profileStyle.buttonBox}>
              <Text style={profileStyle.buttonText}>{t('update')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{flex: 1}}>
          <View style={profileStyle.avaView}>
            <View style={profileStyle.avaContainer}>
              <Image
                source={{
                  uri: image
                    ? image
                    : userData
                    ? userData.Avatar ||
                      'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2Fuser-profile.png?alt=media&token=ca27a206-cc1f-4785-b310-a620137d4f74'
                    : 'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2Fuser-profile.png?alt=media&token=ca27a206-cc1f-4785-b310-a620137d4f74',
                }}
                resizeMode="cover"
                style={profileStyle.avatar}
              />
            </View>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <Text style={profileStyle.changeText}>
                {t('profile')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={profileStyle.infoBar}>
            <Text style={profileStyle.infoText}> {t('name')}:</Text>
            <TextInput
              style={profileStyle.infoInput}
              value={userData ? userData.Name : ''}
              onChangeText={txt => setUserData({...userData, Name: txt})}
            />
          </View>
          <View style={profileStyle.infoBar}>
            <Text style={profileStyle.infoText}> Email:</Text>
            <TextInput
              style={profileStyle.infoInput}
              value={userData ? userData.Email : ''}
              onChangeText={txt => setUserData({...userData, Email: txt})}
            />
          </View>
          <View style={profileStyle.infoBar}>
            <Text style={profileStyle.infoText}> {t('phone')}:</Text>
            <TextInput
              style={profileStyle.infoInput}
              keyboardType='number-pad'
              value={userData ? userData.Phone : ''}
              onChangeText={txt => setUserData({...userData, Phone: txt})}
            />
          </View>
          <View style={profileStyle.infoBar}>
            <Text style={profileStyle.infoText}> {t('bio')}:</Text>
            <TextInput
              placeholder="Tell about yourself"
              style={profileStyle.infoInput}
              value={userData ? userData.Bio : ''}
              onChangeText={txt => setUserData({...userData, Bio: txt})}
            />
          </View>
          <TouchableOpacity onPress={logout} style={profileStyle.logoutButton}>
            <Text style={profileStyle.logoutText}>{t('logout')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
