/**
 * @Author: Harsha Attray <harsha>
 * @Date:   2017-08-17T18:15:36+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: Router.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-22T15:31:42+05:30
 * @License: Apache License v2.0
 */

import React, { Component } from 'react';
/*react-native-router-flux is the principal source of navigation and more..*/
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import firebase from 'firebase';

/*Login View Component*/
import LoginScreen from '../screens/LoginScreen';
/*AttendanceCam Component*/
import AttendanceCam from './AttendanceCam';
/*Forgot Password and retrieval Component*/
import ForgotPassword from '../screens/Forgotpassword';
/*Upload View Component*/
import UploadRequest from './upload';
/**Successful upload Component*/
import SuccessView from './success';

/* Main Routing Component for the app. All the Routes have Dynamic Screen titles */
export default class RouterComponent extends Component {
  /*unction to handle logout route */
  logoutHandler() {
    /*Standard firebase logout call*/
    firebase.auth().signOut();
    /*State traversal to login screen  using Actions once logout is executed*/
    Actions.auth();
  }
  render() {
    return (
      /*react-native-router-flux routing Stack*/
      <Router sceneStyle={{ paddingTop: 65 }} >
        {/*Login Screen RouterScene with logggedIn State check linked to
          the LoginScreen Component*/}
        <Scene key="auth" type={ActionConst.RESET}>
          <Scene
            key="LoginForm"
            component={LoginScreen}
            title="Login/SignUp"
            initial={!this.props.loggedIn}
          />
        {/*ForgotPassword RouterScene linkedto the ForgotPassword Component*/}
          <Scene key="passwordReset" component={ForgotPassword} title="Forgot Password" />
        </Scene>
        {/*MainCam route with loggedIn state props*/}
        <Scene
          key="mainCamView"
          rightTitle="Logout"
          onRight={this.logoutHandler.bind(this)}
          type={ActionConst.RESET}
          initial={this.props.loggedIn}
        >
        {/*AttendanceCam route with AttendanceCam component Integration
          with lat/long state props */}
          <Scene
            key="AttendanceCamScreen"
            component={AttendanceCam}
            title="Snap Your attendance here"
            lat={this.props.lat}
            long={this.props.long}
            type={ActionConst.REFRESH}
          />
        {/*Upload Screen route with UploadRequest component Integration */}
          <Scene
            key="initUpload"
            title="Upload Screen"
            component={UploadRequest}
          />
        </Scene>
        {/*Success View with logout handler*/}
        <Scene key="successView">
          <Scene
            key="success"
            rightTitle="Logout"
            component={SuccessView}
            title="Congratulations"
            onRight={this.logoutHandler.bind(this)}
          />
        </Scene>
      </Router>
    );
  }
}
