import {
  SIGNUP_ERROR,
  LOGIN_ERROR,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  AUTH_SUCCESS,
  LOGOUT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_ERROR,
  REMOVE_ERRORS,
  REMOVE_MESSAGES,
  CHECK_FIRST_LAUNCH,
} from './authentication.types';

const initialState = {
  token: '',
  username: '',
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case SIGNUP_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        errorMessage: payload,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
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
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        errorMessage: payload,
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
    case DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        errorMessage: payload,
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
        isFirstLaunch: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
