import createAppContext from './CreateAppContext';
import appApiClient from '../api/appApiClient';

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch) => {
  //add username
  return async ({email, password}) => {
    try {
      const response = await appApiClient.post('/signup', {email, password});
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
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
  {isLoggedIn: false},
);
