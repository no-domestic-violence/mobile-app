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

export default function UserSettings() {
  const {state} = useContext(AuthContext);
  const handleSignOut = () => {
    //TODO: create signout action
    console.log('signout!');
  };
  return (
    <View>
      <Text>Here is an info about user</Text>
      {!state.token ? (
        <Text>Sign in please</Text>
      ) : (
        <TouchableOpacity onPress={() => handleSignOut()}>
          <Text style={styles.button}>Sign Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
