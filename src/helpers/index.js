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
export { setUserSecureStorage, deleteUserSecureStorage };
