import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import UserSettingsSVG from '_assets/svg/userSettings.svg';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const UserInfo = React.memo(({ username }) => {
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
})
export default UserInfo;
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

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
};