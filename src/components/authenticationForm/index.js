import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Text, Keyboard } from 'react-native';
import {
  StyledInputAuth,
  StyledButton,
  StyledButtonText,
} from '_styles/shared/';
import { Colors } from '_styles/';
import { Divider } from 'react-native-elements';
import { styles } from './AuthForm.styles';

export default function AuthForm({
  formType,
  headerForm,
  onSubmitForm,
  buttonText,
}) {
  const AuthSchema = yup.object().shape({
    username: yup.string().when(formType, () => {
      if (formType === 'sign up')
        return yup.string().required('Please enter your username');
      return yup.string().notRequired();
    }),
    oldPassword: yup.string().when(formType, () => {
      if (formType === 'change password')
        return yup.string().required('Please enter your old password here');
      return yup.string().notRequired();
    }),
    email: yup.string().required('Please enter an email'),
    password: yup
      .string()
      .min(8, 'Please enter 8 characters password')
      .required('Please enter 8 characters password'),
  });

  const { control, handleSubmit, errors, getValues } = useForm({
    resolver: yupResolver(AuthSchema),
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();
  const oldPasswordInputRef = React.useRef();

  const renderUsername = () => {
    return (
      <>
        <Controller
          name='username'
          defaultValue=''
          control={control}
          onFocus={() => {
            usernameInputRef.current.focus();
          }}
          render={({ onChange, value }) => (
            <StyledInputAuth
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder='Username'
              autoCapitalize='none'
              autoCorrect={false}
              placeholderTextColor='#6c757d'
              ref={usernameInputRef}
              returnKeyType='next'
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          )}
        />
        <Divider style={{ height: 5, backgroundColor: Colors.primary }} />
        {errors.username && (
          <Text style={{ color: 'red' }}>{errors.username.message}</Text>
        )}
        <Divider style={{ height: 20, backgroundColor: Colors.primary }} />
      </>
    );
  };
  const renderOldpasswordInput = () => {
    return (
      <>
        <Controller
          name='oldPassword'
          defaultValue=''
          control={control}
          onFocus={() => {
            password.current.focus();
          }}
          render={({ onChange, value }) => (
            <StyledInputAuth
              placeholder='Your old password'
              autoCapitalize='none'
              autoCorrect={false}
              placeholderTextColor='#6c757d'
              onChangeText={(value) => onChange(value)}
              value={value}
              ref={oldPasswordInputRef}
              returnKeyType='next'
              onSubmitEditing={() =>
                newPasswordInputRef.current &&
                newPasswordInputRef.current.focus()
              }
              blurOnSubmit={false}
              // secureTextEntry={true}
              // TODO:fix secure password
            />
          )}
        />
        <Divider style={{ height: 5, backgroundColor: Colors.primary }} />
        {errors.oldPassword && (
          <Text style={{ color: 'red' }}>{errors.oldPassword.message}</Text>
        )}
        <Divider style={{ height: 20, backgroundColor: Colors.primary }} />
      </>
    );
  };
  return (
    <>
      <Text style={styles.header}>{headerForm}</Text>
      {formType === 'sign up' ? renderUsername() : null}
      <Controller
        name='email'
        control={control}
        defaultValue=''
        onFocus={() => {
          emailInputRef.current.focus();
        }}
        render={({ onChange, value }) => (
          <StyledInputAuth
            placeholder='Email'
            autoCorrect={false}
            autoCapitalize='none'
            placeholderTextColor='#6c757d'
            onChangeText={(value) => onChange(value)}
            value={value}
            ref={emailInputRef}
            returnKeyType='next'
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
        )}
      />
      <Divider style={{ height: 5, backgroundColor: Colors.primary }} />
      {errors.email && (
        <Text style={{ color: 'red' }}>{errors.email.message}</Text>
      )}
      <Divider style={{ height: 20, backgroundColor: Colors.primary }} />
      {formType === 'change password' ? renderOldpasswordInput() : null}
      <Controller
        name='password'
        defaultValue=''
        control={control}
        render={({ onChange, value }) => (
          <StyledInputAuth
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            placeholderTextColor='#6c757d'
            onChangeText={(value) => onChange(value)}
            value={value}
            ref={passwordInputRef}
            returnKeyType='done'
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            // secureTextEntry={true}
          />
        )}
      />
      <Divider style={{ height: 5, backgroundColor: Colors.primary }} />
      {errors.password && (
        <Text style={{ color: 'red' }}>{errors.password.message}</Text>
      )}

      <StyledButton onPress={handleSubmit(onSubmitForm)}>
        <StyledButtonText>{buttonText.toUpperCase()}</StyledButtonText>
      </StyledButton>
    </>
  );
}

AuthForm.propTypes = {
  formType: PropTypes.string.isRequired,
  headerForm: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
