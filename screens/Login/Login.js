import React, { Component } from 'react';
import { View, Text, StatusBar, Image, ScrollView, ProgressBarAndroid } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-material-ui';
import { MAIN_IMAGE } from '../../images';
import { THEME_COLOR } from '../../constants';

import styles, { BG_COLOR } from './styles';
import { onLogin, defaultState, onChange, onBlur } from '../../helpers';

export default class extends Component {

  static navigationOptions = {
      header: null
  }

  state = defaultState();

  onLogin = onLogin.bind(this);
  onChange = onChange.bind(this);
  onBlur = onBlur.bind(this);

  render() {
    const { email, password, requestSent } = this.state;
    return (
      <>
        <StatusBar
          backgroundColor={BG_COLOR}
          animated={true}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={MAIN_IMAGE}
                style={styles.mainImage}
              />
            </View>

            <Text
              selectable={false}
              style={styles.mainTitle}
            >GoDoggy</Text>
            <View>
              <Text
                selectable={false}
                style={styles.mainSubtitle}
              >CHARITABLE DONATIONS</Text>
            </View>
            <View style={styles.triangle} />
            <TextField
              containerStyle={styles.textInput}
              autoCapitalize='none'
              label='Email'
              keyboardType='email-address'
              onBlur={this.onBlur('email')}
              onChangeText={this.onChange('email')}
              value={email.value}
              error={email.error}
            />
            <TextField
              containerStyle={styles.textInput}
              secureTextEntry
              autoCapitalize='none'
              label='Password'
              onChangeText={this.onChange('password')}
              value={password.value}
              error={password.error}
            />
            <View style={styles.loginContainer}>
              <Button
                disabled={requestSent}
                text='forgot your password ?'
                accessibilityLabel='Forgot your password'
                onPress={() => this.props.navigation.navigate('ForgotPassword')}
              />

              {
                requestSent ?
                  <ProgressBarAndroid
                    style={styles.progressBar}
                    styleAttr='Horizontal'
                    color={THEME_COLOR}
                  />
                  : <Button
                    primary
                    style={{
                      container: styles.loginBtnContainer,
                      text: styles.loginBtnText
                    }}
                    text='login'
                    onPress={this.onLogin}
                  />
              }
              <View style={styles.signupBtnContainer}>
                <Button
                  disabled={requestSent}
                  text="don't have an account? sign up"
                  onPress={() => this.props.navigation.navigate('Signup')}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}