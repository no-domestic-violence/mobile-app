import createAppContext from '../CreateAppContext';
import {
  signup,
  login,
  signout,
  removeErrors,
  removeMessages,
  authentication,
  changePassword,
  deleteAccount,
  checkFirstLaunch,
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
    checkFirstLaunch,
  },
  { isLoggedIn: false, errorMessage: '', isFirstLaunch: null }
);
