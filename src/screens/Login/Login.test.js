import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AuthProvider } from 'state/index';
import Login from 'screens/Login/index';

describe('Login screen', () => {
  const validEmail = 'test@test.com';
  const validPassword = '12345678';
  const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn(),
  };

  it('should match snapshot', () => {
    const result = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    ).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('should render default screen elements', () => {
    const { getAllByText, queryByPlaceholderText, queryByText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    expect(getAllByText(/log in/i).length).toBe(2);
    expect(queryByPlaceholderText(/email/i));
    expect(queryByPlaceholderText(/password/i));
    expect(queryByText(/Have an account? Go to sign up/i));
  });

  it('should show error messages on empty inputs submit', async () => {
    // given
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.press(getByTestId('logIn'));
    // then
    await waitFor(() => expect(getByText(/please enter an email/i)));
    await waitFor(() =>
      expect(getByText(/please enter 8 characters password/i))
    );
  });
  it('should show error on invalid password', async () => {
    // given
    const { getByTestId, queryByText, queryByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.changeText(queryByPlaceholderText(/password/i), '12');
    fireEvent.press(getByTestId('logIn'));
    // then
    await waitFor(() =>
      expect(queryByText(/please enter 8 characters password/i))
    );
  });
  it('should not show error on valid password', async () => {
    // given
    const { getByTestId, queryByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.changeText(getByPlaceholderText(/password/i), validPassword);
    fireEvent.press(getByTestId('logIn'));
    // then
    await waitFor(() =>
      expect(queryByText(/please enter 8 characters password/i)).toBeNull()
    );
  });

  it('should show error on invalid email', async () => {
    // given
    const { getByTestId, queryByText, queryByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.changeText(queryByPlaceholderText(/email/i), 'test.com');
    fireEvent.press(getByTestId('logIn'));
    // then
    await waitFor(() => expect(queryByText(/please enter an email/i)));
  });
  it('should not show error on valid email', async () => {
    // given
    const { getByTestId, queryByText, queryByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.changeText(queryByPlaceholderText(/email/i), validEmail);
    fireEvent.press(getByTestId('logIn'));
    // then
    await waitFor(() =>
      expect(queryByText(/please enter an email/i)).toBeNull()
    );
  });
  it('should navigate to sign up on press "go to sign up"', async () => {
    // given
    const { queryByText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.press(queryByText(/Do not have an account/i));
    // then
    await expect(mockNavigation.navigate).toHaveBeenCalledWith('Sign Up');
  });
  it('should navigate to home screen on press "proceed without login"', async () => {
    // given
    const { queryByText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.press(queryByText(/proceed without login/i));
    // then
    await expect(mockNavigation.navigate).toHaveBeenCalledWith('BottomTabNavigator', {
      screen: 'Home',
    });
  });
});
