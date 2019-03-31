/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import firebase from 'react-native-firebase';
import { createAppContainer, createSwitchNavigator, createStackNavigator, NavigationActions } from 'react-navigation';
import LoadingScreen from './screens/Loading/Loading';
import AccountScreen from './screens/Account';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import ForgotPasswordScreen from './screens/ForgotPassword';
import { APP_NAME, THEME_COLOR } from './constants';
/** development usage only */
import { clearStorage } from './helpers';


const defaultNavigationOptions = {
  title: APP_NAME,
  headerStyle: {
    backgroundColor: THEME_COLOR
  },
  headerTintColor: '#fff'
};

const MainNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  Auth: createStackNavigator({
    Login: LoginScreen,
    Signup: SignupScreen,
    ForgotPassword: ForgotPasswordScreen
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }),
  Main: createStackNavigator({
    Account: AccountScreen
  }, { defaultNavigationOptions })
}, {
  initialRouteName: 'Loading'
});

const AppContainer = createAppContainer(MainNavigator);

export default class extends React.Component {
  authSubscription = null;
  navigator = null;

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      // setTimeout(() => this.props.navigation.navigate(user ? 'Account' : 'Login'), 0);
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: user ? 'Account' : 'Login' })
      );
    });

    /** development usage only */
    clearStorage()
        .then((res) => console.log('Entire storage been cleared', res))
        .catch(err => console.log('Error occured while clearing storage ', err))
  }

  componentWillUnmount() {
    if (typeof this.authSubscription === 'function') {
      this.authSubscription();
    }
  }

  render() {
    return <AppContainer 
              ref={nav => {
                this.navigator = nav;
              }} 
            />;
  }
}
