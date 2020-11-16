import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native';
import Modal from 'react-native-modal';
import { Context as AuthContext } from '../../state/AuthContext';

export default function SignUpScreen({ navigation }) {
  const { state, changePassword, removeErrors, removeMessages } = useContext(
    AuthContext,
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  
  const handleChangePassword = () => {
    changePassword({ email, password, oldPassword });
  };
  useEffect(() => {
    state.successMessage && setModalVisible(true)
    const unsubscribe = navigation.addListener('blur', () => {
      removeErrors();
      removeMessages();
    });

    return unsubscribe;
  }, [navigation, removeErrors, removeMessages]);

  return (
    <View style={styles.view}>
      <Text style={styles.header}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor="#6c757d"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Your old password"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#6c757d"
        onChangeText={setOldPassword}
        value={oldPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor="#6c757d"
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity onPress={() => handleChangePassword()}>
        <Text style={styles.button}>Submit Change</Text>
      </TouchableOpacity>
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
              <Button title="Ok" onPress={() => {
                setModalVisible(false)
                navigation.navigate('User')
                }} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#fff',
    margin: 10,
    padding: 8,
    color: '#000',
    borderRadius: 5,
    fontSize: 18,
    fontWeight: '500',
  },
  view: {
    backgroundColor: '#cadeee',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    backgroundColor: '#415889',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 14,
    overflow: 'hidden',
    textAlign: 'center',
    marginTop: 40,
    fontWeight: '600',
  },
  header: {
    fontSize: 35,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 40,
    marginTop: 40
  },
  text: {
    fontSize: 14,
    color: '#000',
    marginTop: 20,
    marginBottom: 80
  },
  textError: {
    marginTop: 20,
    color: 'darkred'
  },
  textSuccess: {
    color: 'darkgreen'
  },
  modalContainer: {
    backgroundColor:"#f9fafb",
    width:"80%",
    borderRadius: 5,
    alignContent: "center",
    justifyContent: "center",
    padding: 20,
  }
});
