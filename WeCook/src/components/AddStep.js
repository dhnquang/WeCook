import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Close from 'react-native-vector-icons/AntDesign';
import Plus from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import {postStyle} from '../styles/postStyle';

export default class AddStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: [],
      inputData: [],
      inputImage: [],
    };
  }

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 260,
      cropping: true,
    }).then(image => {
      console.log(image);
      this.setState({
        inputImage: image.path,
      });
    });
  };

  //function to add TextInput dynamically
  addStep = index => {
    let textInput = this.state.textInput;
    textInput.push(
      <View style={postStyle.stepBar}>
        <View style={postStyle.stepBox}>
          <Text style={postStyle.index}>{index + 1}</Text>
        </View>
        <View style={postStyle.addInput}>
          <TextInput
            placeholder="Step..."
            multiline
            numberOfLines={2}
            style={postStyle.inputStep}
            onChangeText={text => this.addValues(text, index)}
          />
          <TouchableOpacity
            onPress={() => this.takePhotoFromCamera()}
            style={{
              marginTop: '2%',
              width: 120,
              height: 120,
              backgroundColor: '#C4C4C4',
            }}>
            <ImageBackground
              style={{
                width: 120,
                height: 120,
                backgroundColor: '#C4C4C4',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="camera" size={30} color="#fff" />
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>,
    );
    this.setState({textInput});
  };
  //function to remove TextInput dynamically
  removeStep = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({textInput, inputData});
  };

  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach(element => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray,
      });
    } else {
      dataArray.push({text: text, index: index});
      this.setState({
        inputData: dataArray,
      });
    }
  };

  //function to console the output
  getValues = event => {
    this.props.parentCallback(this.state.inputData);
    event.preventDefault();
  };

  render() {
    return (
      <View style={postStyle.box3}>
        <Text style={postStyle.boxHeader}>Steps</Text>
        {this.state.textInput.map(value => {
          return value;
        })}
        <View style={postStyle.button}>
          <TouchableOpacity
            style={postStyle.addButton}
            onPress={this.getValues}>
            <Text style={postStyle.submit}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.addStep(this.state.textInput.length)}
            style={postStyle.addButton}>
            <Plus name="plus" size={25} color="#51BC10" />
            <Text style={postStyle.addText}> Add Step</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.removeStep()}
            style={postStyle.addButton}>
            <Close name="close" size={25} color="#51BC10" />
            <Text style={postStyle.addText}> Delete Ingredient</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
