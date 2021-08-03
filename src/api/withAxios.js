import { useContext, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from 'state/';
import { getTokenSecureStorage, getRefreshTokenSecureStorage } from 'helpers';
import * as SecureStore from 'expo-secure-store';
import apiInstance from './apiInstance';
import appApiClient from './index';

const WithAxios = ({ children }) => {
  const { signout } = useContext(AuthContext);

  useMemo(() => {
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
      // return successful response
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = await getRefreshTokenSecureStorage();
        // logout user if refresh token did not work (expired)
        if (originalRequest.url === '/refreshToken') {
          signout();
          return appApiClient.logoutUser(refreshToken);
        }
        // try request with new access token when access token expired
        if (
          refreshToken &&
          error.response.status === 401 &&
          error.response.data.message === 'Invalid token' &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          return apiInstance
            .post('/refreshToken', { refreshToken: refreshToken })
            .then((res) => {
              if (res.status === 201) {
                const token = res.data.accessToken;
                SecureStore.setItemAsync('token', token);
                originalRequest.headers.authorization = `Bearer ${token}`;
                return axios(originalRequest);
              }
            });
        }
        return Promise.reject(error);
      }
    );
  }, [signout]);
  return children;
};

export default WithAxios;
