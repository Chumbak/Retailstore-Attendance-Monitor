/**
 * @Author: Harsha Attray <harsha>
 * @Date:   2017-06-15T12:39:33+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: splash.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-17T17:13:14+05:30
 * @Copyright: Chumbak design Pvt ltd
 */

import React, { Component } from 'react';
import { Image, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default class Splash extends Component {
  render() {
    return (
    <Image style={styles.backgroundImage} source={require('../../Images/onboarding_screen.png')}>
      <ActivityIndicator
        style={[styles.centering]}
        size="large"
          color="white"
      >
      </ActivityIndicator>
         <Text style={styles.text}>Please wait, fetching your location ..... </Text>
     </Image>
      );
  }
}

/*Styling component for Splash Screen Component*/
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  text: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 18,
        paddingBottom: 100
    },
    centering: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
 },
});
