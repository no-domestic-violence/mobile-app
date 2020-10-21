import React, {useContext, useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { Context as AuthContext } from "../../state/AuthContext";

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
    marginBottom: 250,
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

export default function SignUpScreen({navigation}) {
  const {state, signup, removeErrors} = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    signup({email, password, username});
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
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        // secureTextEntry
        placeholderTextColor="#6c757d"
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity onPress={() => handleSignUp()}>
        <Text style={styles.button}>Sign Up</Text>
      </TouchableOpacity>
      <Button
        title="Have an account? Go to login"
        onPress={() => navigation.navigate('Login')}
      />
      {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
    </View>
  );
}


