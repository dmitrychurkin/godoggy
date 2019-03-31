import { StyleSheet } from "react-native";
import { ICON_SIZE } from "../../constants";

export default StyleSheet.create({
  rootContainerStyle: {
    alignItems: 'center'
  },
  rootStyle: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    transform: [
      { translateX: -ICON_SIZE }
    ]
  },
});