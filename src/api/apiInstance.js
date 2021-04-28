/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getTokenSecureStorage } from 'helpers';
import baseURL from '../config';

const apiInstance = axios.create({
  baseURL,
});

apiInstance.interceptors.request.use(
  async (config) => {
    const token = await getTokenSecureStorage();
    if (token) {
      config.headers['auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
