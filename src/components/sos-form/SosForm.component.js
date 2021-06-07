/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import { ControlledTextInput } from 'components/form-fields';
import { useFormContext } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faEnvelope,
  faUser,
  faPhone,
  faTrash,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Keyboard, Platform, View } from 'react-native';
import { styles } from './index';

const SosForm = ({ onRemove, onSubmit, goBack, isAddMode }) => {
  const { errors } = useFormContext();
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const messageInputRef = useRef();

  const isPhoneFocused = phoneInputRef.current && phoneInputRef.current.focus();
  const isMessageFocused =
    messageInputRef.current && messageInputRef.current.focus();

  return (
    <>
      <View style={styles.container}>
        <FontAwesomeIcon
          icon={faTimes}
          size={20}
          raised
          style={{ marginLeft: 'auto' }}
          onPress={goBack}
          testID='go-back-button'
        />
        <ControlledTextInput
          name='name'
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
          placeholder='Help Message'
          inputRef={messageInputRef}
          returnKeyType='done'
          onSubmitEditing={Keyboard.dismiss}
          leftIcon={
            <FontAwesomeIcon icon={faEnvelope} size={20} color='black' />
          }
          leftIconContainerStyle={styles.icon}
          errors={errors}
          errorStyle={styles.error}
        />
      </View>
      <View style={styles.buttonRow}>
        {!isAddMode && (
          <FontAwesomeIcon
            testID='contact-delete-button'
            icon={faTrash}
            size={30}
            onPress={onRemove}
          />
        )}
        <FontAwesomeIcon
          testID='contact-submit-button'
          icon={faCheck}
          size={30}
          raised
          onPress={onSubmit}
        />
      </View>
    </>
  );
};

export default SosForm;
