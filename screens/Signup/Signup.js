import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Checkbox, } from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import { defaultState, onChange, onBlur, onSignUp } from '../../helpers';
import { Avatar, AuthLayout, ActionButton } from '../../components';
import { THEME_COLOR } from '../../constants';

import styles from './styles';


export default class extends Component {

  state = defaultState();

  leave = () => this.props.navigation.navigate('Login');
  onChange = onChange.bind(this);
  onBlur = onBlur.bind(this);
  onSignUp = onSignUp.bind(this);

  render() {
    const { fullName, email, password, confirmPassword, requestSent } = this.state;

    return (
      <AuthLayout headerTitle='Sign up'>
        <Avatar />
        <TextField
          containerStyle={styles.textInput}
          label='Full name'
          autoCapitalize='none'
          onChangeText={this.onChange('fullName')}
          onBlur={this.onBlur('fullName')}
          value={fullName.value}
          error={fullName.error}
        />
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
        <TextField
          containerStyle={styles.textInput}
          secureTextEntry
          autoCapitalize='none'
          label='Password'
          onChangeText={this.onChange('password')}
          onBlur={this.onBlur('password')}
          value={password.value}
          error={password.error}
        />
        <TextField
          containerStyle={styles.textInput}
          secureTextEntry
          autoCapitalize='none'
          label='Confirm password'
          onChangeText={this.onChange('confirmPassword')}
          onBlur={this.onBlur('confirmPassword')}
          value={confirmPassword.value}
          error={confirmPassword.error}
        />
        <View style={[styles.marginTop, styles.checkbox]}>
          <Checkbox
            label="I agree with terms & conditions"
            checked={this.state.agree}
            value='agree'
            onCheck={() => {
              this.setState(state => ({
                agree: !state.agree
              }))
            }}
          />
        </View>
        <ActionButton
          buttonActivated={requestSent}
          progressBarProps={{
            style: styles.btnWidth
          }}
          buttonProps={{
            style: {
              container: [
                styles.loginBtnContainer, 
                styles.marginTop, 
                styles.btnWidth
              ],
              text: styles.loginBtnText
            },
            text: 'sign up',
            onPress: this.onSignUp
          }}
        />
        <Button
          style={{
            container: [styles.marginTop, styles.btnWidth]
          }}
          disabled={requestSent}
          text="already have an account? login"
          onPress={this.leave}
        />
      </AuthLayout>
    );
  }
}
