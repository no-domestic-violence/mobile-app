import { AsyncStorage } from 'react-native';
import createAppContext from './CreateAppContext';
import appApiClient from '../api/appApiClient';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP_ERROR':
    case 'LOGIN_ERROR':
      return { ...state, errorMessage: action.payload };
    case 'SIGNUP_SUCCESS':
    case 'LOGIN_SUCCESS':
      return { ...state, token: action.payload, errorMessage: '' };
    default:
      return state;
  }
};

const signup = (dispatch) => async ({ email, password, username }) => {
  try {
    const response = await appApiClient.post('/signup',
      { email, password, username });

    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data.token });
  } catch (error) {
    console.error(error);
    dispatch({
      type: 'SIGNUP_ERROR',
      payload: "Something went wrong'( Try again",
    });
  }
};

const login = (dispatch) => async ({ email, password }) => {
  try {
    const response = await appApiClient.post('/login',
      { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.token });
  } catch (error) {
    dispatch({
      type: 'LOGIN_ERROR',
      payload: 'Are you sure about password and email?',
    });
  }
};

const signout = () => {
  return () => {};
};

export const { Provider, Context } = createAppContext(
  authReducer,
  { signup, login, signout },
  { isLoggedIn: false, errorMessage: '' },
);
