import AsyncStorage from '@react-native-async-storage/async-storage';
import createAppContext from './CreateAppContext';
import appApiClient from '../api/appApiClient';

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
    default:
      return state;
  }
};

const signup = (dispatch) => async ({ email, password, username }) => {
  try {
    const response = await appApiClient.post('/signup', {
      email,
      password,
      username,
    });

    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('username', response.data.user.username);

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
    const response = await appApiClient.post('/login', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('username', response.data.user.username);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: 'Are you sure about password and email?',
    });
  }
};

const authentication = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  const username = await AsyncStorage.getItem('username');
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
  password,
  oldPassword,
}) => {
  try {
    const response = await appApiClient.post('/changePassword', {
      email,
      oldPassword,
      password,
    });
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
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};

const deleteAccount = (dispatch) => async ({ username }) => {
  try {
    // TODO: fix sending params so it is more readable
    const response = await appApiClient.delete('/deleteUser', {
      params: { username },
    });
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
    dispatch({ type: 'DELETE_ACCOUNT', payload: response.data });
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
  },
  { isLoggedIn: false, errorMessage: '' }
);
