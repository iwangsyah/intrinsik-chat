import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import { StorageKey as key } from '../configs';

export default class Astorage {
  static getAuthToken = () => AsyncStorage.getItem(key.AUTHTOKEN);
  static setAuthToken = params => AsyncStorage.setItem(key.AUTHTOKEN, params);
  static removeAuthToken = () => AsyncStorage.removeItem(key.AUTHTOKEN);

  // Token After Register
  static getToken = () => AsyncStorage.getItem(key.TOKEN);
  static setToken = params => AsyncStorage.setItem(key.TOKEN, params);
}
