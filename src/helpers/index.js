import * as SecureStore from 'expo-secure-store';

const setUserSecureStorage = async (token, username, refreshToken) => {
  await SecureStore.setItemAsync('token', token);
  await SecureStore.setItemAsync('username', username);
  await SecureStore.setItemAsync('refreshToken', refreshToken);
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

const getRefreshTokenSecureStorage = async () => {
  return SecureStore.getItemAsync('refreshToken');
};

const createReducer = (handlers) => {
  return (state, action) => {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
  };
};
const updateState = (stateKey) => {
  return (state, action) => {
    return {
      ...state,
      [stateKey]: action.payload,
    };
  };
};

// case reducer
const handleErrorMessage = updateState('errorMessage');

export {
  setUserSecureStorage,
  deleteUserSecureStorage,
  getUserSecureStorage,
  getTokenSecureStorage,
  getRefreshTokenSecureStorage,
  createReducer,
  updateState,
  handleErrorMessage,
};
