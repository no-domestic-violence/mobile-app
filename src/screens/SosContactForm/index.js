import React, { useState, useContext } from 'react';

import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import EmergencySVG from '_assets/svg/emergency.svg';
import { StyledView } from '../../styles/shared/StyledView';

import appApiClient from '../../api/appApiClient';
import { Context as AuthContext } from '../../state/AuthContext';

export default function SosContactForm({ navigation }) {
  const { state } = useContext(AuthContext);

  const initialContactState = {
    name: '',
    phone: '',
    message: '',
  };
  const [contact, setContact] = useState(initialContactState);

  const handleNameChange = (name) => {
    setContact({ ...contact, name });
  };

  const handleNumberChange = (phone) => {
    setContact({ ...contact, phone });
  };

  const handleMessageChange = (message) => {
    setContact({ ...contact, message });
  };

  const saveContact = () => {
    const data = {
      name: contact.name,
      phone: contact.phone,
      message: contact.message,
    };
    appApiClient
      .patch(`/users/${state.username}/contacts`, data)
      .then((response) => {
        alert(response.data);
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <StyledView style={styles.homeView}>
        <EmergencySVG style={styles.svg} />
        <View style={styles.container}>
          <Icon
            name="times"
            size={20}
            raised
            onPress={() => {
              navigation.navigate('SosContactHome');
            }}
          />
          <Input
            placeholder="Name"
            value={contact.name}
            autoCompleteType="off"
            onChangeText={handleNameChange}
            leftIcon={<Icon name="user" size={20} color="black" />}
            leftIconContainerStyle={styles.icon}
          />
          <Input
            placeholder="Phone Number"
            value={contact.phone}
            autoCompleteType="off"
            onChangeText={handleNumberChange}
            leftIcon={<Icon name="phone" size={20} color="black" />}
            leftIconContainerStyle={styles.icon}
          />
          <Input
            placeholder="Help Message"
            value={contact.message}
            autoCompleteType="off"
            onChangeText={handleMessageChange}
            leftIcon={<Icon name="envelope" size={20} color="black" />}
            leftIconContainerStyle={styles.icon}
          />
        </View>
        <View style={styles.buttonRow}>
          <Icon
            name="check"
            size={30}
            containerStyle={styles.iconContainer}
            raised
            onPress={() => {
              saveContact(navigation);
              navigation.navigate('SosContactHome');
            }}
          />
        </View>
      </StyledView>
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
