import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Context as AuthContext } from '_state/AuthContext';
import UserInfo from '_components/user-settings/UserInfo';
import { StyledView } from '_styles/shared/';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AuthForm from '_components/authenticationForm/AuthForm';

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
            <Modal isVisible={isModalVisible}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.modalContainer}>
                  <Text style={styles.textSuccess}>
                    Your password was successfully changed!
                  </Text>
                  <Button
                    title="Ok"
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('User');
                    }}
                  />
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </StyledView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  userSettingsContainer: {
    alignItems: 'flex-start',
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  arrow: {
    alignSelf: 'flex-start',
    marginTop: 50,
    marginLeft: 10,
  },
  textError: {
    marginTop: 20,
    color: 'darkred',
  },
  textSuccess: {
    color: 'darkgreen',
  },
  modalContainer: {
    backgroundColor: '#f9fafb',
    width: '80%',
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
