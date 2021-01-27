import React, { useContext, useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { Context as AuthContext } from '_state/AuthContext';
import UserInfo from '_components/user-settings/';
import { StyledView } from '_styles/shared/';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AuthForm from '_components/authenticationForm/';
import { styles } from './ChangePassword.styles';
import ModalComponent from '_components/modal';

export default function ChangePasswordScreen({ navigation }) {
  const { state, changePassword, removeErrors, removeMessages } = useContext(
    AuthContext,
  );
  const { username } = state;

  const [isModalVisible, setModalVisible] = useState(false);
  const handleChangePassword = ({ email, password, oldPassword }) => {
    changePassword({ email, password, oldPassword });
  };

  useEffect(() => {
    state.successMessage && setModalVisible(true);
    const unsubscribe = navigation.addListener('blur', () => {
      removeErrors();
      removeMessages();
    });

    return unsubscribe;
  }, [navigation, removeErrors, removeMessages]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == 'ios' ? 'padding' : null}>
      <StyledView style={styles.userSettingsContainer}>
        <UserInfo username={username} />
        <View style={styles.view}>
          <FontAwesomeIcon
            onPress={() => navigation.goBack()}
            icon={faAngleLeft}
            size={40}
            color={'#000'}
            style={styles.arrow}
          />
          <AuthForm
            formType="change password"
            headerForm="Change Password"
            onSubmitForm={handleChangePassword}
            buttonText="confirm"
          />
          {state.errorMessage && !state.successMessage ? (
            <Text style={styles.textError}>{state.errorMessage}</Text>
          ) : null}
          <View style={{ flex: 1 }}>
            <ModalComponent
              isVisible={isModalVisible}
              setModalVisible={setModalVisible}
              navigation={navigation}
            />
          </View>
        </View>
      </StyledView>
    </KeyboardAvoidingView>
  );
}

