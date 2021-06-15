import React, {useState, useMemo, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Close from 'react-native-vector-icons/AntDesign';
import Plus from 'react-native-vector-icons/AntDesign';
import Minus from 'react-native-vector-icons/AntDesign';

import {postStyle} from '../styles/postStyle';
import {AuthContext} from '../routes/AuthProvider';

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
  const [time, setTime] = useState();
  const [ingredient, setIngredient] = useState('');
  const [steps, setSteps] = useState('');
  const [quantity, setQuantity] = useState(0);

  const {user} = useContext(AuthContext);

  const Decremental = () => {
    if (ration >= 1) {
      setRation(ration - 1);
    }
  };

  const [ingredientLength, setIngredientLength] = useState([1, 2]);
  const [stepLength, setStepLength] = useState([
    {
      id: 1,
      detail: 'Cook',
      img: null,
    },
    {
      id: 2,
      detail: 'test',
      img: null,
    },
  ]);

  //Use photo and camera
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 230,
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
      height: 230,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
    bs.current.snapTo(1);
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
        uID: user.uid,
        Like: null,
        Comment: null,
      })
      .then(() => {
        console.log('Data post set');
        Alert.alert(
          'Successfully!',
          'Your post has been uploaded successfully',
          [{text: 'Ok', onPress: () => console.log('alert close')}],
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

  const removeIngredient = item => () => {
    // console.log(item);
    const newIngredientLength = ingredientLength.filter(
      ingredientLength => ingredientLength != item,
    );
    // console.log(newIngredientLength);
    setIngredientLength(newIngredientLength);
  };
  //Create Ingredient Bar
  const renderIngredients = useMemo(
    () =>
      ingredientLength.map(item => {
        return (
          <View style={postStyle.ingredientBar} key={item.toString()}>
            <Close
              name="close"
              size={30}
              color="#51BC10"
              onPress={removeIngredient(item)}
            />
            <TextInput
              placeholder="Ingredient"
              style={postStyle.inputIngredient}
              // value={ingredient}
              // onChangeText={setIngredient}
            />
            <View style={postStyle.boxQuantity}>
              <TextInput
                placeholder="Quantity"
                placeholderTextColor="#fff"
                style={postStyle.inputQuantity}
              />
            </View>
          </View>
        );
      }),
    [ingredientLength],
  );

  const removeStep = item => () => {
    // console.log(item);
    const newStepLength = stepLength.filter(stepLength => stepLength != item);
    // console.log(newStepLength);
    setStepLength(newStepLength);
  };

  const addStep = () => {
    const newStep = stepLength[stepLength.length - 1] + 1;
    // console.log('aaa', newStep);
    setStepLength([...stepLength, newStep]);
  };
  //Create Step Bar
  const renderSteps = useMemo(
    () =>
      stepLength.map((item, index) => {
        return (
          <View style={postStyle.stepBar} key={item.id.toString()}>
            <View style={postStyle.stepBox}>
              <Text style={{fontFamily: 'Cabin-Regular', color: '#fff'}}>
                {index + 1}
              </Text>
            </View>
            <View style={{width: '80%', marginRight: '2%', marginLeft: '2%'}}>
              <TextInput
                placeholder="Step..."
                multiline
                numberOfLines={2}
                style={postStyle.inputStep}
              />
              <TouchableOpacity
                style={{
                  marginTop: '2%',
                  width: 120,
                  height: 120,
                  backgroundColor: '#C4C4C4',
                }}></TouchableOpacity>
            </View>
            <Close
              name="close"
              size={25}
              color="#51BC10"
              onPress={removeStep(item)}
            />
          </View>
        );
      }),
    [stepLength],
  );

  //Create Bottom Sheet
  const renderInner = () => (
    <View style={postStyle.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={postStyle.panelTitle}>Upload Photo</Text>
        <Text style={postStyle.panelSubtitle}>Choose Your Photo</Text>
      </View>
      <TouchableOpacity
        style={postStyle.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={postStyle.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={postStyle.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={postStyle.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={postStyle.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={postStyle.panelButtonTitle}>Cancel</Text>
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
              <Text>{transferred} % Completed!</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={submitPost} style={postStyle.buttonBox}>
              <Text style={postStyle.buttonText}>Recipe</Text>
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
              placeholder="Recipe name"
              placeholderTextColor="#000000"
              style={postStyle.inputName}
              value={recipe}
              onChangeText={setRecipe}
            />
          </View>
          <View style={postStyle.boxDescribe}>
            <Text style={postStyle.inputDescribe}>Describe your dish</Text>
            <TextInput
              multiline
              numberOfLines={2}
              style={postStyle.inputDescribe}
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={postStyle.boxRation}>
            <Text style={postStyle.textRation}>Ration</Text>
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
            <Text style={postStyle.textRation}>Ready in</Text>
            <View style={postStyle.boxTime}>
              <TextInput
                placeholder="time"
                style={postStyle.inputTime}
                keyboardType="numeric"
                value={time}
                onChangeText={setTime}
              />
              <Text style={postStyle.textTime}>minutes</Text>
            </View>
          </View>
        </View>
        <View style={postStyle.box2}>
          <Text style={postStyle.boxHeader}>Ingredients</Text>
          {renderIngredients}
          <TouchableOpacity
            onPress={() => setIngredientLength([...ingredientLength, 3])}
            style={postStyle.addButton}>
            <Plus name="plus" size={25} color="#51BC10" />
            <Text style={postStyle.addText}> Add Ingredient</Text>
          </TouchableOpacity>
        </View>
        <View style={postStyle.box3}>
          <Text style={postStyle.boxHeader}>Steps</Text>
          {renderSteps}
          <TouchableOpacity onPress={addStep} style={postStyle.addButton}>
            <Plus name="plus" size={25} color="#51BC10" />
            <Text style={postStyle.addText}> Add Step</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
