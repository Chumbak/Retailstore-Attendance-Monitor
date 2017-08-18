/**
* @Author: Harsha Attray <HarshaAttray>
* @Date:   2017-06-22T20:54:40+05:30
* @Project: Retailstore-Attendance-Monitor
* @Filename: App.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-17T18:54:44+05:30
* @Copyright: Chumbak design Pvt ltd
*/

import React, { Component } from 'react';
/*Extracting Platform base for differentiating iOS and android */
import {
  Platform
} from 'react-native';
import * as firebase from 'firebase';
/*HockeyApp integration for distribution, Crash updates and app analytics*/
import HockeyApp from 'react-native-hockeyapp';
/*Android specific location update trigger dialog
Appears ony if location services are disabled on the Android App
*/
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
/*Firebase messaging module for sending notifications*/
import FCM, { FCMEvent,
  NotificationType,
  WillPresentNotificationResult,
  RemoteNotificationResult } from 'react-native-fcm';

  /*Here API KEYS are accessed from the .env file. Add all your Firebase,
  Hockey app keys and URLs to thhe .env file and react-native-dotenv will access them */
  import {
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDING_ID,
    FIREBASE_API_KEY,
    FIREBASE_DATABASE_URL,
    FIREBASE_AUTH_DOMAIN,
    HOCKEY_APP_ID,
  } from 'react-native-dotenv';
  /*Initial App screen that appears while fetching location.
  Yes its pink . Can't do much about it*/
  import Splash from './components/screens/splash';
  /*Core Routing file to handle all the App navigation and a lot more.
  react-native-router-flux is magical with a pinch of salt*/
  import RouterComponent from './components/core/Router';

  /*Main App component.Branches out and provides access to both index.android and index.ios
  Component that is accessed in the AppRegistry.
  */
  export default class App extends Component {
    /* Defining state variables which can be manipulated later
    Here we have 3 state variables pertaining to checking users' Login state
    and the lat long values pulled from the navigator
    */
    state = {
      loggedIn: null,
      latitude: '',
      longitude: 'null',
    }
    /*Standard componentWillMount() function containing all the relavant function calls
    that are needed during first load. Here we have HockeyApp and  Firebase function calls
    */
    componentWillMount() {
      /*HockeyApp configuration with the AppID fetched from .env*/
      HockeyApp.configure(HOCKEY_APP_ID, true);
      firebase.initializeApp({
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        databaseURL: FIREBASE_DATABASE_URL,
        projectId: FIREBASE_PROJECT_ID,
        storageBucket: FIREBASE_STORAGE_BUCKET,
        messagingSenderId: FIREBASE_MESSAGING_SENDING_ID
      });
      /*Firebase Auth state tracker used to check User state (LoggedIn/loggedout)
      used for login state retention preventing users from logging in time and again
      Quite Handy!!
      */
      firebase.auth().onAuthStateChanged((user) => {
        /*Here we set user state based on the user data gathered from the above firebase call
        if user exisits we update the login state and add user-email to the userCred state
        */
        if (user) {
          this.setState({
            loggedIn: true,
            userCred: user.email
          });
        }
        else {
          this.setState({
            loggedIn: false,
            userCred: '',
          });
        }
      });
    }

    /*standard componentDidMount call.Here we initiate the HockeyApp tracking
    and also the app update check function is added here along with firebase and Platform verification
    */
    componentDidMount() {
      HockeyApp.start();
      /*Checks for New updates to the app*/
      HockeyApp.checkForUpdate();
      /*Detection of Platform is necessary here as iOS and Android handle
      location and location alerts differently  */
      Platform.OS === 'ios' ? this.locationFetchiOS() : this.locationFetchAnd();
      FCM.requestPermissions(); // for iOS
      /*Listener function for firebase serverless push notifications*/
      this.fcmLookup();
    }

    /*componentWillUnmount() function to unmount the listening functions*/
    componentWillUnmount() {
      /*Clears the navigator watcher mounted above*/
      navigator.geolocation.clearWatch(this.navigationId);
      /*Clears the notificationlistener if any*/
      this.notificationListener.remove();
      /*Checks for the refreshed token listener if any and removes it*/
      this.refreshTokenListener.remove();
    }
    /*function to fetch location params for Android  devices*/
    locationFetchAnd() {
      /*Location services dialog box that pops up if the location services are turned off*/
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: '<h2>Use Location ?</h2>Please enable loaction to proceed further:',
        ok: 'YES',
        cancel: 'NO'
      }).then(function (success) {
        /*Here we utilise the navigator to get geolocation coordinates and
        update the lat long positions obtained from the response into the state variables  */
        this.navigationId = navigator.geolocation.watchPosition((position) => {
          /*state variables are setup  and updated with the latitude and longitude coords*/
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        }, error => console.log(error), {
          /* Enabling  High Accuracy is used to track the users much more accurately but
          its not necessary for our usecase. Also battery drain must also be considered as
          a case in point here */
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 1000 });
        }.bind(this)
      ).catch((error) => {
        //console.log(error.message);
      });
    }
    /*function to fetch location params for iOS  devices. Similar functionality as the
    locationFetchAnd() function but iOS doesnt need a separate enable location alert */
    locationFetchiOS() {
      this.navigationId = navigator.geolocation.watchPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
      );
    }
    /* This function is taken from the firebase docs and keeps a
    watch on the firebase push Notifications*/
    fcmLookup() {
      FCM.requestPermissions(); // for iOS
      FCM.getFCMToken().then(token => {
        // console.log(token);
        // store fcm token in your server
      });
      this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        // there are two parts of notif. notif.notification contains the notification payload,
        //notif.data contains data payload
        if (notif.local_notification) {
          //this is a local notification
        }
        if (notif.opened_from_tray) {
          //app is open/resumed because user clicked banner
        }
        // await someAsyncCall();
        /*iOS has special usecases and types to handle firebase serverless push notifications*/
        if (Platform.OS === 'ios') {
          switch(notif._notificationType) {
            case NotificationType.Remote:
            //other types available: RemoteNotificationResult.NewData,
            //RemoteNotificationResult.ResultFailed
            notif.finish(RemoteNotificationResult.NewData);
            break;
            case NotificationType.NotificationResponse:
            notif.finish();
            break;
            case NotificationType.WillPresent:
            //other types available: WillPresentNotificationResult.None
            notif.finish(WillPresentNotificationResult.All);
            break;
          }
        }
      });
      this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
        // console.log(token);
        // fcm token may not be available on first load, catch it here
      });
    }
    render() {
      /*Based on if the location is fetched from the navigator or not
      we switch between the initial splash screen or the login/AttendanceCam screen*/
      if (this.state.latitude === '') {
        /*If the location data is undefined or empty as in this case
        the Splash screen with loader is shown.
        This is also essential since the state update in react is Async
        and is not updated on the fly. Hence we wait .....
        */
        return (
          <Splash />
        );
      }
      return (
        /*Once the state variables are updated with the lat/long values from the navigator
        or it times out, we push the values into  the RouterComponent making them accessible
        to other routes
        */
        <RouterComponent
          lat={this.state.latitude}
          long={this.state.longitude}
          loggedIn={this.state.loggedIn}
        />
      );
    }
  }
