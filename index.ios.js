/**
 * @Author: Harsha Attray <harsha>
 * @Date:   2017-08-17T18:15:34+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: index.ios.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-22T15:30:59+05:30
 * @License: Apache License v2.0
 */
/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { AppRegistry } from 'react-native';


import App from './src/App';

/*Initial app component unified into App.js instead of having
separate ios and android trigger points*/

AppRegistry.registerComponent('RetailAttendanceMonitor', () => App);
