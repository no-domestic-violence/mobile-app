import * as SecureStore from 'expo-secure-store';
import appApiClient from 'api/';
import { setUserSecureStorage, deleteUserSecureStorage } from '../../helpers';
import types from './authentication.types';

const authenticationError = (error) => {
  return {
    type: types.AUTH_ERROR,
    payload: error.response.data,
  };
};

const authenticationSuccess = (user) => {
  return { type: types.AUTH_SUCCESS, payload: user };
};

const signupLoginSuccess = (data) => {
  return { type: types.LOGIN_SIGNUP_SUCCESS, payload: data };
};

const checkFirstLaunch = (isFirstLaunch) => {
  return { type: types.CHECK_FIRST_LAUNCH, payload: isFirstLaunch };
};

const deleteAccountSuccess = (data) => {
  return { type: types.DELETE_ACCOUNT_SUCCESS, payload: data };
};

const changePasswordSuccess = (data) => {
  return { type: types.CHANGE_PASSWORD_SUCCESS, payload: data };
};

const signup = (dispatch) => async ({ email, password, username }) => {
  try {
    const {
      data,
      data: { token, user },
    } = await appApiClient.signupUser(email, password, username);
    await setUserSecureStorage(token, user.username);
    dispatch(signupLoginSuccess(data));
  } catch (error) {
    dispatch(authenticationError(error));
  }
};

const login = (dispatch) => async ({ email, password }) => {
  try {
    const {
      data,
      data: { token, user },
    } = await appApiClient.loginUser(email, password);
    await setUserSecureStorage(token, user.username);
    dispatch(signupLoginSuccess(data));
  } catch (error) {
    dispatch(authenticationError(error));
  }
};

const authentication = (dispatch) => async () => {
  const token = await SecureStore.getItemAsync('token');
  const username = await SecureStore.getItemAsync('username');
  const user = { token, username };
  if (token) {
    dispatch(authenticationSuccess(user));
  }
};

const removeErrors = (dispatch) => () => {
  dispatch({ type: types.REMOVE_ERRORS });
};

const removeMessages = (dispatch) => () => {
  dispatch({ type: types.REMOVE_MESSAGES });
};

const changePassword = (dispatch) => async ({
  email,
  oldPassword,
  password,
}) => {
  try {
    const { data } = await appApiClient.changePassword(
      email,
      oldPassword,
      password
    );
    removeErrors();
    dispatch(changePasswordSuccess(data));
  } catch (error) {
    dispatch(authenticationError(error));
  }
};

const signout = (dispatch) => async () => {
  await SecureStore.deleteItemAsync('token');
  dispatch({ type: types.LOGOUT });
};

const setAlreadyLaunchedValue = (dispatch) => async () => {
  try {
    const alreadyLaunchedValue = await SecureStore.getItemAsync(
      'alreadyLaunched'
    );
    if (alreadyLaunchedValue === null) {
      SecureStore.setItemAsync('alreadyLaunched', 'true');
      dispatch(checkFirstLaunch(true));
    } else {
      dispatch(checkFirstLaunch(false));
    }
  } catch {
    dispatch(checkFirstLaunch(false));
  }
};

const deleteAccount = (dispatch) => async ({ username }) => {
  try {
    const { data } = await appApiClient.deleteUser(username);
    await deleteUserSecureStorage();
    dispatch(deleteAccountSuccess(data));
    dispatch(checkFirstLaunch(true));
  } catch (error) {
    dispatch(authenticationError(error));
  }
};

export {
  signup,
  login,
  signout,
  removeErrors,
  removeMessages,
  authentication,
  changePassword,
  deleteAccount,
  setAlreadyLaunchedValue,
};
