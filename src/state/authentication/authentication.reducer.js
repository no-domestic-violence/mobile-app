import types from './authentication.types';
import { createReducer, handleErrorMessage, updateState } from '../../helpers';

const initialAuthState = {
  token: '',
  username: '',
};

const loginSignupSuccessCase = (state, { payload }) => {
  return {
    ...state,
    token: payload.accessToken,
    username: payload.user.username,
    errorMessage: '',
  };
};

const changePasswordSuccessCase = updateState('successMessage');

const authSuccessCase = (state, { payload }) => {
  return {
    ...state,
    token: payload.accessToken,
    username: payload.username,
  };
};

const logoutCase = (state = initialAuthState, { payload }) => {
  return {
    state,
  };
};

const deleteAccountSuccessCase = (state = initialAuthState, { payload }) => {
  return {
    state,
    successMessage: payload.data,
  };
};

const removeErrorsCase = (state, { payload }) => {
  return {
    ...state,
    errorMessage: '',
  };
};

const removeMessagesCase = (state, { payload }) => {
  return {
    ...state,
    successMessage: '',
  };
};

const checkFirstLaunchCase = updateState('isFirstLaunch');

const authReducer = createReducer({
  [types.AUTH_ERROR]: handleErrorMessage,
  [types.LOGIN_SIGNUP_SUCCESS]: loginSignupSuccessCase,
  [types.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccessCase,
  [types.AUTH_SUCCESS]: authSuccessCase,
  [types.LOGOUT]: logoutCase,
  [types.DELETE_ACCOUNT_SUCCESS]: deleteAccountSuccessCase,
  [types.REMOVE_ERRORS]: removeErrorsCase,
  [types.REMOVE_MESSAGES]: removeMessagesCase,
  [types.CHECK_FIRST_LAUNCH]: checkFirstLaunchCase,
});

export default authReducer;
