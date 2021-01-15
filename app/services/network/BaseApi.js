import Axios from 'axios';
import _ from 'lodash';
import { Api } from '../../configs';

const interceptorsRequest = (instance, hotel) =>
  instance.interceptors.request.use(
    async config => {
      const header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      config.headers = {
        ...config.headers,
        ...header
      };

      return config;
    },
    // Do something before request is sent
    error => Promise.reject(error)
  );

const interceptorsResponse = instance =>
  instance.interceptors.response.use(
    response => response,
    error => {
      if (_.isEmpty(error.response)) {
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

export default (BaseApi = () => {
  const source = Axios.CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, 10000);

  const instance = Axios.create({
    baseURL: Api.BASE_URL,
    timeout: 10000,
    cancelToken: source.token
  });

  interceptorsRequest(instance);
  interceptorsResponse(instance);

  return instance;
});
