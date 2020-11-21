import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from '../../state/AuthContext';
import { Colors } from '../../styles';
import { StyledView } from '../../styles/shared/StyledView';
import UserInfo from '_components/user-settings/UserInfo';

export default function UserSettings({ navigation }) {
  const { state, signout } = useContext(AuthContext);
  const { username } = state;
  const handleSignOut = () => {
    signout();
  };
  return (
    <StyledView style={styles.userSettingsContainer}>
      <UserInfo username={username} />
      <View style={styles.userSettingsActionsView}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.userSettingsActions}>how to use</Text>
        </TouchableOpacity>
        {state.token ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('Change Password')}>
              <Text style={styles.userSettingsActions}>change password</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.userSettingsActions}>change language</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Delete Account')}>
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
    </StyledView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 0,
    borderRadius: 14,
    color: '#000',
    fontWeight: '500',
    fontSize: 20,
    overflow: 'hidden',
    textAlign: 'center',
    width: '40%',
    marginLeft: 10,
  },
  userSettingsContainer: {
    alignItems: 'flex-start',
  },
  userSettingsActions: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 40,
  },
  userSettingsActionsView: {
    marginVertical: 50,
    marginLeft: 10,
  },
});
