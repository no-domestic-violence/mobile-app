import React, { useState, useRef } from 'react';
import { Text, StyleSheet, Keyboard } from 'react-native';
import {
  StyledInputAuth,
  StyledButton,
  StyledButtonText,
} from '_styles/shared/';
import { Colors } from '_styles/';
import { Divider } from 'react-native-elements';

export default function AuthForm({
  formType,
  headerForm,
  onSubmit,
  buttonText,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();

  const renderUsername = () => {
    return (
      <>
        <StyledInputAuth
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#6c757d"
          onChangeText={setUsername}
          value={username}
          ref={usernameInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            emailInputRef.current && emailInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        <Divider style={{ height: 20, backgroundColor: Colors.primary }} />
      </>
    );
  };

  return (
    <>
      <Text style={styles.header}>{headerForm}</Text>
      {formType === 'sign up' ? renderUsername() : null}
      <StyledInputAuth
        placeholder="Email"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor="#6c757d"
        onChangeText={setEmail}
        value={email}
        ref={emailInputRef}
        returnKeyType="next"
        onSubmitEditing={() =>
          passwordInputRef.current && passwordInputRef.current.focus()
        }
        blurOnSubmit={false}
      />
      <Divider style={{ height: 20, backgroundColor: '#cadeee' }} />
      <StyledInputAuth
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#6c757d"
        onChangeText={setPassword}
        value={password}
        ref={passwordInputRef}
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
        blurOnSubmit={false}
        //   secureTextEntry={true}
      />
      <StyledButton onPress={() => onSubmit({ email, password, username })}>
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
  }
});
