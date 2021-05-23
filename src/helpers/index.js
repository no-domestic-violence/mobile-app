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

const createReducer = (handlers) => {
  return function reducer(state, action) {
    const handler = handlers[action.type];
    if (handler) {
      return handler(state, action);
    }
      return state;
    
  };
}
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
  createReducer,
  updateState,
  handleErrorMessage
};
