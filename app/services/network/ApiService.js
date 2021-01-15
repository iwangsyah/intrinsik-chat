import { Api } from '../../configs';
import BaseApi from './BaseApi';
import BaseApiNone from './BaseApiNone';
/* prettier-ignore */

export default class ApiService {

  static login = async (data) => {
    const instance = await BaseApiNone();
    return instance.post(Api.URL_LOGIN, data);
  }

  static data = async (data) => BaseApi().post(Api.URL_DATA, data);

}
