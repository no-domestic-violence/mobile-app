import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Context as AuthContext } from '../../state/AuthContext';

export default function SignUpScreen({ navigation }) {
  const { state, changePassword, removeErrors, removeMessages } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const handleChangePassword = () => {
    changePassword({ email, password, oldPassword });
  };
  
  //TODO: how to clean errors and messages

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      removeErrors();
      removeMessages();
    });

    return unsubscribe;
  }, [navigation, removeErrors, removeMessages, state]);

  return (
    <View style={styles.view}>
      <Text style={styles.header}>Change Password</Text>
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
        placeholder="Your old password"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#6c757d"
        onChangeText={setOldPassword}
        value={oldPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor="#6c757d"
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity onPress={() => handleChangePassword()}>
        <Text style={styles.button}>Submit Change</Text>
      </TouchableOpacity>
      {state.errorMessage ? <Text style={styles.textError} >{state.errorMessage}</Text> : null}
      {state.successMessage ? <Text style={styles.textSuccess} >{state.successMessage}</Text> : null}
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
    justifyContent: 'center',
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
    marginBottom: 80
  },
  textError: {
    marginTop: 20,
    color: 'darkred'
  },
  textSuccess: {
    marginTop: 20,
    color: 'darkgreen'
  },


});
