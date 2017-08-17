/**
 * @Author: Harsha Attray <HarshaAttray>
 * @Date:   2017-06-05T12:45:11+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: index.ios.js
 * @Last modified by:   HarshaAttray
 * @Last modified time: 2017-08-16T17:28:21+05:30
 * @Copyright: Chumbak design Pvt ltd
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
