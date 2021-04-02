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

const getSheltersData = () => {
  return apiInstance.get('/shelters');
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

const getSosContacts = (username, token) => {
  return apiInstance.get(`/users/${username}/contacts`, {
    headers: { 'auth-token': token },
  });
};

const deleteSosContact = (username, id, token) => {
  return apiInstance.delete(`/users/${username}/contacts`, {
    params: { id },
    headers: { 'auth-token': token },
  });
};
const addSosContact = (username, data, token) => {
  return apiInstance.patch(`/users/${username}/contacts/`, data, {
    headers: { 'auth-token': token },
  });
};

const editSosContact = (username, data, id, token) => {
  return apiInstance.patch(`/users/${username}/contacts/${id}`, data, {
    headers: { 'auth-token': token },
  });
};

const appApiClient = {
  getHotlinesData,
  loginUser,
  signupUser,
  deleteUser,
  changePassword,
  getSosContacts,
  deleteSosContact,
  addSosContact,
  editSosContact,
  getSheltersData,
};

export default appApiClient;
