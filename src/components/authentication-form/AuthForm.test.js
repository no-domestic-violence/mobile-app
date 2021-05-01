import React from 'react';
import { render } from '@testing-library/react-native';
import AuthForm from './AuthForm.component';

const onSubmitForm = jest.fn();
describe('Authentication form component', () => {
  it('should render the right header and username, email, password for sign up', () => {
    const formType = 'sign up';
    const { queryByPlaceholderText, queryByText, queryByTestId } = render(
      <AuthForm
        formType={formType}
        headerForm='Sign up'
        onSubmitForm={onSubmitForm}
        buttonText='Sign up'
      />
    );
    expect(queryByTestId('form-header')).toHaveTextContent('Sign up');
    expect(queryByPlaceholderText(/username/i)).not.toBeNull();
    expect(queryByPlaceholderText(/email/i)).not.toBeNull();
    expect(queryByPlaceholderText(/password/i)).not.toBeNull();
    expect(queryByText('Sign up')).not.toBeNull();
  });

  it('should render the right header and email, password for log in', () => {
    const { queryByPlaceholderText, queryByTestId } = render(
      <AuthForm
        formType='log in'
        headerForm='Log in'
        onSubmitForm={onSubmitForm}
        buttonText='log in'
      />
    );
    expect(queryByTestId('form-header')).toHaveTextContent('Log in');
    expect(queryByPlaceholderText(/email/i)).not.toBeNull();
    expect(queryByPlaceholderText(/password/i)).not.toBeNull();
  });

  it('should render the right header and email, password, old password for change password form', () => {
    const { queryByPlaceholderText, queryByText, queryByTestId } = render(
      <AuthForm
        formType='change password'
        headerForm='Change password'
        onSubmitForm={onSubmitForm}
        buttonText='confirm'
      />
    );
    expect(queryByTestId('form-header')).toHaveTextContent('Change password');
    expect(queryByPlaceholderText(/email/i)).not.toBeNull();
    expect(queryByPlaceholderText(/old password/i)).not.toBeNull();
    expect(queryByPlaceholderText('Password')).not.toBeNull();
    expect(queryByText(/confirm/i)).not.toBeNull();
  });
  it('should match snapshot', () => {
    const result = render(
      <AuthForm
        formType='change password'
        headerForm='Change password'
        onSubmitForm={onSubmitForm}
        buttonText='confirm'
      />
    ).toJSON();
    expect(result).toMatchSnapshot();
  });
});
