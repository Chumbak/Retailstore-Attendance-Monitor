/**
 * @Author: Harsha Attray <harsha>
 * @Date:   2017-08-17T18:15:36+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: Loading.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-22T15:30:44+05:30
 * @License: Apache License v2.0
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
