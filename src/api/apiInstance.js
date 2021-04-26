import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import baseURL from '../config';

export const apiInstance = axios.create({
  baseURL,
});

apiInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
      config.headers['auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
