import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { AuthLayout, ActionButton } from '../../components';
import { defaultState, onChange, onBlur, onPasswordReset } from '../../helpers';

import styles from './styles';
import { THEME_COLOR } from '../../constants';


export default class extends Component {

  state = defaultState();

  onChange = onChange.bind(this);
  onBlur = onBlur.bind(this);
  onPasswordReset = onPasswordReset.bind(this);

  render() {
    const { email, requestSent } = this.state;

    return (
      <AuthLayout headerTitle='Reset password'>
        <View style={styles.mainContainer}>
          <Text style={styles.subtitleText}>Please enter your email address, we will send you further instructions</Text>
        </View>
        <TextField
          containerStyle={styles.textInput}
          autoCapitalize='none'
          label='Email'
          keyboardType='email-address'
          onChangeText={this.onChange('email')}
          onBlur={this.onBlur('email')}
          value={email.value}
          error={email.error}
        />
        <ActionButton
          buttonActivated={requestSent}
          progressBarProps={{
            style: [styles.mainContainer, styles.marginTop]
          }}
          buttonProps={{
            style: {
              container: [
                styles.textInput, 
                styles.mainContainer, 
                styles.marginTop,
                { backgroundColor: THEME_COLOR }
              ],
              text: {
                color: '#fff'
              }
            },
            text: 'send reset link',
            onPress: this.onPasswordReset
          }}
        />
      </AuthLayout>
    );
  }
}