import React, { useContext, useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from 'state/';
import UserInfo from 'components/user-info/';
import { StyledView } from 'styles/shared/';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { AuthForm } from 'components/authentication-form/';
import ModalComponent from 'components/modal';
import { styles } from './ChangePassword.styles';

export default function ChangePasswordScreen({ navigation }) {
  const { state, changePassword, removeErrors, removeMessages } = useContext(
    AuthContext
  );
  const { username } = state;

  const [isModalVisible, setModalVisible] = useState(false);
  const handleChangePassword = ({ email, oldPassword, password }) => {
    changePassword({ email, oldPassword, password });
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
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <StyledView style={styles.userSettingsContainer}>
        <UserInfo username={username} />
        <View style={styles.view}>
          <FontAwesomeIcon
            onPress={() => navigation.goBack()}
            icon={faAngleLeft}
            size={40}
            color='#000'
            style={styles.arrow}
          />
          <AuthForm
            formType='change password'
            headerForm='Change Password'
            onSubmitForm={handleChangePassword}
            buttonText='confirm'
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
