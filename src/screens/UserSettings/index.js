import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Context as AuthContext} from '../../state/AuthContext';

const styles = StyleSheet.create({
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

export default function UserSettings({navigation}) {
  const {state, signout} = useContext(AuthContext);
  const {username} = state
  const handleSignOut = () => {
    signout()
  };
  return (
    <View>
      <Text>Hello {username}</Text>
      {!state.token ? (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.button}>Sign in</Text>
      </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleSignOut()}>
          <Text style={styles.button}>Sign Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
