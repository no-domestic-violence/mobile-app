import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'state/';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StyledView } from 'styles/shared/';
import { ErrorMessageText } from 'components/error-message-text';
import { useTranslation } from 'react-i18next';
import AuthSVG from 'assets/svg/login.svg';
import { AuthForm } from 'components/authentication-form/';
import { styles } from './Login.styles';

export default function LoginScreen({ navigation }) {
  const { t } = useTranslation();
  const { state, login, removeErrors } = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    await login({ email, password });
    if (state.token) {
      navigation.navigate('User');
    }
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
          headerForm='log in'
          onSubmitForm={handleLogin}
          buttonText='log in'
          testID='logIn'
          navigation={navigation}
        />
        <View style={styles.textView}>
          <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.text}>
              Do not have an account? Go to sign up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BottomTabNavigator', {
                screen: 'Home',
              })
            }>
            <Text style={styles.text}>Proceed without login</Text>
          </TouchableOpacity>
          {/* //TODO: fix messages from BE validatiton */}
          <ErrorMessageText errorMessage={state.errorMessage} />
        </View>
      </StyledView>
    </KeyboardAvoidingView>
  );
}
