import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserSettingsSVG from '_assets/svg/userSettings.svg';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function UserInfo({ username }) {
  return (
    <View>
      <UserSettingsSVG style={{ position: 'absolute' }} />
      <View style={styles.userInfo}>
        <FontAwesomeIcon
          icon={faUserCircle}
          size={80}
          color={'grey'}
          style={styles.arrow}
        />
        <Text style={styles.username}>{username}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  username: {
    textTransform: 'capitalize',
    fontSize: 28,
    marginLeft: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
});
