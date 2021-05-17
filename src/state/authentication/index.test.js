import authReducer from './authentication.reducer';
import {
  loginSignup,
  changePassword,
  signout,
  setAlreadyLaunchedValue,
  deleteAccount,
} from './authentication.actions';
import types from './authentication.types';
import MockAdapter from 'axios-mock-adapter';
import appApiClient from '../../api/index';
import apiInstance from '../../api/apiInstance';

jest.unmock('axios');

describe('authReducer', () => {
  const initialState = {
    isLoggedIn: false,
    errorMessage: '',
    isFirstLaunch: null,
  };
  const invalidAction = { type: 'INVALID_ACTION' };

  it('should return the initialState', () => {
    expect(authReducer(initialState, invalidAction)).toEqual(initialState);
  });

  it('should handle the AUTH_ERROR action', () => {
    const error = '';
    const action = { type: 'AUTH_ERROR', payload: error };
    const expectedState = { ...initialState, errorMessage: error };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the LOGIN_SIGNUP_SUCCESS action', () => {
    const token = 'TestToken';
    const user = {
      username: 'TestUsername',
    };
    const action = { type: ' LOGIN_SIGNUP_SUCCESS', payload: { token, user } };
    const expectedState = {
      ...initialState,
      token,
      username: user.username,
      errorMessage: '',
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the CHANGE_PASSWORD_SUCCESS action', () => {
    const successMessage = '';
    const action = { type: 'CHANGE_PASSWORD_SUCCESS', payload: successMessage };
    const expectedState = { ...initialState, successMessage };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle the AUTH_SUCCESS action', () => {
    const token = 'TestToken';
    const username = 'TestUsername';
    const action = { type: 'AUTH_SUCCESS', payload: { token, username } };
    const expectedState = { ...initialState, token, username };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the LOGOUT action and return initial state', () => {
    expect(authReducer(initialState, 'LOGOUT')).toEqual(initialState);
  });

  it('should handle the REMOVE_ERRORS action', () => {
    const action = { type: 'REMOVE_ERRORS' };
    const expectedState = { ...initialState, errorMessage: '' };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
  it('should handle the REMOVE_MESSAGES action', () => {
    const action = { type: 'REMOVE_MESSAGES' };
    const expectedState = { ...initialState, successMessage: '' };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the CHECK_FIRST_LAUNCH action', () => {
    const isFirstLaunch = true;
    const action = { type: 'CHECK_FIRST_LAUNCH', payload: isFirstLaunch };
    const expectedState = { ...initialState, isFirstLaunch };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
});

describe('authentication actions', () => {
  const mockAppClient = new MockAdapter(apiInstance, {
    onNoMatch: 'throwException',
  });
  const email = 'test@test.com';
  const password = '12345678';
  const username = 'celeste';
  const token = 'TestToken121212';
  const user = {
    username,
    email,
    contacts: [{}],
    role: 'basic',
  };

  beforeEach(async () => {
    mockAppClient.reset();
  });

  afterAll(() => {
    mockAppClient.restore();
  });
  const dispatch = jest.fn();
  it('should create an action to sign up user', async () => {
    const response = {
      success: true,
      token,
      user,
    };
    mockAppClient
      .onPost('/signup', { email, password, username })
      .reply(201, response);
    appApiClient.signupUser(email, password, username);
    mockAppClient
    .onPost('/login', { email, password })
    .reply(201, response);
    const expectedAction = {
      type: types.LOGIN_SIGNUP_SUCCESS,
      payload: response,
    };
    await loginSignup(dispatch)({ email, password, username });
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
  it('should create an action to login user', async () => {
    const response = {
      success: true,
      token,
      user,
    };
    mockAppClient.onPost('/login', { email, password }).reply(201, response);
    appApiClient.loginUser(email, password, username);
    const expectedAction = {
      type: types.LOGIN_SIGNUP_SUCCESS,
      payload: response,
    };
    await loginSignup(dispatch)({ email, password });
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
  
  it('should create an action to change user password', async () => {
    const oldPassword = '87654321';
    const response = {
      message: 'You updated the password',
    };
    mockAppClient
      .onPost('/changePassword', { email, oldPassword, password })
      .reply(200, response);
    await appApiClient.changePassword(email, oldPassword, password);
    const expectedAction = {
      type: types.CHANGE_PASSWORD_SUCCESS,
      payload: response,
    };
    await changePassword(dispatch)({ email, oldPassword, password });
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
  it('should create an action to signout user', async () => {
    const expectedAction = { type: types.LOGOUT };
    await signout(dispatch)();
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
  it('should dispatch an action to set if user has been already launched', async () => {
    await setAlreadyLaunchedValue(dispatch)();
    expect(dispatch).toHaveBeenCalled();
  });
  it('should create delete account', async () => {
    const response = {
      message: 'User was deleted',
      user,
    };
    mockAppClient
      .onDelete('/deleteUser', { params: { username } })
      .reply(200, response);
    await appApiClient.deleteUser(username);
    const expectedAction = {
      type: types.DELETE_ACCOUNT_SUCCESS,
      payload: response,
    };
    await deleteAccount(dispatch)({ username });
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
