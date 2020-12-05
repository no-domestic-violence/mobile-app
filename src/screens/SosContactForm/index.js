/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import React, { useContext, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faCheck,
  faEnvelope,
  faTrash,
  faUser,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { Input } from 'react-native-elements';
import EmergencySVG from '_assets/svg/emergency.svg';
import { StyledView } from 'styles/shared/StyledView';
import appApiClient from 'api/appApiClient';
import { Context as AuthContext } from 'state/AuthContext';
import Error from 'components/Error';
import { Context as SosContext } from 'state/SosContext';

const phoneRegExp = /(\(?([\d \-\)\–\+\/\(]+){6,}\)?([ .\-–\/]?)([\d]+))/;
const schema = yup.object().shape({
  name: yup.string().required('Please enter a name'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Please enter a phone number'),
  message: yup.string().required('Please enter a message'),
});

export default function SosContactForm({ navigation, route }) {
  const {
    state: { contacts, successMessage },
    deleteContact,
  } = useContext(SosContext);
  const { id } = route.params;
  // if there is no id in route.params -> isAddMode
  const isAddMode = !id;

  const nameInputRef = React.useRef();
  const phoneInputRef = React.useRef();
  const messageInputRef = React.useRef();
  const [contact, setContact] = useState({});

  const { control, handleSubmit, errors, getValues, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  // run getContact on mount -> setContact when foundContact
  useEffect(() => {
    let isMounted = true;
    if (!isAddMode) {
      getContact().then((foundContact) => {
        if (isMounted) {
          // empty object if not foundContact
          setContact(foundContact || {});
          setValue('name', foundContact.name);
          setValue('phone', foundContact.phone);
          setValue('message', foundContact.message);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getContact = async () => {
    const foundContact = await contacts.find(
      (item) => item._id === route.params.id,
    );
    return foundContact;
  };

  function onSubmit() {
    return isAddMode ? saveContact() : saveEdit();
  }

  const saveContact = async () => {
    const username = await AsyncStorage.getItem('username');
    const data = getValues();
    const token = await AsyncStorage.getItem('token');
    await appApiClient
      .patch(`/users/${username}/contacts/`, data, {
        headers: { 'auth-token': token },
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((e) => {
        alert(e);
      });
    navigation.navigate('SosContactHome');
  };

  const saveEdit = async () => {
    const username = await AsyncStorage.getItem('username');
    const data = getValues();
    const token = await AsyncStorage.getItem('token');
    await appApiClient
      .patch(`/users/${username}/contacts/${route.params.id}`, data, {
        headers: { 'auth-token': token },
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((e) => {
        alert(e);
      });
    navigation.navigate('SosContactHome');
  };

  const handleRemove = () => {
    deleteContact({ id });
    alert(successMessage);
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
                  name="name"
                  placeholder="Name"
                  ref={nameInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    phoneInputRef.current && phoneInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                  autoCompleteType="off"
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  leftIcon={
                    <FontAwesomeIcon icon={faUser} size={20} color="black" />
                  }
                  leftIconContainerStyle={styles.icon}
                />
              )}
            />
            <Error errors={errors.name} />
            {/* {errors.name && (
              <Text style={styles.error}>{errors.name.message}</Text>
            )} */}
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
                  onChangeText={(text) => onChange(text)}
                  leftIcon={
                    <FontAwesomeIcon icon={faPhone} size={20} color="black" />
                  }
                  leftIconContainerStyle={styles.icon}
                />
              )}
            />
            <Error errors={errors.phone} />
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
                  onChangeText={(text) => onChange(text)}
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
            <Error errors={errors.message} />
          </View>
          <View style={styles.buttonRow}>
            {!isAddMode && (
              <FontAwesomeIcon
                icon={faTrash}
                size={30}
                onPress={() => {
                  handleRemove(contact._id);
                }}
              />
            )}
            <FontAwesomeIcon
              icon={faCheck}
              size={30}
              raised
              onPress={handleSubmit(onSubmit)}
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
  error: {
    fontSize: 10,
    color: 'red',
  },
});
