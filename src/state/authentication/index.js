import createAppContext from 'helpers/createAppContext';
import {
  signup,
  login,
  signout,
  removeErrors,
  removeMessages,
  authentication,
  changePassword,
  deleteAccount,
  setAlreadyLaunchedValue,
} from './authentication.actions';
import authReducer from './authentication.reducer';

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
    setAlreadyLaunchedValue,
  },
  { isLoggedIn: false, errorMessage: '', isFirstLaunch: null }
);
