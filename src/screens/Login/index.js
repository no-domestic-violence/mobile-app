import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '_state/AuthContext';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StyledView } from '_styles/shared/';

import { useTranslation } from 'react-i18next';
import AuthSVG from '_assets/svg/login.svg';
import AuthForm from '_components/authenticationForm/';
import { styles } from './Login.styles';

export default function LoginScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const { state, login, removeErrors } = useContext(AuthContext);

  const handleLogin = ({ email, password }) => {
    login({ email, password });
  };
  // : TODO: handle errors removing from BE
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      removeErrors();
    });
    return unsubscribe;
  }, [navigation, removeErrors]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <StyledView style={styles.view}>
        <AuthSVG style={{ position: 'absolute', top: 0 }} />
        <AuthForm
          formType='log in'
          headerForm={t('common.login')}
          onSubmitForm={handleLogin}
          buttonText='log in'
        />
        <View style={styles.textView}>
          <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.text}>
              Do not have an account? Go to sign up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.text}>Proceed without login</Text>
          </TouchableOpacity>
          {/* //TODO: fix messages from BE validatiton */}
          {state.errorMessage ? (
            <Text style={styles.textError}>{state.errorMessage}</Text>
          ) : null}
        </View>
      </StyledView>
    </KeyboardAvoidingView>
  );
}
