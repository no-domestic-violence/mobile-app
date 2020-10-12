import React, {useContext, useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
// import {AuthContext} from '../../context';
import {login} from '../../api/mock';

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
    textAlign:'center',
  }
});

export default function LoginScreen({navigation}) {
  // const {logIn} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePassword = (e) => {
    console.log(e.target.value);
  };
  const handleEmail = (e) => {
    console.log(e.target.value);
  };
  const logInUser = () => {
    login('test@test.com', 'password')
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((err) => console.log('error:', err.message));
  };
  return (
    <View style={styles.view}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="#6c757d"
        onChangeText={handleEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="#6c757d"
        onChangeText={handlePassword}
      />
       <TouchableOpacity onPress={() => logInUser()}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
      <Button title="Do not have an account? Go to sign up" onPress={() => navigation.navigate('Sign Up')} />
      <Button
        title="Proceed without login"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
