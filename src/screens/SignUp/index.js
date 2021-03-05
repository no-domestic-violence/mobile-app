import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Context as AuthContext } from '_state/AuthContext';
import AuthSVG from '_assets/svg/login.svg';
import { StyledView } from '_styles/shared/';
import AuthForm from 'components/authentication-form/';
import { styles } from './SignUp.styles';

export default function SignUpScreen({ navigation }) {
  const { state, signup, removeErrors } = useContext(AuthContext);

  const handleSignup = async ({ email, password, username }) => {
    await signup({ email, password, username });
    if (state.token) {
      navigation.navigate('User');
    }
  };

  // TODO: find other way to remove messages from BE
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
          formType='sign up'
          headerForm='Sign Up'
          onSubmitForm={handleSignup}
          buttonText='sign up'
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
