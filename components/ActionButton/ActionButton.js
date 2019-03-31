import React from 'react';
import { ProgressBarAndroid } from 'react-native';
import { Button } from 'react-native-material-ui';
import { THEME_COLOR } from "../../constants";

const progressBarDefaultProps = {
  style: { width: '100%' },
  styleAttr: 'Horizontal',
  color: THEME_COLOR
};

const buttonDefaultProps = {
  primary: true,
  style: {
    container: {
      backgroundColor: THEME_COLOR,
      width: '100%'
    },
    text: {
      color: '#fff'
    }
  }
};

const ActionButton = ({ buttonActivated= false, progressBarProps= {}, buttonProps= {} }) => {
  progressBarProps = Object.assign(progressBarDefaultProps, progressBarProps);
  buttonProps = Object.assign(buttonDefaultProps, buttonProps);

  return (
    buttonActivated ?
      <ProgressBarAndroid
        //style={{ width: '100%' }}
        //styleAttr="Horizontal"
        //color={THEME_COLOR}
        {...progressBarProps}
      />
      : <Button
        //primary
        // style={{
        //   container: styles.loginBtnContainer,
        //   text: styles.loginBtnText
        // }}
        // text="Login"
        // onPress={() => this.onLogin()}
        {...buttonProps}
      />
  );
};

export default ActionButton;