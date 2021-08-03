import apiInstance from './apiInstance';

const getHotlinesData = (search) => {
  return apiInstance.get('/hotlines', {
    params: { searchTerm: search },
  });
};

const getSheltersData = () => {
  return apiInstance.get('/shelters');
};

const getArticlesData = () => {
  return apiInstance.get('/articles');
};

const getArticleById = (id) => {
  return apiInstance.get(`/articles/${id}`);
};

const loginUser = (email, password) => {
  return apiInstance.post('/login', { email, password });
};

const logoutUser = (refreshToken) => {
  return apiInstance.post('/logout', {refreshToken})
}

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

const getSosContacts = (username) => {
  return apiInstance.get(`/users/${username}/contacts`);
};

const deleteSosContact = (username, id) => {
  return apiInstance.delete(`/users/${username}/contacts/${id}`);
};
const addSosContact = (username, data) => {
  return apiInstance.patch(`/users/${username}/contacts/`, data);
};

const editSosContact = (username, data, id) => {
  return apiInstance.patch(`/users/${username}/contacts/${id}`, data);
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
  getArticlesData,
  getArticleById,
  logoutUser
};

export default appApiClient;
