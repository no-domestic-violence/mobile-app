import * as SecureStore from 'expo-secure-store';
import appApiClient from 'api/';
import { setUserSecureStorage, deleteUserSecureStorage } from '../../helpers';
import * as types from './authentication.types';

const signup = (dispatch) => async ({ email, password, username }) => {
  try {
    const {
      data,
      data: { token, user },
    } = await appApiClient.signupUser(email, password, username);
    await setUserSecureStorage(token, user.username);
    dispatch({ type: types.SIGNUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.SIGNUP_ERROR,
      payload: "Something went wrong'( Try again",
    });
  }
};

const login = (dispatch) => async ({ email, password }) => {
  try {
    const {
      data,
      data: { token, user },
    } = await appApiClient.loginUser(email, password);

    await setUserSecureStorage(token, user.username);

    dispatch({ type: types.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.LOGIN_ERROR,
      payload: 'Are you sure about password and email?',
    });
  }
};

const authentication = (dispatch) => async () => {
  const token = await SecureStore.getItemAsync('token');
  const username = await SecureStore.getItemAsync('username');
  const user = { token, username };
  if (token) {
    dispatch({ type: types.AUTH_SUCCESS, payload: user });
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
    dispatch({ type: types.CHANGE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.CHANGE_PASSWORD_ERROR,
      payload: error.response.data.message,
    });
  }
};

const signout = (dispatch) => async () => {
  await SecureStore.deleteItemAsync('token');
  dispatch({ type: types.LOGOUT });
};

const checkFirstLaunch = (dispatch) => async () => {
  try {
    const alreadyLaunchedValue = await SecureStore.getItemAsync(
      'alreadyLaunched'
    );
    if (alreadyLaunchedValue === null) {
      SecureStore.setItemAsync('alreadyLaunched', 'true');
      dispatch({ type: types.CHECK_FIRST_LAUNCH, payload: true });
    } else {
      dispatch({ type: types.CHECK_FIRST_LAUNCH, payload: false });
    }
  } catch {
    dispatch({ type: types.CHECK_FIRST_LAUNCH, payload: false });
  }
};

const deleteAccount = (dispatch) => async ({ username }) => {
  try {
    const { data } = await appApiClient.deleteUser(username);
    await deleteUserSecureStorage();
    dispatch({ type: types.DELETE_ACCOUNT_SUCCESS, payload: data });
    dispatch({ type: types.CHECK_FIRST_LAUNCH, payload: true });
  } catch (error) {
    dispatch({
      type: types.DELETE_ACCOUNT_ERROR,
      payload: error.response.data.message,
    });
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
  checkFirstLaunch,
};
