import * as SecureStore from 'expo-secure-store';

const setUserSecureStorage = async (token, username) => {
  await SecureStore.setItemAsync('token', token);
  await SecureStore.setItemAsync('username', username);
};

const deleteUserSecureStorage = async () => {
  await SecureStore.deleteItemAsync('token');
  await SecureStore.deleteItemAsync('username');
  await SecureStore.deleteItemAsync('alreadyLaunched');
};

const getUserSecureStorage = async () => {
  const username = await SecureStore.getItemAsync('username');
  const token = await SecureStore.getItemAsync('token');
  return { username, token };
};

const getTokenSecureStorage = async () => {
  return SecureStore.getItemAsync('token');
};

export {
  setUserSecureStorage,
  deleteUserSecureStorage,
  getUserSecureStorage,
  getTokenSecureStorage,
};
