// eslint-disable-next-line
let baseURL;

if (__DEV__) {
  baseURL = 'http://localhost:80/api';
} else {
  baseURL = 'https://pool-api-mobile.herokuapp.com/api';
}

export default baseURL;
