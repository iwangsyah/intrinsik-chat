import { Api } from '../../configs';
import BaseApi from './BaseApi';
/* prettier-ignore */

export default class ApiService {

  static login = (data) => BaseApi().post(Api.URL_LOGIN, data);


  static contacts = (data) => {
    return BaseApi().post(Api.URL_CONTACTS, data);
  }

  static chatRooms = (data) => {
    return BaseApi().post(Api.URL_CHAT_ROOMS, data);
  }

}
