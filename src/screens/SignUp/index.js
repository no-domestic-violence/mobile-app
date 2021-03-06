import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ErrorMessageText } from 'components/error-message-text';
import { AuthContext } from 'state/';
import AuthSVG from 'assets/svg/login.svg';
import { StyledView } from 'styles/shared/';
import { AuthForm } from 'components/authentication-form/';
import { styles } from './SignUp.styles';

export default function SignUpScreen({ navigation }) {
  const { state, loginSignup, removeErrors } = useContext(AuthContext);

  const handleSignup = async ({ email, password, username }) => {
    await loginSignup({ email, password, username });
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
          testID='signUp'
        />
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text}> Have an account? Go to login</Text>
          </TouchableOpacity>
          <ErrorMessageText errorMessage={state.errorMessage} />
        </View>
      </StyledView>
    </KeyboardAvoidingView>
  );
}
