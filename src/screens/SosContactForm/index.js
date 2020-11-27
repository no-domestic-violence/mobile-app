import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faCheck,
  faEnvelope,
  faUser,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { Input } from 'react-native-elements';
import EmergencySVG from '_assets/svg/emergency.svg';
import { StyledView } from 'styles/shared/StyledView';

import appApiClient from 'api/appApiClient';
import { Context as AuthContext } from 'state/AuthContext';

const schema = yup.object().shape({
  name: yup.string().required('Please enter a name'),
  phone: yup
    .number()
    .min(3, ({ min }) => `Phone Number must be at least ${min} characters`)
    .required('Please enter a phone number'),
  message: yup.string().required('Please enter a message'),
});

export default function SosContactForm({ navigation }) {
  const nameInputRef = React.useRef();
  const phoneInputRef = React.useRef();
  const messageInputRef = React.useRef();

  const { state } = useContext(AuthContext);

  const { control, handleSubmit, errors, getValues } = useForm({
    resolver: yupResolver(schema),
  });

  // const [contact, setContact] = useState(initialContactState);

  const saveContact = async () => {
    const data = getValues();
    await appApiClient
      .patch(`/users/${state.username}/contacts`, data)
      .then((response) => {
        alert(response.data);
      })
      .catch((e) => {
        alert(e);
      });
    navigation.navigate('SosContactHome');
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : null}>
        <StyledView style={styles.homeView}>
          <EmergencySVG style={styles.svg} />
          <View style={styles.container}>
            <FontAwesomeIcon
              icon={faTimes}
              size={20}
              raised
              style={{ marginLeft: 'auto' }}
              onPress={() => {
                navigation.navigate('SosContactHome');
              }}
            />
            <Controller
              name="name"
              control={control}
              // focuses when there is error
              onFocus={() => {
                nameInputRef.current.focus();
              }}
              defaultValue=""
              render={({ onChange, value }) => (
                <Input
                  placeholder="Name"
                  ref={nameInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    phoneInputRef.current && phoneInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                  autoCompleteType="off"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  leftIcon={
                    <FontAwesomeIcon icon={faUser} size={20} color="black" />
                  }
                  leftIconContainerStyle={styles.icon}
                />
              )}
            />
            {errors.name && (
              <Text style={{ fontSize: 10, color: 'red' }}>
                {errors.name.message}
              </Text>
            )}
            <Controller
              name="phone"
              control={control}
              onFocus={() => {
                phoneInputRef.current.focus();
              }}
              defaultValue=""
              render={({ onChange, value }) => (
                <Input
                  placeholder="Phone Number"
                  ref={phoneInputRef}
                  keyboardType="numeric"
                  // RN not supporting 'next' on ios, 'done' does the same thing tho
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  onSubmitEditing={() =>
                    messageInputRef.current && messageInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                  value={value}
                  autoCompleteType="off"
                  onChangeText={(value) => onChange(value)}
                  leftIcon={
                    <FontAwesomeIcon icon={faPhone} size={20} color="black" />
                  }
                  leftIconContainerStyle={styles.icon}
                />
              )}
            />
            {errors.phone && (
              <Text style={{ fontSize: 10, color: 'red' }}>
                {errors.phone.message}
              </Text>
            )}
            <Controller
              name="message"
              control={control}
              onFocus={() => {
                messageInputRef.current.focus();
              }}
              defaultValue=""
              render={({ onChange, value }) => (
                <Input
                  placeholder="Help Message"
                  ref={messageInputRef}
                  value={value}
                  returnKeyType="done"
                  autoCompleteType="off"
                  blurOnSubmit={false}
                  onChangeText={(value) => onChange(value)}
                  onSubmitEditing={Keyboard.dismiss}
                  leftIcon={
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      size={20}
                      color="black"
                    />
                  }
                  leftIconContainerStyle={styles.icon}
                />
              )}
            />
            {errors.message && (
              <Text style={{ fontSize: 10, color: 'red' }}>
                {errors.message.message}
              </Text>
            )}
          </View>
          <View style={styles.buttonRow}>
            <FontAwesomeIcon
              icon={faCheck}
              size={30}
              containerStyle={styles.iconContainer}
              raised
              onPress={handleSubmit(saveContact)}
            />
          </View>
        </StyledView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  homeView: {
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#FEF8E3',
    width: '80%',
    height: '40%',
    borderRadius: 48,
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 30,
    paddingRight: 30,
  },
  icon: {
    paddingRight: 15,
  },
  iconContainer: {
    backgroundColor: '#FECE1F',
    borderRadius: 50,
    padding: 30,
    textAlign: 'center',
  },
  svg: {
    position: 'absolute',
  },
  buttonRow: {
    paddingTop: 80,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '60%',
  },
});
