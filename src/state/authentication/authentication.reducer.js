const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SIGNUP_ERROR':
    case 'LOGIN_ERROR':
      return {
        ...state,
        errorMessage: payload,
      };
    case 'SIGNUP_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: payload.token,
        username: payload.user.username,
        errorMessage: '',
      };
    case 'CHANGE_PASSWORD_SUCCESS':
      return {
        ...state,
        successMessage: payload,
      };
    case 'CHANGE_PASSWORD_ERROR':
      return {
        ...state,
        errorMessage: payload,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        token: payload.token,
        username: payload.username,
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
        successMessage: payload.data,
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
        isFirstLaunch: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
