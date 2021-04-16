/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import { ControlledTextInput } from 'components/form-fields';
import { useFormContext } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Keyboard, Platform } from 'react-native';
import { styles } from './index';

const SosFormFields = () => {
  const { control, errors } = useFormContext();
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const messageInputRef = useRef();

  const isPhoneFocused = phoneInputRef.current && phoneInputRef.current.focus();
  const isMessageFocused =
    messageInputRef.current && messageInputRef.current.focus();

  return (
    <>
      <ControlledTextInput
        name='name'
        control={control}
        defaultValue=''
        onSubmitEditing={isPhoneFocused}
        returnKeyType='next'
        inputRef={nameInputRef}
        leftIcon={<FontAwesomeIcon icon={faUser} size={20} color='black' />}
        leftIconContainerStyle={styles.icon}
        placeholder='Name'
        errors={errors}
        errorStyle={styles.error}
      />
      <ControlledTextInput
        name='phone'
        placeholder='Phone Number'
        control={control}
        defaultValue=''
        onSubmitEditing={isMessageFocused}
        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
        keyboardType='numeric'
        inputRef={phoneInputRef}
        leftIcon={<FontAwesomeIcon icon={faPhone} size={20} color='black' />}
        leftIconContainerStyle={styles.icon}
        errors={errors}
        errorStyle={styles.error}
      />
      <ControlledTextInput
        name='message'
        control={control}
        placeholder='Help Message'
        inputRef={messageInputRef}
        returnKeyType='done'
        onSubmitEditing={Keyboard.dismiss}
        leftIcon={<FontAwesomeIcon icon={faEnvelope} size={20} color='black' />}
        leftIconContainerStyle={styles.icon}
        errors={errors}
        errorStyle={styles.error}
      />
    </>
  );
};

export default SosFormFields;
