import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import UserInfo from '_components/user-settings/';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyledView } from '../../styles/shared/StyledView';
import { Context as AuthContext } from '../../state/AuthContext';
import {
  StyledButton,
  StyledButtonText,
} from '../../styles/shared/StyledButton';
import { styles } from './DeleteAccount.styles';

export default function DeleteAccountScreen({ navigation }) {
  const { state, deleteAccount } = useContext(AuthContext);
  const {username} = state;

  const handleDeleteAccount = () => {
    deleteAccount({ username });
  };
  return (
    <StyledView style={styles.userSettingsContainer}>
      <UserInfo username={username} />
      <View style={styles.view}>
        <FontAwesomeIcon
          onPress={() => navigation.goBack()}
          icon={faAngleLeft}
          size={40}
          color="#000"
          style={styles.arrow}
        />
        <Text style={styles.header}>Delete Account</Text>
        <Text style={styles.text}>
          Are you certain you want to delete your account?
        </Text>
        <StyledButton onPress={() => handleDeleteAccount()}>
          <StyledButtonText style={styles.button}>
            Delete Account
          </StyledButtonText>
        </StyledButton>
      </View>
    </StyledView>
  );
}
