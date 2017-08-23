/**
 * @Author: Harsha Attray <harsha>
 * @Date:   2017-08-17T18:15:36+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: LoginScreen.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-22T15:33:11+05:30
 * @License: Apache License v2.0
 */

import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Image, ScrollView } from 'react-native';
import firebase from 'firebase';
/* Navigation driver for the app */
import { Actions } from 'react-native-router-flux';
/*Importing Common UI-components*/
import { Button, Card, CardSection, Input, Loader } from '../common/';

/*Login Screen Component*/
class LoginScreen extends Component {
  /* Defining state variables which can be manipulated later*/
  state = {
    email: '',
    password: '',
    fname: '',
    lname: '',
    id: '',
    error: '',
    loading: false,
    userCheck: false,
  };
/*onloginSubmit is a standard firebase email and password Authentication call
  it takes in user email and password params based on the state values
*/
  onloginSubmit() {
    const { email, password } = this.state;
    /*Setting state variables to handle error and loading params */
    this.setState({
      error: '',
      loading: true,
    });
    /*User login call with two outcomes- On success the loginSuccessHandle is executed
    onError an alert with the error message is  displayed on the screen*/
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.loginSuccessHandle();
    })
    .catch((e) => {
      this.loginFailedHandle();
      alert(e);
    });
  }
  /*This function call is used to Create user. It derives the email and username
   details from the state variables with additional params passed in the firebase function call*/
  onUserCreate() {
    this.userCreate();
    const { email, password, fname, lname, id } = this.state;
    /*Making First name mandatory*/
    if (this.state.fname) {
      /*Setting state params*/
      this.setState({
        error: '',
        loading: true,
      });
      /*Appending first name and Last name .. That was the requirement*/
      const name = fname + ' ' + lname;
      /*Standard firebase create User call with email and password . it returns the user data*/
      firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        /*On success call*/
        this.loginSuccessHandle();
        /*Firebase restricts the amount of configurable params that can be passed while
        creating users. It allows a displayName and image(Not a requirement)*/
        user.updateProfile({
          displayName: name,
        });
        /*Fetchinh the current user Data from firebase*/
        const { currentUser } = firebase.auth();
        /*There are two DB storage paths created, this one is  to store extra custom
        info of the users*/
        firebase.database().ref(`/employees/info/${currentUser.uid}/`)
        .push({
          name, email, id
        });
        this.loginSuccessHandle();
      })
      .catch(this.loginFailedHandle.bind(this));
    }
    else {
      this.setState({
        error: 'Please enter First name',
        loading: false,
      });
    }
  }

  /*Login successful state handler which resets the state variables
  and redirects the users to the camView using Actions handler(react-native-router-flux)
  */
  loginSuccessHandle=() => {
    Actions.mainCamView();
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
  }
  /*In case of a failed login/create User, the state variables are reset*/
  loginFailedHandle() {
    this.setState({
      error: 'Authentication Failed',
      loading: false,
    });
  }
  /*This function triggers the password reset route using the Action-Scene traversal*/
  passwordReset() {
    Actions.passwordReset();
  }
  /*Template switch function for setting state variables that offer conditional rendering of
  createUser buttons and login buttons*/
  userCreate() {
    this.setState({
      userCheck: true,
      loading: false
    });
  }
  /*Template switch function for setting state variables that offer conditional rendering of
  createUser buttons and login buttons*/
  initScreen() {
    this.setState({
      userCheck: false,
      loading: false,
      error: ''
    });
  }
  /*Render loader / button conditionally*/
  loadingCheck() {
    if (this.state.loading) {
      return <Loader size='small' />;
    }
    else if (this.state.userCheck) {
      return (
        <Button onPress={this.onUserCreate.bind(this)}>
          Create User
        </Button>
      );
    }
    return (
      <Button disabled={!this.state.email} onPress={this.onloginSubmit.bind(this)}>
        Login
      </Button>
    );
  }
  /*switch trigger between create user and login screens*/
  toggleSignup() {
    if (this.state.loading) {
      return <Loader size='small' />;
    }
    else if (this.state.userCheck) {
      return (
        <Card>
          <CardSection>
            <Button onPress={this.initScreen.bind(this)}>
              Back
            </Button>
          </CardSection>
        </Card>
      );
    }
    return (
      <Card>
        <CardSection>
          <Button onPress={this.userCreate.bind(this)}>
            Create User
          </Button>
        </CardSection>
        <CardSection>
          <Text style={styles.textStyle} onPress={this.passwordReset.bind(this)}>
            Forgot Password?
          </Text>
        </CardSection>
      </Card>
    );
  }
  /*Create user form template*/
  createUserForm() {
    if (this.state.userCheck) {
      return (
        <View>
          <KeyboardAvoidingView behavior="padding">
            <CardSection>
              <Input
                value={this.state.fname}
                label="First Name :"
                placeholder="Enter First Name "
                onChangeText={fname => this.setState({ fname })}
              />
            </CardSection>
            <CardSection>
              <Input
                value={this.state.lname}
                label="Last Name :"
                placeholder="Enter Last Name "
                onChangeText={lname => this.setState({ lname })}
              />
            </CardSection>
            <CardSection>
              <Input
                value={this.state.id}
                label="EmpId :"
                placeholder="Employee ID "
                onChangeText={id => this.setState({ id })}
              />
            </CardSection>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }
  /*Render function for createUser/ loginUser*/
  render() {
    return (
      <ScrollView>
        <View style={styles.loginStyles}>
          <KeyboardAvoidingView behavior="padding">
            <Card>
              {this.createUserForm()}
              <CardSection>
                <Input
                  value={this.state.email}
                  label="Email :"
                  placeholder="user@chumbak.in"
                  onChangeText={email => this.setState({ email })}
                />
              </CardSection>
              <CardSection>
                <Input
                  secureTextEntry={true}
                  label="Password :"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                />
              </CardSection>
              <Text style={styles.errorTextStyles}>{this.state.error}</Text>
              <Text style={styles.text}> * Password must be 6 characters long</Text>
              <CardSection>
                {this.loadingCheck()}
              </CardSection>
              {this.toggleSignup()}
            </Card>
          </KeyboardAvoidingView>
          <View style={styles.logoContainer}>
            <Image source={require('../../Images/icon.png')} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

/*Styles for the LoginScreen Component*/

const styles = {
  loginStyles: {
    paddingTop: 100
  },
  logoContainer: {
    paddingTop: 50,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  errorTextStyles: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'orange'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
    paddingTop: 20,
    color: 'orange',
    paddingBottom: 20
  },
  text: {
    textAlign: 'center',
    color: 'orange',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 16
  }
};

export default LoginScreen;
