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
    const { getAllByText, getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    expect(getAllByText(/log in/i).length).toBe(2);
    expect(getByPlaceholderText(/email/i));
    expect(getByPlaceholderText(/password/i));
    expect(getByText(/Go to sign up/i));
  });

  it('should show error messages on empty inputs submit', async () => {
    // given
    const { getByTestId, findByText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.press(getByTestId('logIn'));
    // then
    expect(await findByText(/please enter an email/i)).toBeTruthy();
    expect(
      await findByText(/please enter 8 characters password/i)
    ).toBeTruthy();
  });

  it('should show error on invalid password', async () => {
    // given
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.changeText(getByPlaceholderText(/password/i), '12');
    fireEvent.press(getByTestId('logIn'));
    // then
    await waitFor(() =>
      expect(getByText(/please enter 8 characters password/i)).toBeTruthy()
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
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.changeText(getByPlaceholderText(/email/i), 'test');
    fireEvent.press(getByTestId('logIn'));
    // then
    await waitFor(() =>
      expect(getByText(/email must be a valid email/i)).toBeTruthy()
    );
  });
  it('should not show error on valid email', async () => {
    // given
    const { getByTestId, queryByText, getByPlaceholderText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.changeText(getByPlaceholderText(/email/i), validEmail);
    fireEvent.press(getByTestId('logIn'));
    // then
    await waitFor(() =>
      expect(queryByText(/email must be a valid email/i)).toBeNull()
    );
  });
  it('should navigate to sign up on press "go to sign up"', async () => {
    // given
    const { getByText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.press(getByText(/Do not have an account/i));
    // then
    await expect(mockNavigation.navigate).toHaveBeenCalledWith('Sign Up');
  });
  it('should navigate to home screen on press "proceed without login"', async () => {
    // given
    const { getByText } = render(
      <AuthProvider>
        <Login navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.press(getByText(/proceed without login/i));
    // then
    await expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'BottomTabNavigator',
      {
        screen: 'Home',
      }
    );
  });
});
