import createAppContext from './CreateAppContext';
import appApiClient from '../api/appApiClient';
import {AsyncStorage} from 'react-native';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP_ERROR':
      return {...state, errorMessage: action.payload};
    case 'SIGNUP_SUCCESS':
      return {...state, token: action.payload, errorMessage: ''};
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({email, password, username}) => {
    try {
      const response = await appApiClient.post('/signup', 
      {email, password, username});
      //console.log(response.data.token);//here is JWT
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({type: 'SIGNUP_SUCCESS', payload: response.data.token});
    } catch (error) {
      dispatch({
        type: 'SIGNUP_ERROR',
        payload: 'Something went wrong with sign up',
      });
    }
  };
};

const login = (dispatch) => {
  return ({email, password}) => {};
};

const signout = (dispatch) => {
  return ({email, password}) => {};
};

export const {Provider, Context} = createAppContext(
  authReducer,
  {signup, login, signout},
  {isLoggedIn: false, errorMessage: 'Something went wrong!'},
);
