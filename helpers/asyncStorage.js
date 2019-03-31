import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import { APP_NAME } from '../constants';

const authState = () => {
  const { currentUser } = firebase.auth();
  return currentUser || {};
};

export const getStorageToken = () => {
  const { uid } = authState();
  return uid ? `${APP_NAME}_profileImage_${uid}` : `${APP_NAME}_profileImage`;
};

export const setItem = (data, dbToken) => {
  const DB_TOKEN = dbToken || getStorageToken();
  return data !== null 
          ? AsyncStorage.setItem(DB_TOKEN, JSON.stringify(data))
          : Promise.resolve(data);
};

export const getItem = async dbToken => {
  const DB_TOKEN = dbToken || getStorageToken();
  const data = await AsyncStorage.getItem(DB_TOKEN);
  if (data !== null) {
    return JSON.parse(data);
  }
  return data;
};

export const removeItem = dbKey => AsyncStorage.removeItem(dbKey);

/** development only usage */
export const clearStorage = () => AsyncStorage.clear();