import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { Text, Keyboard } from 'react-native';
import { StyledButton, StyledButtonText } from 'styles/shared/';
import { AuthSchema, styles } from './index';
import { ControlledTextInput } from 'components/form-fields';

const AuthForm = ({
  formType,
  headerForm,
  onSubmitForm,
  buttonText,
  navigation,
}) => {
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
    <>
      <Text style={styles.header}>{headerForm}</Text>
      {formType === 'sign up' && (
        <ControlledTextInput
          name='username'
          control={control}
          placeholder='Username'
          returnKeyType='next'
          onSubmitEditing={isEmailFocused}
          blurOnSubmit={false}
          errors={errors}
          inputRef={usernameInputRef}
        />
      )}
      <ControlledTextInput
        name='email'
        control={control}
        placeholder='Email'
        returnKeyType='next'
        onSubmitEditing={isPasswordFocused}
        blurOnSubmit={false}
        errors={errors}
      />
      {formType === 'change password' && (
        <ControlledTextInput
          name='oldPassword'
          control={control}
          placeholder='Your old password'
          returnKeyType='next'
          onSubmitEditing={isNewPasswordFocused}
          blurOnSubmit={false}
          errors={errors}
          secureTextEntry
        />
      )}
      <ControlledTextInput
        name='password'
        control={control}
        placeholder='password'
        returnKeyType='next'
        isInputFocused={Keyboard.dismiss}
        blurOnSubmit={false}
        errors={errors}
        secureTextEntry
      />
      <StyledButton onPress={handleSubmit(onSubmitForm)}>
        <StyledButtonText>{buttonText.toUpperCase()}</StyledButtonText>
      </StyledButton>
    </>
  );
};

AuthForm.propTypes = {
  formType: PropTypes.string.isRequired,
  headerForm: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default AuthForm;
