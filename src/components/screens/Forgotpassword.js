/**
 * @Author: Harsha Attray <harsha>
 * @Date:   2017-08-17T18:15:36+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: Forgotpassword.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-22T15:32:50+05:30
 * @License: Apache License v2.0
 */
import React, { Component } from 'react';
import firebase from 'firebase';
/*State traversal workhorse function for route traversal*/
import { Actions } from 'react-native-router-flux';

import { View, Image, Alert } from 'react-native';
/*Importing Common UI-components*/
import { Button, CardSection, Input, Loader } from '../common/';
// Forgot Password Component
export default class Forgot extends Component {

  /*Initialising state variables*/
  state = {
    email: '',
    password: '',
    loading: false,
  };
  /*Trigger function for sending the reset link of the password
   Takes in a valid email-id
  */
  sendResetLink() {
    /*State variable for manipulating loader*/
    this.setState({
      loading: true
    });
    /*Shorthand for setting email state value*/
    const { email } = this.state;

    /* Frebase call to send password reset email*/
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      this.setState({
        loading: false
      });
      Alert.alert(
        'Upload Successful',
        'Sending Credentials',
        [
          { text: 'OK',
            onPress: Actions.LoginForm()
          },
        ],
        { cancelable: false }
      );
         })
         .catch((e) => {
           this.setState({
             loading: false
           });
           alert(e);
     });
  }
  /* Custom Loading config checker*/
  statusCheck() {
      if (this.state.loading) {
        return <Loader size='small' />;
      }
      return (
        <Button onPress={this.sendResetLink.bind(this)}>
            Send Link
        </Button>
      );
  }

  render() {
    return (
      <View>
        <View style={styles.logoContainer}>
          <Image source={require('../../Images/icon.png')} />
        </View>
        <CardSection>
          <Input
            value={this.state.email}
            label="Email :"
            placeholder="Enter Your email "
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
      <CardSection style={styles.cardSectionStyle}>
        {this.statusCheck()}
      </CardSection>
      </View>
    );
  }
}

//Component Styles added here
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
