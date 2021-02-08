/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import React, { useContext, useEffect } from 'react';
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
import { View, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from 'react-native-elements';
import EmergencySVG from '_assets/svg/emergency.svg';
import { StyledView } from 'styles/shared/StyledView';
import Error from 'components/Error';
import { Context as SosContext } from 'state/SosContext';
import { styles } from './SosContactForm.styles';

const phoneRegExp = /(\(?([\d \-\)\–\+\/\(]+){6,}\)?([ .\-–\/]?)([\d]+))/; // eslint-disable-line
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
    state: { contacts },
    deleteContact,
    addContact,
    editContact,
    getContacts,
  } = useContext(SosContext);
  const { id } = route.params;
  // if there is no id in route.params -> isAddMode
  const isAddMode = !id;
  const foundContact = contacts.find((item) => item._id === id);

  const nameInputRef = React.useRef();
  const phoneInputRef = React.useRef();
  const messageInputRef = React.useRef();

  const { control, handleSubmit, errors, getValues, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isAddMode) {
      setValue('name', foundContact.name);
      setValue('phone', foundContact.phone);
      setValue('message', foundContact.message);
    }
  }, [isAddMode]);

  const saveContact = async () => {
    const data = getValues();
    await addContact(data);
    // need this step since mongodb generates the _id
    await getContacts();
    navigation.navigate('SosContactHome');
  };

  const saveEdit = async () => {
    const data = getValues();
    // insert the contact id into form values object
    data._id = id;
    await editContact({ data, id });
    navigation.navigate('SosContactHome');
  };
  function onSubmit() {
    return isAddMode ? saveContact() : saveEdit();
  }

  const handleRemove = async () => {
    await deleteContact({ id });
    navigation.navigate('SosContactHome');
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
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
              name='name'
              control={control}
              // focuses when there is error
              onFocus={() => {
                nameInputRef.current.focus();
              }}
              defaultValue=''
              render={({ onChange, value }) => (
                <Input
                  placeholder='Name'
                  ref={nameInputRef}
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onSubmitEditing={() =>
                    phoneInputRef.current && phoneInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                  autoCompleteType='off'
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  leftIcon={
                    <FontAwesomeIcon icon={faUser} size={20} color='black' />
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
              name='phone'
              control={control}
              onFocus={() => {
                phoneInputRef.current.focus();
              }}
              defaultValue=''
              render={({ onChange, value }) => (
                <Input
                  placeholder='Phone Number'
                  ref={phoneInputRef}
                  keyboardType='numeric'
                  // RN not supporting 'next' on ios, 'done' does the same thing tho
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  autoCapitalize='none'
                  autoCorrect={false}
                  onSubmitEditing={() =>
                    messageInputRef.current && messageInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                  value={value}
                  autoCompleteType='off'
                  onChangeText={(text) => onChange(text)}
                  leftIcon={
                    <FontAwesomeIcon icon={faPhone} size={20} color='black' />
                  }
                  leftIconContainerStyle={styles.icon}
                />
              )}
            />
            <Error errors={errors.phone} />
            <Controller
              name='message'
              control={control}
              onFocus={() => {
                messageInputRef.current.focus();
              }}
              defaultValue=''
              render={({ onChange, value }) => (
                <Input
                  placeholder='Help Message'
                  ref={messageInputRef}
                  value={value}
                  returnKeyType='done'
                  autoCapitalize='none'
                  autoCorrect={false}
                  autoCompleteType='off'
                  blurOnSubmit={false}
                  onChangeText={(text) => onChange(text)}
                  onSubmitEditing={Keyboard.dismiss}
                  leftIcon={
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      size={20}
                      color='black'
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
                  handleRemove(foundContact._id);
                }}
              />
            )}
            <FontAwesomeIcon
              testID='contact-submit-button'
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

