/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-native-elements';
import { StyledButton, StyledButtonText } from 'styles/shared/StyledButton';
import PropTypes from 'prop-types';

export default function SosContactList({ contacts, navigation }) {
  const hasFirstContact = contacts !== undefined && contacts.length !== 0;
  const hasSecondContact = contacts !== undefined && contacts.length === 2;
  const contactPlaceholder = 'Please add your trusted contact';

  return (
    <>
      <View style={styles.contactContainer}>
        <Button
          testID='first-contact'
          title={hasFirstContact ? contacts[0].name : contactPlaceholder}
          titleStyle={
            hasFirstContact ? styles.contactText : styles.contactPlaceholder
          }
          type='solid'
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
          testID='second-contact'
          titleStyle={
            hasSecondContact ? styles.contactText : styles.contactPlaceholder
          }
          title={hasSecondContact ? contacts[1].name : contactPlaceholder}
          type='solid'
          raised
          iconContainerStyle={styles.icon}
          buttonStyle={styles.buttonText}
          onPress={() =>
            navigation.navigate('SosContactForm', {
              id: hasSecondContact && contacts[1]._id,
            })
          }
          icon={<FontAwesomeIcon icon={faPen} />}
        />
      </View>
      {contacts !== undefined && contacts.length > 0 && (
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

SosContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
      message: PropTypes.string,
    })
  ),
};

SosContactList.defaultProps = {
  contacts: [{ name: '', phone: '', message: '' }],
};
