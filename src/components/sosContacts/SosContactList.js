/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Context as SosContext } from 'state/SosContext';
import { StyledButton, StyledButtonText } from 'styles/shared/StyledButton';

export default function SosContactList() {
  const navigation = useNavigation();
  const {
    getContacts,
    state: { contacts },
  } = useContext(SosContext);
  const isFocused = useIsFocused();

  const hasFirstContact = contacts.length !== 0;
  const hasSecondContact = contacts.length === 2;

  useEffect(() => {
    getContacts();
    navigation.setParams({ id: '' });
  }, [isFocused]);

  return (
    <>
      <View style={styles.contactContainer}>
        <Button
          title={
            hasFirstContact
              ? contacts[0].name
              : 'Please add your trusted contact'
          }
          titleStyle={
            hasFirstContact ? styles.contactText : styles.contactPlaceholder
          }
          type="solid"
          raised
          iconContainerStyle={styles.icon}
          buttonStyle={styles.buttonText}
          onPress={() =>
            navigation.navigate('SosContactForm', {
              id: hasFirstContact && contacts[0]._id,
            })
          }
          icon={<FontAwesomeIcon icon={faPen} />}
        />

        <Button
          titleStyle={
            hasSecondContact ? styles.contactText : styles.contactPlaceholder
          }
          title={
            hasSecondContact
              ? contacts[1].name
              : 'Please add your trusted contact'
          }
          type="solid"
          raised
          iconContainerStyle={styles.icon}
          buttonStyle={styles.buttonText}
          onPress={() =>
            navigation.navigate('SosContactForm', {
              id: hasSecondContact && contacts[1]._id,
            })
          }
          icon={<FontAwesomeIcon icon={faPen} />}></Button>
      </View>
      {contacts.length > 0 && (
        <StyledButton style={styles.messageButtonContainer}>
          <StyledButtonText style={styles.messageButtonText}>
            Ask for help to your contacts
          </StyledButtonText>
        </StyledButton>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactContainer: {
    height: '25%',
    width: '75%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contactText: {
    color: '#000000',
    marginLeft: 10,
    fontWeight: '600',
  },
  contactPlaceholder: {
    color: '#000000',
    opacity: 0.34,
    marginLeft: 10,
    fontWeight: '400',
    fontSize: 16,
  },
  messageButtonContainer: {
    marginTop: 100,
    height: '10%',
    borderRadius: 41,
    backgroundColor: '#D65137',
    justifyContent: 'center',
  },
  messageButtonText: {
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    left: 10,
    fontSize: 14,
    paddingRight: 15,
  },
  buttonText: {
    backgroundColor: '#FEF8E3',
    padding: 18,
    borderRadius: 41,
  },
});
