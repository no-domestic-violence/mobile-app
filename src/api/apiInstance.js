/* eslint-disable no-param-reassign */
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getTokenSecureStorage, getRefreshTokenSecureStorage } from 'helpers';
import baseURL from '../config';

const apiInstance = axios.create({
  baseURL,
});

const handleTokenRefresh = async (originalRequest) => {
  const refreshToken = await getRefreshTokenSecureStorage();
  await SecureStore.setItemAsync('token', refreshToken);

  const res = await apiInstance.post('/refreshToken');
  if (res.status === 201) {
    const token = res.data.token;

    await SecureStore.setItemAsync('token', token);
    originalRequest.headers.authorization = `Bearer ${token}`;
    return axios(originalRequest);
  }
};

apiInstance.interceptors.request.use(
  async (config) => {
    const token = await getTokenSecureStorage();
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.retry) {
      return handleTokenRefresh(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
