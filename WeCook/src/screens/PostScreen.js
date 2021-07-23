import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, {set} from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Close from 'react-native-vector-icons/AntDesign';
import Plus from 'react-native-vector-icons/AntDesign';
import Minus from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';

import {postStyle} from '../styles/postStyle';
import {AuthContext} from '../routes/AuthProvider';
import AddIngredient from '../components/AddIngredient';
import AddStep from '../components/AddStep';

export default function PostScreen({navigation}) {
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [image, setImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2FbackgroundPhoto.png?alt=media&token=553cac82-1f00-4de0-8565-05044ee92731',
  );
  const [ration, setRation] = useState(0);
  const [recipe, setRecipe] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [ingredient, setIngredient] = useState(null);
  const [steps, setSteps] = useState(null);
  const [quantity1, setQuantity1] = useState(null);

  const {user} = useContext(AuthContext);
  const {t} = useTranslation();

  const Decremental = () => {
    if (ration >= 1) {
      setRation(ration - 1);
    }
  };

  const handleCallback = (childData, childQuantity) => {
    setIngredient(childData);
    setQuantity1(childQuantity);
  };

  const handleCallback2 = childData => {
    setSteps(childData);
  };
  console.log(steps);
  console.log(ingredient);
  console.log(quantity1);
  //Use photo and camera
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 260,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
    bs.current.snapTo(1);
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 260,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
    bs.current.snapTo(1);
  };

  const checkPost = () => {
    if (
      image ==
        'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2FbackgroundPhoto.png?alt=media&token=553cac82-1f00-4de0-8565-05044ee92731' ||
      recipe.length == 0 ||
      ration == 0 ||
      time.length == 0 ||
      ingredient == null ||
      quantity1 == null ||
      steps == null
    ) {
      ToastAndroid.show('Missing information', ToastAndroid.SHORT);
      setUploading(false);
    } else {
      submitPost;
    }
  };

  // Submit Post
  const submitPost = async () => {
    const imageUrl = await uploadImage();
    // console.log(imageUrl);
    firestore()
      .collection('Posts')
      .add({
        Recipe: recipe,
        Description: description,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        Ration: ration,
        Time: time,
        Ingredient: ingredient,
        IngredientQuantity: quantity1,
        Step: steps,
        uID: user.uid,
        Like: 0,
        Comment: 0,
        UserLikes: [],
      })
      .then(() => {
        console.log('Data post set');
        ToastAndroid.show(
          t('postNotification'),
          ToastAndroid.SHORT,
        );
        navigation.navigate('NewFeed');
        setImage(
          'https://firebasestorage.googleapis.com/v0/b/wecook-5ab29.appspot.com/o/BackGround%2FbackgroundPhoto.png?alt=media&token=553cac82-1f00-4de0-8565-05044ee92731',
        );
        setRecipe(null);
        setDescription(null);
        setRation(0);
        setTime(null);
      })
      .catch(e => {
        console.log('Upload Post data error:', e);
      });
  };

  //Upload Image
  const uploadImage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to file name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`RecipePhotos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    //Set transferred state
    task.on('state_changed', taskSnapshot => {
      // console.log(
      //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      // );
      setTransferred(
        Math.round(
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
        ),
      );
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  //Create Bottom Sheet
  const renderInner = () => (
    <View style={postStyle.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={postStyle.panelTitle}>{t('upload')}</Text>
        <Text style={postStyle.panelSubtitle}>{t('choose')}</Text>
      </View>
      <TouchableOpacity
        style={postStyle.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={postStyle.panelButtonTitle}>{t('camera')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={postStyle.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={postStyle.panelButtonTitle}>{t('library')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={postStyle.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={postStyle.panelButtonTitle}>{t('cancel')}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderHeader = () => (
    <View style={postStyle.header}>
      <View style={postStyle.panelHeader}>
        <View style={postStyle.panelHandle}></View>
      </View>
    </View>
  );

  return (
    <View style={postStyle.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <View style={postStyle.headerBar}>
        <View style={postStyle.closeIcon}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewFeed')}
            style={{width: 30}}>
            <Close name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={postStyle.box}>
          {uploading ? (
            <View style={postStyle.uploadBox}>
              <ActivityIndicator size="large" color="#fff" />
              <Text>{transferred} % {t('complete')}</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={checkPost} style={postStyle.buttonBox}>
              <Text style={postStyle.buttonText}>{t('post')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView style={postStyle.body}>
        <View style={postStyle.box1}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <Image
              source={{uri: image}}
              resizeMode="cover"
              style={postStyle.background}
            />
          </TouchableOpacity>
          <View style={postStyle.boxName}>
            <TextInput
              placeholder={t('recipe')}
              placeholderTextColor="#000000"
              style={postStyle.inputName}
              value={recipe}
              onChangeText={setRecipe}
            />
          </View>
          <View style={postStyle.boxDescribe}>
            <Text style={postStyle.inputDescribe}>{t('describe')}</Text>
            <TextInput
              multiline
              numberOfLines={2}
              style={postStyle.inputDescribe}
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={postStyle.boxRation}>
            <Text style={postStyle.textRation}>{t('ration')}</Text>
            <View style={postStyle.buttonRation}>
              <TouchableOpacity onPress={Decremental}>
                <Minus name="minus" size={18} />
              </TouchableOpacity>
              <Text style={postStyle.numberRation}>{ration}</Text>
              <TouchableOpacity onPress={() => setRation(ration + 1)}>
                <Plus name="plus" size={18} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={postStyle.boxPrepare}>
            <Text style={postStyle.textRation}>{t('prepare')}</Text>
            <View style={postStyle.boxTime}>
              <TextInput
                placeholder={t('times')}
                style={postStyle.inputTime}
                keyboardType="numeric"
                value={time}
                onChangeText={setTime}
              />
              <Text style={postStyle.textTime}>{t('minute')}</Text>
            </View>
          </View>
        </View>
        <AddIngredient parentCallback={handleCallback} />
        <AddStep parentCallback={handleCallback2} />
      </ScrollView>
    </View>
  );
}
