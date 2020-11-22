import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../../state/AuthContext';
import { StyledView } from '../../styles/shared/StyledView';
import UserInfo from '_components/user-settings/UserInfo';
import { faTools, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function HowToUse({ navigation }) {
  const { state } = useContext(AuthContext);
  const username = state.username;

  return (
    <StyledView style={styles.userSettingsContainer}>
      <UserInfo username={username} />
      <FontAwesomeIcon
        onPress={() => navigation.goBack()}
        icon={faAngleLeft}
        size={40}
        color={'#000'}
        style={styles.arrow}
      />
      <View style={styles.view}>
        <FontAwesomeIcon
          onPress={() => navigation.goBack()}
          icon={faTools}
          size={50}
          color={'#000'}
        />
        <Text style={styles.header}>Work In Progress...</Text>
      </View>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  userSettingsContainer: {
    alignItems: 'flex-start',
  },
  arrow: {
    alignSelf: 'flex-start',
    marginVertical: 50,
    marginLeft: 10,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 30,
    marginVertical: 40,
  },
});
