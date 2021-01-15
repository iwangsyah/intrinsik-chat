import Axios from 'axios';
import _ from 'lodash';
import { Api } from '../../configs';
import { Astorage } from '../../util';

const defaultHeader = async () => {
  const authToken = await Astorage.getAuthToken();
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  };
};

const BaseApi = async (isFormData) => {
  const header = await defaultHeader();

  const instance = Axios.create({
    baseURL: Api.BASE_URL,
    timeout: 5000,
    headers: header
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      const { status } = error.response;
      console.log('status: ', status);
      return Promise.reject(error);
    }
  );

  return instance;
};

export default BaseApi;
