import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Context as AuthContext } from '../../state/AuthContext';
import AuthSVG from '_assets/svg/login.svg';
import { StyledView } from '_styles/shared/';
import AuthForm from '_components/authenticationForm/AuthForm';

export default function SignUpScreen({ navigation }) {
  const { state, signup, removeErrors } = useContext(AuthContext);

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
        <AuthForm
          formType="sign up"
          headerForm="Sign Up"
          onSubmit={signup}
          buttonText="sign up"
        />
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text}> Have an account? Go to login</Text>
          </TouchableOpacity>
          {state.errorMessage ? (
            <Text style={styles.errorMessage}>{state.errorMessage}</Text>
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
  text: {
    fontSize: 14,
    color: '#000',
    marginTop: 20,
    fontStyle: 'italic',
  },
  actionsContainer: {
    marginBottom: 60,
  },
  errorMessage: {
    color: 'red',
    marginTop: 20,
  },
});
