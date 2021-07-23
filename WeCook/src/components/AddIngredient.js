import React, {Component, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Close from 'react-native-vector-icons/AntDesign';
import Plus from 'react-native-vector-icons/AntDesign';

import {postStyle} from '../styles/postStyle';

export default class AddIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: [],
      inputData: [],
      inputQuantity: [],
    };
  }

  //function to add TextInput dynamically
  addIngredient = index => {
    let textInput = this.state.textInput;
    textInput.push(
      <View style={postStyle.ingredientBar}>
        <TextInput
          placeholder="Ingredient"
          style={postStyle.inputIngredient}
          onChangeText={text => this.addValues(text, index)}
        />
        <View style={postStyle.boxQuantity}>
          <TextInput
            placeholder="Quantity"
            placeholderTextColor="#fff"
            style={postStyle.inputQuantity}
            onChangeText={text => this.addQuantityValues(text, index)}
          />
        </View>
      </View>,
    );
    this.setState({textInput});
  };
  //function to remove TextInput dynamically
  removeIngredient = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    let inputQuantity = this.state.inputQuantity;
    textInput.pop();
    inputQuantity.pop();
    inputData.pop();
    this.setState({textInput, inputData, inputQuantity});
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

  addQuantityValues = (text, index) => {
    let quantityArray = this.state.inputQuantity;
    let checkBool = false;
    if (quantityArray.length !== 0) {
      quantityArray.forEach(element => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputQuantity: quantityArray,
      });
    } else {
      quantityArray.push({text: text, index: index});
      this.setState({
        inputQuantity: quantityArray,
      });
    }
  };

  //function to console the output
  getValues = event => {
    this.props.parentCallback(this.state.inputData, this.state.inputQuantity);
    event.preventDefault();
  };

  render() {
    return (
      <View style={postStyle.box2}>
        <Text style={postStyle.boxHeader}>Ingredients</Text>
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
            onPress={() => this.addIngredient(this.state.textInput.length)}
            style={postStyle.addButton}>
            <Plus name="plus" size={25} color="#51BC10" />
            <Text style={postStyle.addText}> Add Ingredient</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.removeIngredient()}
            style={postStyle.addButton}>
            <Close name="close" size={25} color="#51BC10" />
            <Text style={postStyle.addText}> Delete Ingredient</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
