import { StyleSheet } from "react-native";
import { THEME_COLOR, ICON_SIZE } from "../../constants";

export default StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  positionContainer: {
    position: 'relative'
  },
  imageContainer: {
    borderRadius: 150,
    width: 130,
    height: 130,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: THEME_COLOR
  },
  bottomSheetToggle: {
    position: 'absolute',
    right: -5,
    bottom: 90
  },
  image: {
    maxWidth: 130,
    maxHeight: 130,
  },
  bottomSheetToggleWrapper: {
    position: 'absolute',
    left: 25,
    top: 25,
    backgroundColor: '#fff',
    width: ICON_SIZE - 20,
    height: ICON_SIZE - 20,
    borderRadius: 150
  }
});