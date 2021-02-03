import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import UserInfo from '_components/user-settings/';
import { faTools, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyledView } from '../../styles/shared/StyledView';
import { Context as AuthContext } from '../../state/AuthContext';
import { styles } from './UsageInstructions.styles';

export default function UsageInstructions({ navigation }) {
  const { state } = useContext(AuthContext);
  const {username} = state;

  return (
    <StyledView style={styles.userSettingsContainer}>
      <UserInfo username={username} />
      <FontAwesomeIcon
        onPress={() => navigation.goBack()}
        icon={faAngleLeft}
        size={40}
        color="#000"
        style={styles.arrow}
      />
      <View style={styles.view}>
        <FontAwesomeIcon
          onPress={() => navigation.goBack()}
          icon={faTools}
          size={50}
          color="#000"
        />
        <Text style={styles.header}>Work In Progress...</Text>
      </View>
    </StyledView>
  );
}
