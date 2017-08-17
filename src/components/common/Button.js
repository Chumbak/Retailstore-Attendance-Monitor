/**
* @Author: Harsha Attray <HarshaAttray>
* @Date:   2017-05-22T17:34:23+05:30
* @Project: Retailstore-Attendance-Monitor
* @Filename: Button.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-17T18:55:19+05:30
* @Copyright: Chumbak design Pvt ltd
*/

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
/*Button component is a part of the common reusable UI-components*/
const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      /*Takes in styles and name dynamically wherever imported and passed onto*/
      <Text style={styles.textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

/*Styling for the Button component*/
const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
