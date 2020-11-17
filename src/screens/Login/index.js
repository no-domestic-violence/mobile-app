import React, { useContext, useState, useEffect } from 'react';
import { Context as AuthContext } from '../../state/AuthContext';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../styles'
import { useTranslation } from 'react-i18next';

export default function LoginScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const { state, login, removeErrors } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = () => {
    login({ email, password });
  };

  //TODO: reuse it
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      removeErrors();
    });

    return unsubscribe;
  }, [navigation, removeErrors]);

  return (
    <View style={styles.view}>
      <Text style={styles.header}>{t('common.login')}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="#6c757d"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="#6c757d"
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity onPress={handleLogIn}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
      <View style={styles.text}>
        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
          <Text>Do not have an account? Go to sign up</Text>
        </TouchableOpacity>
        <Text>or</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Proceed without login</Text>
        </TouchableOpacity>
        {state.errorMessage ? (
          <Text style={styles.textError}>{state.errorMessage}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#fff',
    margin: 10,
    padding: 8,
    color: '#000',
    borderRadius: 5,
    fontSize: 18,
    fontWeight: '500',
  },
  view: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  text: {
    fontSize: 14,
    color: '#000',
    marginTop: 20,
    marginBottom: 80,
    alignItems: 'center',
  },
  textError: {
    marginTop: 20,
    color: 'darkred',
  },
});
