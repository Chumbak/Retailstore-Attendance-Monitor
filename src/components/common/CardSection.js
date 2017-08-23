/**
 * @Author: Harsha Attray <harsha>
 * @Date:   2017-08-17T18:15:36+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: CardSection.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-22T15:29:57+05:30
 * @License: Apache License v2.0
 */

import React from 'react';
import { View } from 'react-native';

/*Card section envelopes induvidual card components and
 is a part of the common reusable UI-components*/
const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

/*Styling for  CardSection Component*/

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
