import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Context as AuthContext } from '../../state/AuthContext';

export default function SignUpScreen({ navigation }) {
  const { state, deleteAccount } = useContext(AuthContext);
  const username = state.username;

  const handleDeleteAccount = () => {
    deleteAccount({ username });
  };
  return (
    <View style={styles.view}>
      <Text style={styles.header}>Delete Account</Text>
      <Text style={styles.text}>
        Are you sure that you want to delete account??
      </Text>
      <TouchableOpacity onPress={() => handleDeleteAccount()}>
        <Text style={styles.button}>Delete Account</Text>
      </TouchableOpacity>
      {state.errorMessage ? (
        <Text style={styles.textError}>{state.errorMessage}</Text>
      ) : null}
      {state.successMessage ? (
        <Text style={styles.textSuccess}>{state.successMessage}</Text>
      ) : null}
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
    backgroundColor: 'red',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
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
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  textError: {
    marginTop: 20,
    color: 'darkred',
  },
  textSuccess: {
    marginTop: 20,
    color: 'darkgreen',
  },
});
