import React from 'react';
import { render } from '@testing-library/react-native';
import AuthForm from './AuthForm.component';

const onSubmitForm = jest.fn();
describe('Authentication form component', () => {
  it('should render the right header and username, email, password for sign up', () => {
    const formType = 'sign up';
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <AuthForm
        formType={formType}
        headerForm='Sign up'
        onSubmitForm={onSubmitForm}
        buttonText='Sign up'
      />
    );
    expect(getByTestId('form-header')).toHaveTextContent('Sign up');
    expect(getByPlaceholderText(/username/i)).not.toBeNull();
    expect(getByPlaceholderText(/email/i)).not.toBeNull();
    expect(getByPlaceholderText(/password/i)).not.toBeNull();
    expect(getByText('Sign up')).not.toBeNull();
  });

  it('should render the right header and email, password for log in', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <AuthForm
        formType='log in'
        headerForm='Log in'
        onSubmitForm={onSubmitForm}
        buttonText='log in'
      />
    );
    expect(getByTestId('form-header')).toHaveTextContent('Log in');
    expect(getByPlaceholderText(/email/i)).not.toBeNull();
    expect(getByPlaceholderText(/password/i)).not.toBeNull();
  });

  it('should render the right header and email, password, old password for change password form', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <AuthForm
        formType='change password'
        headerForm='Change password'
        onSubmitForm={onSubmitForm}
        buttonText='confirm'
      />
    );
    expect(getByTestId('form-header')).toHaveTextContent('Change password');
    expect(getByPlaceholderText(/email/i)).not.toBeNull();
    expect(getByPlaceholderText(/old password/i)).not.toBeNull();
    expect(getByPlaceholderText('Password')).not.toBeNull();
    expect(getByText(/confirm/i)).not.toBeNull();
  });

  describe('should match snapshot', () => {
    it('for change password form', () => {
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
    it('for sign up form', () => {
      const result = render(
        <AuthForm
          formType='sign up'
          headerForm='Sign up'
          onSubmitForm={onSubmitForm}
          buttonText='Sign up'
        />
      ).toJSON();
      expect(result).toMatchSnapshot();
    });
    it('for login form', () => {
      const result = render(
        <AuthForm
          formType='log in'
          headerForm='Log in'
          onSubmitForm={onSubmitForm}
          buttonText='Log in'
        />
      ).toJSON();
      expect(result).toMatchSnapshot();
    });
  });
});
