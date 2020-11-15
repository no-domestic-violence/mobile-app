import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Avatar } from "react-native-elements";
import {Context as AuthContext} from '../../state/AuthContext';



export default function UserSettings({ navigation }) {
  const { state, signout } = useContext(AuthContext);
  const { username } = state;
  const handleSignOut = () => {
    signout();
  };
  return (
    <View style={styles.userSettingsContainer}>
      <View style={styles.userInfo}>
        <Avatar
          size="large"
          rounded
          icon={{ name: 'user', color: 'white', type: 'font-awesome' }}
          activeOpacity={0.7}
          containerStyle={{
            backgroundColor: 'grey',
            textTransform: 'capitalize',
          }}
        />
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.userSettingsActionsView}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.userSettingsActions}>how to use</Text>
        </TouchableOpacity>
        {state.token ? (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Change Password')}>
              <Text style={styles.userSettingsActions}>change password</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.userSettingsActions}>change languige</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Delete Account')}>
              <Text style={styles.userSettingsActions}>delete account</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
      {!state.token ? (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.button}>Sign in</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => handleSignOut()}>
          <Text style={styles.button}>log out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#cadeee',
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 0,
    borderRadius: 14,
    color: '#000',
    fontWeight: "500",
    fontSize: 20,
    overflow: 'hidden',
    textAlign: 'center',
    width: "40%",
  },
  username: {
    textTransform: "capitalize",
    fontSize: 28,
    marginLeft: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: 'center'
  },
  userSettingsContainer: {
    padding: 10,
    marginHorizontal: 10
  }, 
  userSettingsActions: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 40
  },
  userSettingsActionsView: {
    marginVertical: 50
  }
});