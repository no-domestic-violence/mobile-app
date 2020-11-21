import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import UserSettingsSVG from '_assets/svg/userSettings.svg';

export default function UserInfo({ username }) {
  return (
    <View>
      <UserSettingsSVG style={{ position: 'absolute'}} />
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
