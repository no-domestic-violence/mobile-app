/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Context as AuthContext } from '_state/AuthContext';
import appApiClient from '_api/appApiClient';
import { StyledButton, StyledButtonText } from 'styles/shared/StyledButton';

export default function SosContactList() {
  const navigation = useNavigation();
  const { state } = useContext(AuthContext);

  const [dataSource, setDataSource] = useState([]);
  const isFocused = useIsFocused();

  const hasFirstContact = dataSource.length !== 0;
  const hasSecondContact = dataSource.length === 2;

  useEffect(() => {
    getContacts();
    navigation.setParams({ id: '' });
  }, [isFocused]);

  const getContacts = async () => {
    try {
      const response = await appApiClient.get(
        `/users/${state.username}/contacts`,
      );
      setDataSource([...response.data.contacts]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View style={styles.contactContainer}>
        <Button
          title={
            hasFirstContact
              ? dataSource[0].name
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
              id: hasFirstContact && dataSource[0]._id,
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
              ? dataSource[1].name
              : 'Please add your trusted contact'
          }
          type="solid"
          raised
          iconContainerStyle={styles.icon}
          buttonStyle={styles.buttonText}
          onPress={() =>
            navigation.navigate('SosContactForm', {
              id: hasSecondContact && dataSource[1]._id,
            })
          }
          icon={<FontAwesomeIcon icon={faPen} />}></Button>
      </View>
      {dataSource.length > 0 && (
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
