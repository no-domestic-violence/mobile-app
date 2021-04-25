import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AuthProvider } from 'state/index';
import SignUp from 'screens/SignUp/index';

describe('Sign Up screen', () => {
  const validEmail = 'test@test.com';
  const validPassword = '12345678';
  const validUsername = 'celeste';
  const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn(),
  };

  it('should match snapshot', () => {
    const result = render(
      <AuthProvider>
        <SignUp navigation={mockNavigation} />
      </AuthProvider>
    ).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('should render default screen elements', () => {
    const { getAllByText, getByPlaceholderText, queryByText } = render(
      <AuthProvider>
        <SignUp navigation={mockNavigation} />
      </AuthProvider>
    );
    expect(getAllByText(/sign up/i).length).toBe(2);
    expect(getByPlaceholderText(/username/i));
    expect(getByPlaceholderText(/email/i));
    expect(getByPlaceholderText(/password/i));
    expect(queryByText(/Have an account? Go to login/i));
  });

  it('should show error messages on empty inputs submit', async () => {
    // given
    const { getByTestId, getByText } = render(
      <AuthProvider>
        <SignUp navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.press(getByTestId('signUp'));
    // then
    await waitFor(() => expect(getByText(/please enter your username/i)));
    await waitFor(() => expect(getByText(/please enter an email/i)));
    await waitFor(() =>
      expect(getByText(/please enter 8 characters password/i))
    );
  });
  it('should not show error message on valid username', async () => {
    // given
    const { getByTestId, queryByText, getByPlaceholderText } = render(
      <AuthProvider>
        <SignUp navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.changeText(getByPlaceholderText(/username/i), validUsername);
    fireEvent.press(getByTestId('signUp'));
    // then
    await waitFor(() =>
      expect(queryByText(/please enter your username/i)).toBeNull()
    );
  });
  it('should show error on invalid password', async () => {
    // given
    const { getByTestId, queryByText, queryByPlaceholderText } = render(
      <AuthProvider>
        <SignUp navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.changeText(queryByPlaceholderText(/password/i), '12');
    fireEvent.press(getByTestId('signUp'));
    // then
    await waitFor(() =>
      expect(queryByText(/please enter 8 characters password/i))
    );
  });
  it('should not show error on valid password', async () => {
    // given
    const { getByTestId, queryByText, getByPlaceholderText } = render(
      <AuthProvider>
        <SignUp navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.changeText(getByPlaceholderText(/password/i), validPassword);
    fireEvent.press(getByTestId('signUp'));
    // then
    await waitFor(() =>
      expect(queryByText(/please enter 8 characters password/i)).toBeNull()
    );
  });

  it('should show error on invalid email', async () => {
    // given
    const { getByTestId, queryByText, queryByPlaceholderText } = render(
      <AuthProvider>
        <SignUp navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.changeText(queryByPlaceholderText(/email/i), 'test.com');
    fireEvent.press(getByTestId('signUp'));
    // then
    await waitFor(() => expect(queryByText(/please enter an email/i)));
  });
  it('should not show error on valid email', async () => {
    // given
    const { getByTestId, queryByText, queryByPlaceholderText } = render(
      <AuthProvider>
        <SignUp navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.changeText(queryByPlaceholderText(/email/i), validEmail);
    fireEvent.press(getByTestId('signUp'));
    // then
    await waitFor(() =>
      expect(queryByText(/please enter an email/i)).toBeNull()
    );
  });
  it('should navigate to login screen on press "go to login"', async () => {
    // given
    const { queryByText } = render(
      <AuthProvider>
        <SignUp navigation={mockNavigation} />
      </AuthProvider>
    );
    // when
    fireEvent.press(queryByText(/go to login/i));
    // then
    await expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });
});
