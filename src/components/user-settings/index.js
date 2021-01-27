import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import UserSettingsSVG from '_assets/svg/userSettings.svg';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { styles } from './UserInfo.styles';

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
});
export default UserInfo;

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
};
