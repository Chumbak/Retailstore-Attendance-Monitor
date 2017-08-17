/**
 * @Author: Harsha Attray <harsha>
 * @Date:   2017-04-27T17:51:41+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: Loading.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-17T11:16:42+05:30
 * @Copyright: Chumbak design Pvt ltd
 */

import React from 'react';
import { View, ActivityIndicator } from 'react-native';

/*Custom native loader component utilising the Activity indicatr*/
const Loader = ({ size }) => {
  return (
    <View style={styles.loadingStyles}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = {
  loadingStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export { Loader };
