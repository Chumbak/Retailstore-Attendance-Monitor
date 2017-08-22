/**
 * @Author: Harsha Attray <harsha>
 * @Date:   2017-08-17T18:15:36+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: success.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-22T15:31:55+05:30
 * @License: Apache License v2.0
 */

import React, { Component } from 'react';

import { Text, View, BackAndroid, Image, Platform } from 'react-native';
/*Importing Common UI-components*/
import { Button, CardSection } from '../common/';

export default class SuccessView extends Component {

/*Success View with Custom Platform dependent Views for android and iOS*/
  successSwitch() {
    if (Platform.OS === 'ios') {
      return (
        <Text style={styles.textStyle}>
            .
        </Text>
      );
     }
     return (
       /* This closes the app onPress in android*/
       <CardSection style={styles.cardSectionStyle}>
         <Button onPress={() => BackAndroid.exitApp()}>
             Done
         </Button>
       </CardSection>
     );
  }
  render() {
    return (
      /*Success View with a switch function*/
      <View>
        <View style={styles.logoContainer}>
          <Image source={require('../../Images/icon.png')} />
        </View>
        <CardSection style={styles.cardSectionStyle}>
          <Text style={styles.textStyle}>
          Your Attendance Has been submitted
           - Happy Working
        </Text>
      </CardSection>
      {this.successSwitch()}
      </View>
    );
  }
}
/*SuccessView Component Styles*/
const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
    paddingTop: 50,
    paddingBottom: 50
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  }
};
