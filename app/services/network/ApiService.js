import { Api } from '../../configs';
import BaseApi from './BaseApi';
/* prettier-ignore */

export default class ApiService {

  static login = (data) => BaseApi().post(Api.URL_LOGIN, data);


  static contacts = (data) => BaseApi().post(Api.URL_CONTACTS, data);

  static chatRooms = (data) => BaseApi().post(Api.URL_CHAT_ROOMS, data);

  static chatList = (data) => BaseApi().get(`${Api.URL_CHAT_LIST}/${data.id}`);

  static sendChat = (data) => BaseApi().post(Api.URL_CHAT_LIST, data);

}
