import React, { useContext, useState, useEffect } from 'react';
import { Context as AuthContext } from '../../state/AuthContext';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#fff',
    margin: 10,
    padding: 8,
    color: '#000',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#009688',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 20,
    overflow: 'hidden',
    textAlign: 'center',
  },
});

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
      <Text>{t('common.login')}</Text>
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
      <Button
        title="Do not have an account? Go to sign up"
        onPress={() => navigation.navigate('Sign Up')}
      />
      <Button
        title="Proceed without login"
        onPress={() => navigation.navigate('Home')}
      />
      {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
    </View>
  );
}
