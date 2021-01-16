import { Api } from '../../configs';
import BaseApi from './BaseApi';
/* prettier-ignore */

export default class ApiService {

  static login = (data) => BaseApi().post(Api.URL_LOGIN, data);

  static register = (data) => BaseApi().post(Api.URL_REGISTER, data);

  static contacts = (data) => BaseApi().post(Api.URL_CONTACTS, data);

  static chatRooms = (data) => BaseApi().get(`${Api.URL_CHAT}/rooms/${data.id}`);

  static chatList = (data) => BaseApi().get(`${Api.URL_CHAT}/list/${data.id}`);

  static sendChat = (data) => BaseApi().post(`${Api.URL_CHAT}/send`, data);

  static updateLastChat = (data) => BaseApi().post(`${Api.URL_CHAT}/last`, data);

  static sendReadChat = (data) => BaseApi().post(`${Api.URL_CHAT}/read`, data);

  static createRoom = (data) => BaseApi().post(`${Api.URL_CHAT}/rooms/create`, data);

  static getRoom = (data) => BaseApi().get(`${Api.URL_CHAT}/rooms/${data.id_user_1}/${data.id_user_2}`);

}
