import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { StorageKey as key } from '../configs';

export default class Astorage {
  static getUser = () => AsyncStorage.getItem(key.USER);
  static setUser = params => AsyncStorage.setItem(key.USER, JSON.stringify(params));
}
