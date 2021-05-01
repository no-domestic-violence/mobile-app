import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AuthContext, AuthProvider } from 'state/index';
import Login from 'screens/Login/index';

const email = 'test@test.com';
const password = '12345678';
const navigate = jest.fn();
const addListener = jest.fn();
const token =
  'eyJ0eXAiOiJKV1QiLCJub25jZSI6IjJQSnRPNkMxR2hkaHB2VFl3ZVVseEpkMU5WbzJVZE0waUlwOHFXdHVMejgiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCIsImtpZCI6ImtnMkxZczJUMENUaklmajRydDZKSXluZW4zOCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wMTY1MWZjYS0zMzRjLTQxY2EtOWViYi04Y2FmNjkyMTIwZGEvIiwiaWF0IjoxNjA2MzM5NTg5LCJuYmYiOjE2MDYzMzk1ODksImV4cCI6MTYwNjM0MzQ4OSwiYWNjdCI6MCwiYWNyIjoiMSIsImFjcnMiOlsidXJuOnVzZXI6cmVnaXN0ZXJzZWN1cml0eWluZm8iLCJ1cm46bWljcm9zb2Z0OnJlcTEiLCJ1cm46bWljcm9zb2Z0OnJlcTIiLCJ1cm46bWljcm9zb2Z0OnJlcTMiLCJjMSIsImMyIiwiYzMiLCJjNCIsImM1IiwiYzYiLCJjNyIsImM4IiwiYzkiLCJjMTAiLCJjMTEiLCJjMTIiLCJjMTMiLCJjMTQiLCJjMTUiLCJjMTYiLCJjMTciLCJjMTgiLCJjMTkiLCJjMjAiLCJjMjEiLCJjMjIiLCJjMjMiLCJjMjQiLCJjMjUiXSwiYWlvIjoiRTJSZ1lLanZlaG4rVVBXMXBaLzhTZ1hwUy8xR0pUclQvSGovQ214Ny9PYTU4RFhPMDJjQiIsImFtciI6WyJwd2QiXSwiYXBwX2Rpc3BsYXluYW1lIjoiQm9uaWFsIENvbnNvbGUiLCJhcHBpZCI6ImY5NTk2MzU1LTQ0YmItNDAyZS04MWY3LTliZGY1YTJjYmNkNiIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiR29uemFsZXoiLCJnaXZlbl9uYW1lIjoiU2VyZ2lvIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiNjIuOTYuNzguMTE0IiwibmFtZSI6IlNlcmdpbyBHb256YWxleiIsIm9pZCI6IjQ5ZjZiMjdiLWM4YjYtNDM0NC1hMzY2LWQwOTA4YzcwNzQ4YSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0zNTUyNjE5OTcwLTMzODgzOTQ4MjQtMjM1Mzk4MDkwNi0xMTE5IiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMzRkZGOTg3QkJFMUYiLCJyaCI6IjAuQUFBQXloOWxBVXd6eWtHZXU0eXZhU0VnMmxWaldmbTdSQzVBZ2ZlYjMxb3N2TlpmQVBJLiIsInNjcCI6IkRpcmVjdG9yeS5BY2Nlc3NBc1VzZXIuQWxsIERpcmVjdG9yeS5SZWFkLkFsbCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJxNjAzS0R1Z28wenlqa1lSeU5kUEpTa2NBT2gybEJ3TFA5V1B1azVZSVpBIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiMDE2NTFmY2EtMzM0Yy00MWNhLTllYmItOGNhZjY5MjEyMGRhIiwidW5pcXVlX25hbWUiOiJzZXJnaW8uZ29uemFsZXpAYm9uaWFsLmNvbSIsInVwbiI6InNlcmdpby5nb256YWxlekBib25pYWwuY29tIiwidXRpIjoiZ2hVOUVISF9nMHVRR3NQRTdDdlRBQSIsInZlciI6IjEuMCIsInhtc19zdCI6eyJzdWIiOiJkUnJyYXhyMk9INVEyc1NQUTdVeFRDcUUxeXUzNkVOVHJYTUVqMk1ZLWRvIn0sInhtc190Y2R0IjoxNDU0NjIwMTI0fQ.ZT89tyBnQ-oe8W3xCX7VYwSTV2pjyYzkFNtDVgwvD06h12-v-1QWI9FkAgwwGfW4kJZK4KqgA30LrpbX0BIOhxFuS1SaUrDnW-xgJ6kHBZZym9cyncWBQsVBphVB-850lkiHSLZvbgkriv8diSuEdjAhdewk7EFKYxyr0AG9boSjnpzXi2DAYLG_EVGwxfDyZ9DsdxSug5bhLar3avRFqBrnC1MO7vqBRdNirguzK4GWnrG5a48N_eVmeN-F46DzRUs1Q8QSlYD8ajsq9QjQ3osJdz2wgCF0bRJ0q8_Dyae0Pw8bqppEXlb1ls0o8blkLSvkcGRc8DPKIRqqTzAi6Q';
describe('Login screen', () => {
  it('should match snapshot', () => {
    const result = render(
      <AuthProvider>
        <Login navigation={{ navigate, addListener }} />
      </AuthProvider>
    ).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('should render default screen elements', () => {
    const { getAllByText, getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={{ navigate, addListener }} />
      </AuthProvider>
    );
    expect(getAllByText(/log in/i).length).toBe(2);
    expect(getByPlaceholderText(/email/i));
    expect(getByPlaceholderText(/password/i));
    expect(getByText(/Go to sign up/i));
  });

  it('should show error messages on empty inputs submit', async () => {
    const { getByTestId, findByText } = render(
      <AuthProvider>
        <Login navigation={{ navigate, addListener }} />
      </AuthProvider>
    );

    fireEvent.press(getByTestId('logIn'));

    expect(await findByText(/please enter an email/i)).toBeTruthy();
    expect(
      await findByText(/please enter 8 characters password/i)
    ).toBeTruthy();
  });

  it('should show error on invalid password', async () => {
    const invalidPassword = 'one';

    const { getByTestId, getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={{ navigate, addListener }} />
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText(/password/i), invalidPassword);
    fireEvent.press(getByTestId('logIn'));

    await waitFor(() =>
      expect(getByText(/please enter 8 characters password/i)).toBeTruthy()
    );
  });

  it('should not show error on valid password', async () => {
    const { getByTestId, queryByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={{ navigate, addListener }} />
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText(/password/i), password);
    fireEvent.press(getByTestId('logIn'));

    await waitFor(() =>
      expect(queryByText(/please enter 8 characters password/i)).toBeNull()
    );
  });

  it('should show error on invalid email', async () => {
    const invalidEmail = 'test.com';
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={{ navigate, addListener }} />
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText(/email/i), invalidEmail);
    fireEvent.press(getByTestId('logIn'));

    await waitFor(() =>
      expect(getByText(/email must be a valid email/i)).toBeTruthy()
    );
  });
  it('should not show error on valid email', async () => {
    const { getByTestId, queryByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={{ navigate, addListener }} />
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText(/email/i), email);
    fireEvent.press(getByTestId('logIn'));

    await waitFor(() =>
      expect(queryByText(/email must be a valid email/i)).toBeNull()
    );
  });
  it('should navigate to sign up on press "go to sign up"', async () => {
    const { getByText } = render(
      <AuthProvider>
        <Login navigation={{ navigate, addListener }} />
      </AuthProvider>
    );

    fireEvent.press(getByText(/Do not have an account/i));

    await expect(navigate).toHaveBeenCalledWith('Sign Up');
  });
  it('should navigate to home screen on press "proceed without login"', async () => {
    const { getByText } = render(
      <AuthProvider>
        <Login navigation={{ navigate, addListener }} />
      </AuthProvider>
    );

    fireEvent.press(getByText(/proceed without login/i));

    await expect(navigate).toHaveBeenCalledWith('BottomTabNavigator', {
      screen: 'Home',
    });
  });
  it('should handle valid input onSubmit and call login action creator function with email and password', async () => {
    const state = {
      isLoggedIn: true,
      errorMessage: '',
      isFirstLaunch: false,
      token,
    };
    const login = jest.fn();

    const { getByTestId, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ state, login }}>
        <Login navigation={{ navigate, addListener }} />
      </AuthContext.Provider>
    );

    fireEvent.changeText(getByPlaceholderText(/email/i), email);
    fireEvent.changeText(getByPlaceholderText(/password/i), password);
    fireEvent.press(getByTestId('logIn'));
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();

    expect(login).toBeCalledWith({ email, password });
    expect(navigate).toBeCalledWith('User');
  });
});
