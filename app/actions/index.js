import _ from 'lodash';
import { ActionTypes as types } from '../configs';
import { Astorage, NavigationService } from '../util';

export default class Actions {
  static setUser(user) {
    return {
      type: types.SET_USER,
      user,
    };
  }

  static logout() {
    Astorage.removeUser();
    NavigationService.navigate(Navigation.AUTH);
  }
}
