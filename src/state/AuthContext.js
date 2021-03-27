import * as SecureStore from 'expo-secure-store';
import appApiClient from 'api/';
import createAppContext from './CreateAppContext';
import { setUserSecureStorage } from '../helpers';
const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP_ERROR':
    case 'LOGIN_ERROR':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'SIGNUP_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.user.username,
        errorMessage: '',
      };
    case 'CHANGE_PASSWORD_SUCCESS':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'CHANGE_PASSWORD_ERROR':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
      };
    case 'LOGOUT':
      return {
        token: '',
        username: '',
      };
    case 'DELETE_ACCOUNT':
      return {
        token: '',
        username: '',
        successMessage: action.payload.data,
      };
    case 'REMOVE_ERRORS':
      return {
        ...state,
        errorMessage: '',
      };
    case 'REMOVE_MESSAGES':
      return {
        ...state,
        successMessage: '',
      };
    case 'CHECK_FIRST_LAUNCH':
      return {
        isFirstLaunch: action.payload,
      };
    default:
      return state;
  }
};

const signup = (dispatch) => async ({ email, password, username }) => {
  try {
    const response = await appApiClient.signupUser(email, password, username);
    await setUserSecureStorage(
      response.data.token,
      response.data.user.username
    );
    dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'SIGNUP_ERROR',
      payload: "Something went wrong'( Try again",
    });
  }
};

const login = (dispatch) => async ({ email, password }) => {
  try {
    const response = await appApiClient.loginUser(email, password);
    await setUserSecureStorage(
      response.data.token,
      response.data.user.username
    );

    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: 'Are you sure about password and email?',
    });
  }
};

const authentication = (dispatch) => async () => {
  const token = await SecureStore.getItemAsync('token');
  const username = await SecureStore.getItemAsync('username');
  const user = { token, username };
  if (token) {
    dispatch({ type: 'AUTH_SUCCESS', payload: user });
  }
};
const removeErrors = (dispatch) => () => {
  dispatch({ type: 'REMOVE_ERRORS' });
};

const removeMessages = (dispatch) => () => {
  dispatch({ type: 'REMOVE_MESSAGES' });
};

const changePassword = (dispatch) => async ({
  email,
  oldPassword,
  password,
}) => {
  try {
    const response = await appApiClient.changePassword(
      email,
      oldPassword,
      password
    );
    removeErrors();
    dispatch({ type: 'CHANGE_PASSWORD_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'CHANGE_PASSWORD_ERROR',
      payload: error.response.data.message,
    });
  }
};

const signout = (dispatch) => async () => {
  await SecureStore.deleteItemAsync('token');
  dispatch({ type: 'LOGOUT' });
};

const checkFirstLaunch = (dispatch) => async () => {
  await SecureStore.getItemAsync('alreadyLaunched').then((value) => {
    if (value === null) {
      SecureStore.setItemAsync('alreadyLaunched', 'true');
      dispatch({ type: 'CHECK_FIRST_LAUNCH', payload: true });
    } else {
      dispatch({ type: 'CHECK_FIRST_LAUNCH', payload: false });
    }
  });
};

const deleteAccount = (dispatch) => async ({ username }) => {
  try {
    // TODO: fix sending params so it is more readable
    const response = await appApiClient.deleteUser(username);
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('username');
    await SecureStore.deleteItemAsync('alreadyLaunched');
    dispatch({ type: 'DELETE_ACCOUNT', payload: response.data });
    dispatch({ type: 'CHECK_FIRST_LAUNCH', payload: true });
  } catch (error) {
    dispatch({
      type: 'CHANGE_PASSWORD_ERROR',
      payload: error.response.data.message,
    });
  }
};

export const { Provider, Context } = createAppContext(
  authReducer,
  {
    signup,
    login,
    signout,
    removeErrors,
    removeMessages,
    authentication,
    changePassword,
    deleteAccount,
    checkFirstLaunch,
  },
  { isLoggedIn: false, errorMessage: '', isFirstLaunch: null }
);
