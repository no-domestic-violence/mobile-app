/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */

import React from 'react';
import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-native-elements';
import { StyledButton, StyledButtonText } from 'styles/shared/StyledButton';
import PropTypes from 'prop-types';
import { styles } from './SosContactList.styles';

export default function SosContactList({ contacts, navigation }) {
  const hasFirstContact = contacts !== undefined && contacts.length !== 0;
  const hasSecondContact = contacts !== undefined && contacts.length === 2;
  const contactPlaceholder = 'Please add your trusted contact';

  return (
    <>
      <View style={styles.contactContainer}>
        <Button
          title={hasFirstContact ? contacts[0].name : contactPlaceholder}
          titleStyle={
            hasFirstContact ? styles.contactText : styles.contactPlaceholder
          }
          type='solid'
          raised
          iconContainerStyle={styles.icon}
          buttonStyle={styles.buttonText}
          onPress={() =>
            navigation.navigate('CreateContact', {
              id: hasFirstContact ? contacts[0]._id : null,
            })
          }
          icon={<FontAwesomeIcon icon={faPen} />}
        />
        <Button
          titleStyle={
            hasSecondContact ? styles.contactText : styles.contactPlaceholder
          }
          title={hasSecondContact ? contacts[1].name : contactPlaceholder}
          type='solid'
          raised
          iconContainerStyle={styles.icon}
          buttonStyle={styles.buttonText}
          onPress={() =>
            navigation.navigate('CreateContact', {
              id: hasSecondContact ? contacts[1]._id : null,
            })
          }
          icon={<FontAwesomeIcon icon={faPen} />}
        />
      </View>
      {contacts !== undefined && contacts.length > 0 && (
        <StyledButton
          style={styles.messageButtonContainer}
          testID='send-sms-button'>
          {/* eslint-disable-next-line react-native/no-raw-text */}
          <StyledButtonText style={styles.messageButtonText}>
            Ask for help to your contacts
          </StyledButtonText>
        </StyledButton>
      )}
    </>
  );
}

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
