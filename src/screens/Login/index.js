import React, { useContext, useState, useEffect } from 'react';
import { Context as AuthContext } from '../../state/AuthContext';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { StyledView } from '../../styles/shared/StyledView';
import {
  StyledButton,
  StyledButtonText,
} from '../../styles/shared/StyledButton';
import { StyledInputAuth } from '../../styles/shared/StyledInputAuth';

import { useTranslation } from 'react-i18next';
import AuthSVG from '_assets/svg/login.svg';

export default function LoginScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const { state, login, removeErrors } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailInputRef = React.createRef();
  const passwordInputRef = React.createRef();

  const handleLogIn = () => {
    login({ email, password });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      removeErrors();
    });
    return unsubscribe;
  }, [navigation, removeErrors]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == 'ios' ? 'padding' : null}>
      <StyledView style={styles.view}>
        <AuthSVG style={{ position: 'absolute', top: 0 }} />
        <Text style={styles.header}>{t('common.login')}</Text>
        <StyledInputAuth
          placeholder="Email"
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
        <StyledInputAuth
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="#6c757d"
          onChangeText={setPassword}
          value={password}
          ref={passwordInputRef}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
        />
        <StyledButton onPress={handleLogIn}>
          <StyledButtonText>LOG IN</StyledButtonText>
        </StyledButton>
        <View style={styles.textView}>
          <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.text}>
              Do not have an account? Go to sign up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.text}>Proceed without login</Text>
          </TouchableOpacity>
          {state.errorMessage ? (
            <Text style={styles.textError}>{state.errorMessage}</Text>
          ) : null}
        </View>
      </StyledView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    height: '100%',
  },
  button: {
    backgroundColor: '#415889',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 14,
    overflow: 'hidden',
    textAlign: 'center',
    marginTop: 40,
    fontWeight: '600',
  },
  header: {
    fontSize: 35,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 40,
  },
  textView: {
    marginVertical: 30,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#000',
    alignItems: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  textError: {
    marginTop: 20,
    color: 'darkred',
  },
});
