import axios from 'axios';
import baseURL from '../config';

export const apiInstance = axios.create({
  baseURL,
});

const getHotlinesData = (search) => {
  return apiInstance.get('/hotlines', {
    params: { searchTerm: search },
  });
};

const loginUser = (email, password) => {
  return apiInstance.post('/login', { email, password });
};

const signupUser = (email, password, username) => {
  return apiInstance.post('/signup', { email, password, username });
};

const deleteUser = (username) => {
  return apiInstance.delete('/deleteUser', {
    params: { username },
  });
};

const changePassword = (email, oldPassword, password) => {
  return apiInstance.post('/changePassword', {
    email,
    oldPassword,
    password,
  });
};

const appApiClient = {
  getHotlinesData,
  loginUser,
  signupUser,
  deleteUser,
  changePassword,
};

export default appApiClient;
