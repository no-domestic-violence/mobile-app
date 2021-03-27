import * as SecureStore from 'expo-secure-store';

const setUserSecureStorage = async (token, username) => {
  await SecureStore.setItemAsync('token', token);
  await SecureStore.setItemAsync('username', username);
};

export { setUserSecureStorage };
