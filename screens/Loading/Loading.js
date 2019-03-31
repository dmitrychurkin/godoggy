import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { THEME_COLOR } from '../../constants';

import styles from './styles';


export default class Loading extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={50} color={THEME_COLOR} />
      </View>
    );
  }
}
