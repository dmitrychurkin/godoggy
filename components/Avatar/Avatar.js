import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { IconToggle } from 'react-native-material-ui';
import RNBottomActionSheet from 'react-native-bottom-action-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { setItem, getItem } from '../../helpers';
import { ICON_SIZE, THEME_COLOR } from '../../constants';

const defaultConfigCrop = {
  includeBase64: true,
  includeExif: true,
  width: 800,
  height: 600,
  cropping: true,
  cropperActiveWidgetColor: THEME_COLOR,
  cropperStatusBarColor: THEME_COLOR,
  cropperToolbarColor: THEME_COLOR,
  freeStyleCropEnabled: true,
  cropperCircleOverlay: true,
  mediaType: 'photo'
};


export default class extends Component {

  static defaultProps = {
    configCrop: defaultConfigCrop
  };

  state = {
    width: 'auto',
    height: 'auto',
    uri: null
  };


  async componentDidMount() {
    try {
      const imageData = await getItem();
      if (imageData !== null) {
        this.setState(imageData);
      }
    }catch(err) {}
  }

  onBottomSheetPress = async index => {
    const { configCrop } = this.props;
    try {
      const { mime, data, width, height } = await ImagePicker[!index ? 'openPicker' : 'openCamera'](configCrop);
      const avatarImage = { uri: `data:${mime};base64,` + data, width, height };
      this.setState(avatarImage);
      await Promise.all([
        ImagePicker.clean(),
        setItem(avatarImage)
      ]);
    } catch (err) {}
  }

  render() {

    const { uri, width, height } = this.state;

    return (
      <View style={styles.avatar}>
        <View style={styles.positionContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={[styles.image, (uri ? { width, height } : {})]}
              resizeMode='cover'
              source={uri ? { uri } : null}
            />
          </View>
          <View style={styles.bottomSheetToggle}>
            <View style={styles.bottomSheetToggleWrapper} />
            <IconToggle
              onPress={() => {
                RNBottomActionSheet.SheetView.Show({
                  items: [
                    { title: 'Select from gallery', icon: (<Icon family='MaterialIcons' name="photo-library" color="grey" size={30} />) },
                    { title: 'Use Camera', icon: (<Icon family='MaterialIcons' name="linked-camera" color="grey" size={30} />) },
                  ],
                  theme: 'light',
                  onSelection: this.onBottomSheetPress
                });
              }}
              color={THEME_COLOR}
              size={ICON_SIZE - 10}
              name="add-circle" />
          </View>
        </View>
      </View>
    );
  }
}
