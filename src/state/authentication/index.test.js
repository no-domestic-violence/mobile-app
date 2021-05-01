import authReducer from './authentication.reducer';

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

  it('should handle the  AUTH_ERROR action', () => {
    const error = ''; // TODO: fix implementation code
    const action = { type: ' AUTH_ERROR', payload: error };
    const expectedState = { ...initialState, errorMessage: error };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the  LOGIN_SIGNUP_SUCCESS action', () => {
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
