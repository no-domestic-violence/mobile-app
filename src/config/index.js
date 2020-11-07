// eslint-disable-next-line
let baseURL;

if (__DEV__) {
  baseURL = 'http://localhost:3001';
} else {
  baseURL = 'https://pool-api-mobile.herokuapp.com';
}

export default baseURL;
