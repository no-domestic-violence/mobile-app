import types from './authentication.types'

const initialState = {
  token: '',
  username: '',
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case types.AUTH_ERROR:
      return {
        ...state,
        errorMessage: payload,
      };
    case types.LOGIN_SIGNUP_SUCCESS:
      return {
        ...state,
        token: payload.token,
        username: payload.user.username,
        errorMessage: '',
      };
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        successMessage: payload,
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        token: payload.token,
        username: payload.username,
      };
    case types.LOGOUT:
      return {
        initialState,
      };
    case types.DELETE_ACCOUNT_SUCCESS:
      return {
        ...initialState,
        successMessage: payload.data,
      };
    case types.REMOVE_ERRORS:
      return {
        ...state,
        errorMessage: '',
      };
    case types.REMOVE_MESSAGES:
      return {
        ...state,
        successMessage: '',
      };
    case types.CHECK_FIRST_LAUNCH:
      return {
        ...state,
        isFirstLaunch: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
