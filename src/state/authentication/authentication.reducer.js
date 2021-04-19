import {
  CHANGE_PASSWORD_SUCCESS,
  AUTH_SUCCESS,
  LOGOUT,
  DELETE_ACCOUNT_SUCCESS,
  REMOVE_ERRORS,
  REMOVE_MESSAGES,
  CHECK_FIRST_LAUNCH,
  AUTH_ERROR,
  LOGIN_SIGNUP_SUCCESS
} from './authentication.types';

const initialState = {
  token: '',
  username: '',
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: payload,
      };
    case LOGIN_SIGNUP_SUCCESS:
      return {
        ...state,
        token: payload.token,
        username: payload.user.username,
        errorMessage: '',
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        successMessage: payload,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: payload.token,
        username: payload.username,
      };
    case LOGOUT:
      return {
        initialState,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...initialState,
        successMessage: payload.data,
      };
    case REMOVE_ERRORS:
      return {
        ...state,
        errorMessage: '',
      };
    case REMOVE_MESSAGES:
      return {
        ...state,
        successMessage: '',
      };
    case CHECK_FIRST_LAUNCH:
      return {
        ...state,
        isFirstLaunch: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
