/**
 * @Author: Harsha Attray <HarshaAttray>
 * @Date:   2017-04-26T10:30:42+05:30
 * @Project: Retailstore-Attendance-Monitor
 * @Filename: Card.js
 * @Last modified by:   harsha
 * @Last modified time: 2017-08-17T11:15:30+05:30
 * @Copyright: Chumbak design Pvt ltd
 */

import React from 'react';
import { View } from 'react-native';
/*Card component is a part of the common reusable UI-components*/
const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

/*Styling for  Card Component*/
const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

export { Card };
