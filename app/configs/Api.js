const BASE_URL = __DEV__ ? 'http://localhost:3000' : 'https://obscure-temple-13039.herokuapp.com';

export default (Api = {
  URL_LOGIN: `${BASE_URL}/login`,
  URL_REGISTER: `${BASE_URL}/register`,
  URL_CONTACTS: `${BASE_URL}/contacts`,
  URL_CHAT: `${BASE_URL}/chat`
});
