import React, { Component } from 'react';
import { Animated, View, Text, Easing } from 'react-native';
import { withNavigation } from 'react-navigation';
import { IconToggle } from 'react-native-material-ui';
import { ICON_SIZE } from '../../constants';

import styles from './styles';


class AuthLayout extends Component {

  static defaultProps = {
    rootContainerStyles: {
      alignItems: 'center'
    },
    headerTextStyles: {
      color: '#000',
      fontSize: 20,
      fontWeight: "bold",
    }
  };

  opacity = new Animated.Value(0);
  leave = () => this.props.navigation.goBack();

  componentDidMount() {
    Animated.timing(this.opacity, { 
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true 
    }).start();
  }

  render() {
    const { headerTitle, headerTextStyles, rootContainerStyles, children } = this.props;
    
    return (
      <Animated.ScrollView
        contentContainerStyle={[styles.rootContainerStyle, rootContainerStyles]}
        style={[{ opacity: this.opacity }, styles.rootStyle ]}
      >
        <View style={styles.header}>
          <IconToggle
            onPress={this.leave}
            size={ICON_SIZE}
            name="close" />
          <Text
            style={[styles.headerText, headerTextStyles]}
            selectable={false}
          >{headerTitle}</Text>
        </View>
        {children}
      </Animated.ScrollView>
    );
  }
}

export default withNavigation(AuthLayout);