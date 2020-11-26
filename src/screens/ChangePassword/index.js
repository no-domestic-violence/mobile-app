import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Context as AuthContext } from '../../state/AuthContext';
import UserInfo from '_components/user-settings/UserInfo';
import {
  StyledButton,
  StyledButtonText,
} from '../../styles/shared/StyledButton';
import { StyledInputAuth } from '../../styles/shared/StyledInputAuth';
import { StyledView } from '../../styles/shared/StyledView';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function ChangePasswordScreen({ navigation }) {
  const { state, changePassword, removeErrors, removeMessages } = useContext(
    AuthContext,
  );
  const { username } = state;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const emailInputRef = React.useRef();
  const oldPasswordInputRef = React.useRef();
  const newPasswordInputRef = React.useRef();

  const handleChangePassword = ({ navigation }) => {
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
          <Text style={styles.header}>Change Password</Text>
          <StyledInputAuth
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="#6c757d"
            onChangeText={setEmail}
            value={email}
            ref={emailInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              oldPasswordInputRef.current && oldPasswordInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
          <StyledInputAuth
            placeholder="Your old password"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#6c757d"
            onChangeText={setOldPassword}
            value={oldPassword}
            ref={oldPasswordInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              newPasswordInputRef.current && newPasswordInputRef.current.focus()
            }
            blurOnSubmit={false}
            // secureTextEntry={true} TODO: fix secure password
          />
          <StyledInputAuth
            placeholder="New Password"
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor="#6c757d"
            onChangeText={setPassword}
            value={password}
            ref={newPasswordInputRef}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            // secureTextEntry={true}
          />
          <StyledButton onPress={() => handleChangePassword()}>
            <StyledButtonText>confirm</StyledButtonText>
          </StyledButton>
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
  header: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 40,
    marginTop: 40,
  },
  text: {
    fontSize: 14,
    color: '#000',
    marginTop: 20,
    marginBottom: 80,
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
