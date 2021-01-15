import { Api } from '../../configs';
import BaseApi from './BaseApi';
/* prettier-ignore */

export default class ApiService {

  static login = (data) => BaseApi().post(Api.URL_LOGIN, data);


  static data = async (data) => BaseApi().post(Api.URL_DATA, data);

}