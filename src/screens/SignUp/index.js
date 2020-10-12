import React, {useContext, useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
// import {AuthContext} from '../../context';
import {signup} from '../../api/mock';

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

export default function SignUpScreen({navigation}) {
  // const {signUp} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsername = (e) => {
    console.log(e.target.value);
  };
  const handlePassword = (e) => {
    console.log(e.target.value);
  };
  const handleEmail = (e) => {
    console.log(e.target.value);
  };

  const signUpUser = () => {
    setErrorMessage('');
    signup('test@test.com', 'password')
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((e) => setErrorMessage(e.message));
  };

  return (
    <View  style={styles.view}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        placeholderTextColor="#6c757d"
        onChange={handleUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="#6c757d"
        onChangeText={handlePassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="#6c757d"
        onChangeText={handleEmail}
      />
      <TouchableOpacity onPress={() => signUpUser()}>
          <Text style={styles.button}>Sign Up</Text>
        </TouchableOpacity>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
}


