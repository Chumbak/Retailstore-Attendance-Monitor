/**
 * @Author: Harsha Attray <harsha>
 * @Date:   2017-08-17T18:15:36+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: AttendanceCam.js
 * @Last modified by:   harsha
 * @Last modified time: 2018-02-22T12:56:45+05:30
 * @License: Apache License v2.0
 */

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
/* importing required modules from the react-native-camera Component */
import { RNCamera } from 'react-native-camera';
/**/
import * as firebase from 'firebase';
/* Component for implementing reverse-Geocoding */
import Geocoder from 'react-native-geocoder';
/* Navigation driver for the app */
import { Actions } from 'react-native-router-flux';
/* Adds intuitive loading components to the app */
import * as Progress from 'react-native-progress';


/*Component for the camera module of the application*/
export default class AttendanceCam extends Component {
  /* Defining state variables which can be manipulated later*/
  state = {
    cameraType: 'front',
    mirrorMode: true,
    showModal: false,
    position: null,
    captureLoading: false,
    streetName: '',
    locality: '',
    checkTime: null,
    checkSchedule: null,
    loadingCred: false
  }

  /*This is the  reverse Geo-coding component that takes in the lat/Long values
  from the navigator initialised in the App.js */
  async takeLocation() {
    /*NY object consits of the lat  long params passed to the component
    'AttendanceCam' component */
    const NY = {
      lat: this.props.lat,
      lng: this.props.long
    };
/*The Geocoder plugin takes the latlong state values from the NY object and returns the
reverseGeocoded data containing street level accuray*/
    try {
      const res = await Geocoder.geocodePosition(NY);
      this.setState({
        streetName: res[0].streetName,
        locality: res[0].locality
      });
    }
    catch (err) {
      // console.log(err);
    }
  }

/*The takePicture function is the trigger point for the camera image capture.
This is bound to the onPress call on the render metod of the AttendanceCam component*/
  takePicture() {
  /* setting state variable to manipulate loading component conditionally.
  Takes in  a boolean value */
    this.setState({
      loadingCred: true
    });
  /*react-native-camera module gives the option to pass in params to the generated image data
   Add the additional params to the options object
  */
    const options = {};
    /*takeLocation() Function call is an Async function call triggered within this function
      returns the state variables with updated streetName and locality data
      (We are restricting it to these two variables here , but the response contains
      much more detailed params)
     */
    this.takeLocation();
    //options.location = ...
    /*camera.capture is a react-native-camera module based trigger which takes in metadata from the
     options variable above and returns principally the path(saved file path) of the generated image
       */
    this.camera.takePictureAsync({ metadata: options })
    .then((data) => {
      const SavedImage = data.uri;
      if (SavedImage) {
        /*Here we get the unique id that firebase generates for each use using firebase.auth()  */
        const { currentUser } = firebase.auth();
        /*The path of user-data to be stored in the firebasedB is mentioned here
        along with the uid captured from the above call */
        const userPath = '/employees/records/' + `${currentUser.uid}`;
        /*This section here checks if the user has already submitted their attendance previously*/
        firebase.database().ref(userPath).on('value', (snapshot) => {
          /*This is a standard Fireabase data retrieval call which returns
           data into the snapshot variable*/
          if (snapshot.val()) {
            const dataStore = snapshot.val();
            const lastCheck = dataStore[Object.keys(dataStore)[Object.keys(dataStore).length - 1]];
            this.setState({
              /*State variable manipulation based on data fetched from firebase*/
              checkTime: lastCheck.date.toLocaleString().split(' ', 5).join(' '),
              checkSchedule: lastCheck.schedule
            });
          }
          this.setState({
            loadingCred: false
          });
          /*Actions is a react-native-router-flux function used to traverse through
          preassigned routes. Here we are passing params with their updated values which will be
          accessed in the traversed state. Much like a normal param in a component
          */
          Actions.initUpload({
            SavedImage,
            streetName: this.state.streetName,
            locality: this.state.locality,
            checkTime: this.state.checkTime,
            checkSchedule: this.state.checkSchedule
          });
        });
        /*Firebase check for first time user attendance submission ends here*/
      }
    })
    .catch(err => console.error(err));
  }

  /*captureSwitch is a conditional template switch to show the progress view or the camera
  snapper based on the loadingCred state variable value */
  captureSwitch() {
    if (this.state.loadingCred) {
      return (
        <View style={styles.buttonContainer}>
          <View style={styles.smallButtonContainer}>
            <Progress.CircleSnail color={['orange']} />
          </View>
        </View>
      );
    }
    /*Standard default return view if the loadingCred variable is set to false*/
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.smallButtonContainer}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            transparent
            style={styles.captureButton}
          >
          <Image source={require('../../Images/ic_camera.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  /*Main render()  section for the camera component */
  render() {
    return (
      <View style={styles.main}>
        {/*Camera module imported from  react-native-camera with all the necessary
         accessibility options */}
        <RNCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.camera}
          type={this.state.cameraType}
          mirrorImage={this.state.mirrorMode}
          playSoundOnCapture={false}
        />
        {/*captureSwitch() used to switch between views based on user interaction*/}
        {this.captureSwitch()}
      </View>
    );
  }
}

/* Section for styling  AttendanceCam component*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  capture: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },

  main: {
    flex: 1,
    flexDirection: 'row',
  },
  camera: {
    opacity: 1,
    position: 'absolute',
    backgroundColor: 'white',
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  smallButtonContainer: {
    width: 50,
    height: 50,
    marginBottom: 50
  },
  captureButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: 'white'
  }
});
