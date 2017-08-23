/**
 * @Author: Harsha Attray <harsha>
 * @Date:   2017-08-17T18:15:36+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: Input.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-22T15:30:15+05:30
 * @License: Apache License v2.0
 */

import React from 'react';
import { TextInput, View, Text } from 'react-native';

/*Input component is a part of the common reusable UI-components
 Used to customize text fields all over the codebase
*/
const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {

  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        style={inputStyle}
        value={value} onChangeText={onChangeText}
        underlineColorAndroid='transparent'
        autoCorrect={false}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
/*Styling for  Input Component*/
const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
};

export { Input };
