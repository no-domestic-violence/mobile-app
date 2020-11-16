import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Context as AuthContext } from '../../state/AuthContext';

export default function SignUpScreen({ navigation }) {
  const { state, signup, removeErrors } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    signup({ email, password, username });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      removeErrors();
    });

    return unsubscribe;
  }, [navigation, removeErrors]);

  //TODO: refactor togerther with login
  return (
    <View style={styles.view}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#6c757d"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor="#6c757d"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        // secureTextEntry={true} TODO: fix it
        autoCapitalize="none"
        autoCorrect={false}
        // secureTextEntry
        placeholderTextColor="#6c757d"
        onChangeText={setPassword}
        value={password}
      />
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => handleSignUp()}>
          <Text style={styles.button}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text}> Have an account? Go to login</Text>
        </TouchableOpacity>
        {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
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
    backgroundColor: '#cadeee',
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
    marginBottom: 40
  },
  text: {
    fontSize: 14,
    color: '#000',
    marginTop: 20,
  },
  actionsContainer: {
    marginBottom: 70
  }
});
