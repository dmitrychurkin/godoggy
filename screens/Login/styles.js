import { StyleSheet } from 'react-native';
import { THEME_COLOR } from "../../constants";

const WHITE = '#fff';
export const BG_COLOR = 'rgba(9, 178, 255, 0.35)';
export default StyleSheet.create({
  scrollView: {
    backgroundColor: BG_COLOR
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50
  },
  imageContainer: {
    borderRadius: 150,
    backgroundColor: WHITE,
    width: 130,
    height: 130,
    overflow: 'hidden'
  },
  mainImage: {
    maxWidth: 300,
    maxHeight: 300,
    position: 'relative',
    bottom: 30,
    right: 25
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: WHITE
  },
  textInput: {
    width: '90%',
    backgroundColor: WHITE,
    paddingHorizontal: 20
  },
  mainTitle: {
    fontWeight: 'bold',
    fontSize: 50,
    margin: 10,
    color: WHITE
  },
  mainSubtitle: {
    color: WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -10
  },
  loginContainer: {
    backgroundColor: WHITE,
    width: '90%',
    padding: 20
  },
  loginBtnContainer: {
    backgroundColor: THEME_COLOR,
    marginTop: 10
  },
  loginBtnText: {
    color: WHITE
  },
  signupBtnContainer: {
    marginTop: 10,
    width: '100%'
  },
  progressBar: {
    width: '100%'
  }
});