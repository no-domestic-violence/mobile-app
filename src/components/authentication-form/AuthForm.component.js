import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Text, Keyboard } from 'react-native';
import { StyledButton, StyledButtonText } from 'styles/shared/';
import { ControlledTextInput } from 'components/form-fields';
import { AuthSchema, styles } from './index';

const AuthForm = ({ formType, headerForm, onSubmitForm, buttonText }) => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(AuthSchema(formType)),
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();
  const newPasswordInputRef = useRef();

  const isEmailFocused = emailInputRef.current && emailInputRef.current.focus();
  const isPasswordFocused =
    passwordInputRef.current && passwordInputRef.current.focus();
  const isNewPasswordFocused =
    newPasswordInputRef.current && newPasswordInputRef.current.focus();

  return (
    <FormProvider>
      <Text testID='form-header' style={styles.header}>
        {headerForm}
      </Text>
      {formType === 'sign up' && (
        <>
          <ControlledTextInput
            name='username'
            control={control}
            placeholder='Username'
            returnKeyType='next'
            onSubmitEditing={isEmailFocused}
            blurOnSubmit={false}
            inputRef={usernameInputRef}
            style={styles.input}
            errors={errors}
          />
        </>
      )}
      <ControlledTextInput
        name='email'
        control={control}
        placeholder='Email'
        returnKeyType='next'
        onSubmitEditing={isPasswordFocused}
        blurOnSubmit={false}
        inputRef={emailInputRef}
        style={styles.input}
        errors={errors}
      />
      {formType === 'change password' && (
        <>
          <ControlledTextInput
            name='oldPassword'
            control={control}
            placeholder='Old password'
            returnKeyType='next'
            onSubmitEditing={isNewPasswordFocused}
            blurOnSubmit={false}
            inputRef={passwordInputRef}
            secureTextEntry
            style={styles.input}
            errors={errors}
          />
        </>
      )}
      <ControlledTextInput
        name='password'
        control={control}
        placeholder='Password'
        returnKeyType='next'
        isInputFocused={Keyboard.dismiss}
        inputRef={newPasswordInputRef}
        blurOnSubmit={false}
        secureTextEntry
        style={styles.input}
        errors={errors}
      />
      <StyledButton onPress={handleSubmit(onSubmitForm)}>
        <StyledButtonText>{buttonText.toUpperCase()}</StyledButtonText>
      </StyledButton>
    </FormProvider>
  );
};

AuthForm.propTypes = {
  formType: PropTypes.string.isRequired,
  headerForm: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default AuthForm;
