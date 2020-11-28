import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Text, StyleSheet, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';
import {
  StyledInputAuth,
  StyledButton,
  StyledButtonText,
} from '_styles/shared/';
import { Colors } from '_styles/';
import { Divider } from 'react-native-elements';

const AuthSchema = yup.object().shape({
  username: yup.string().required('Please enter your username'),
  email: yup.string().required("Please enter an email"),
  password: yup.string().min(8).required('Please enter 8 characters password'),
});

export default function AuthForm({
  formType,
  headerForm,
  onSubmitForm,
  buttonText,
}) {

  const { control, handleSubmit, errors, getValues } = useForm({
    resolver: yupResolver(AuthSchema),
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();

  const { email, password, username } = getValues();
  const renderUsername = () => {
    return (
      <>
        <Controller
          name="username"
          defaultValue=""
          control={control}
          onFocus={() => {
            usernameInputRef.current.focus();
          }}
          render={({ onChange, value }) => (
            <StyledInputAuth
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#6c757d"
              ref={usernameInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          )}
        />
        {errors.username && (
          <Text style={{color: 'red' }}>
            {errors.username.message}
          </Text>
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
        name="email"
        control={control}
        defaultValue=""
        onFocus={() => {
          emailInputRef.current.focus();
        }}
        render={({ onChange, value }) => (
          <StyledInputAuth
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="#6c757d"
            onChangeText={(value) => onChange(value)}
            value={value}
            ref={emailInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}
      <Divider style={{ height: 20, backgroundColor: '#cadeee' }} />
      <Controller
        name="password"
        defaultValue=""
        control={control}
        render={({ onChange, value }) => (
          <StyledInputAuth
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#6c757d"
            onChangeText={(value) => onChange(value)}
            value={value}
            ref={passwordInputRef}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            //   secureTextEntry={true}
          />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <StyledButton
        onPress={handleSubmit(onSubmitForm({ email, password, username }))
        }>
        <StyledButtonText>{buttonText.toUpperCase()}</StyledButtonText>
      </StyledButton>
    </>
  );
}
const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    height: '100%',
  },
  header: {
    fontSize: 35,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 40,
    marginLeft: 30,
  },
});
