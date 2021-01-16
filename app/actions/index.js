import _ from 'lodash';
import { Astorage, NavigationService } from '../util';

export default class Actions {
  static logout() {
    Astorage.removeUser();
    NavigationService.navigate(Navigation.AUTH);
  }
}
