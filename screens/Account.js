import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-material-ui';
import firebase from 'react-native-firebase';

export default class extends Component {

  // static navigationOptions = {
  //   title: 'User Account',
  //   headerStyle: {
  //     backgroundColor: '#f4511e',
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold'
  //   }
  // };
  state = {
    user: {}
  };
  unsubscribe = null;

  componentDidMount() {
    this.unsubscribe = firebase.auth()
                            .onUserChanged(this.onUserChanged);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  onUserChanged = currentUser => {
    if (currentUser) {
      console.log(currentUser.toJSON());
      this.setState({ user: currentUser.toJSON() });
    }
  }

  render() {
    const { navigation } = this.props;
    const { user: { displayName, email, uid } } = this.state;
    return (
      <View style={styles.container}>
        <View style={{
          width: '90%'
        }}>
          <Text style={{ fontSize: 15 }}>Hello, <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{displayName}</Text></Text>
          <Text style={{ fontSize: 15 }}>Your email is <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{email}</Text></Text>
          <Text style={{ fontSize: 15 }}>Your UID is <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{uid}</Text></Text>
          <Text style={{
            fontSize: 40,
            color: 'red'
          }}>Dear Sister, here we may list all dogs registered in orphanage</Text>
        </View>
        <Button
          text='Logout'
          onPress={() => firebase.auth()
                                  .signOut()
                                  .then(() => navigation.navigate('Login'))
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});