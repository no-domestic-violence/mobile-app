/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getTokenSecureStorage } from 'helpers';
import baseURL from '../config';

export const apiInstance = axios.create({
  baseURL,
});

export const authInterceptor = () => {
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
};

authInterceptor();
