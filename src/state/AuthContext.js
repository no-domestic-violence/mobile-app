import { AsyncStorage } from 'react-native';
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
    case 'AUTH_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
      };
    case 'LOGOUT':
      return {
        token: '',
      };
    case 'REMOVE_ERRORS':
      return {
        ...state,
        errorMessage: '',
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

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};

export const { Provider, Context } = createAppContext(
  authReducer,
  {
    signup,
    login,
    signout,
    removeErrors,
    authentication,
  },
  { isLoggedIn: false, errorMessage: '' },
);
