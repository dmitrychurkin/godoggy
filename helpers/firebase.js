import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import { openInbox } from 'react-native-email-link'
import { getItem, setItem, removeItem } from './asyncStorage';
import { APP_NAME } from '../constants';

async function updateProfile(fullName = null, { user }) {
  const DB_KEY = `${APP_NAME}_profileImage`;
  const profileImage = await getItem(DB_KEY);
  const userData = {
    displayName: fullName,
    photoUrl: profileImage !== null ? profileImage.uri : null
  };
  return Promise.all([
    setItem(profileImage),
    profileImage !== null ? removeItem(DB_KEY) : Promise.resolve(null),
    user.updateProfile(userData)
  ]);
}

export function onSignUp() {
  const { hasError, email, password, requestSent, agree, fullName } = this.state;
  if (!agree || hasError || !email.value.trim() || !password.value.trim() || requestSent) {
    return;
  }
  this.setState({ requestSent: true });
  firebase.auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(userCredential => {
      console.log('userCredential => ', userCredential);
      // return userCredential.user.updateProfile({ 
      //   displayName: fullName.value.trim(),
      //   photoUrl: uri
      // });
      return updateProfile(fullName.value.trim(), userCredential);
    })
    .catch(error => {
      const { message, code } = error;
      if (code.includes('auth/')) {
        Alert.alert(
          'Error occured while signing up',
          message,
          [
            { 
              text: 'Cancel', style: 'cancel', onPress: () => {
                this.setState({ requestSent: false });
              }
            },
            { 
              text: 'Try again', onPress: () => {
                this.setState({ requestSent: false });
                this.onSignUp();
              }
            }
          ],
          { cancelable: false }
        );
      }else {
        this.setState({ requestSent: false });
      }
    });
}

export function onLogin() {
  const { hasError, email, password, requestSent } = this.state;
  if (hasError || !email.value.trim() || !password.value.trim() || requestSent) {
    return;
  }
  this.setState({ requestSent: true });
  firebase.auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .catch(error => {
      const { message, code } = error;
      if (code.includes('auth/')) {
        Alert.alert(
          'Error occured while logging in',
          message,
          [
            { text: 'Cancel', style: 'cancel', onPress: () => {
                this.setState({ requestSent: false });
              }
            },
            { text: 'Try again', onPress: () => {
                this.setState({ requestSent: false });
                this.onLogin();
              } 
            },
          ],
          { cancelable: false }
        );
      }else {
        this.setState({ requestSent: false });
      }
    });
}

export function onPasswordReset() {
  const { hasError, email, requestSent } = this.state;
  if (hasError || !email.value.trim() || requestSent) {
    return;
  }
  const showAlert = (title, message, isSuccess) => {
    Alert.alert(
      title,
      message,
      [
        ...(isSuccess 
        ? [{
          text: 'ok', onPress: async () => {
            await openInbox();
            this.props.navigation.goBack();
          }
        }]
        : [{ text: 'cancel', style: 'cancel', onPress: () => this.setState({ requestSent: false }) },
          { text: 'try again', onPress: () => {
            this.setState({ requestSent: false });
            this.onPasswordReset();
          } 
        }])
      ],
      { cancelable: false }
    );
  };
  this.setState({ requestSent: true });
  firebase.auth()
    .sendPasswordResetEmail(email.value)
    .then(() => showAlert(
      'Password reset link been sent',
      'Check your email for further instructions',
      true
      )
    )
    .catch(error => {
      const { message, code } = error;
      if (code.includes('auth/')) {
        showAlert(
          'Password reset flow error',
          message,
          false
        );
      }else {
        this.setState({ requestSent: false });
      }
    });
}
