import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import appApiClient from '../../api/appApiClient';

import { Context as AuthContext } from '../../state/AuthContext';

export default function SosContactEdit({ navigation, route }) {
  const [contact, setContact] = useState({});
  const { state } = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    getContact();
  }, [isFocused]);

  // find the selected contact and add it in contact state
  const getContact = async () => {
    try {
      const response = await appApiClient.get(
        `/users/${state.username}/contacts/`,
      );

      const foundContact = response.data.contacts.find(
        (item) => item._id === route.params.id,
      );
      setContact(foundContact);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (name) => {
    setContact({ ...contact, name });
  };

  const handleNumberChange = (phone) => {
    setContact({ ...contact, phone });
  };

  const handleMessageChange = (message) => {
    setContact({ ...contact, message });
  };

  const saveEdit = () => {
    const data = {
      name: contact.name,
      phone: contact.phone,
      message: contact.message,
    };
    appApiClient
      .patch(`/users/${state.username}/contacts/${route.params.id}`, data)
      .then((response) => {
        alert(response.data);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const handleRemove = async (id) => {
    appApiClient
      .delete(`/users/${state.username}/contacts`, {
        params: { id },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <>
      <TouchableOpacity style={styles.list}>
        <Text style={styles.text}>
          {'\n'}
          Name:
        </Text>
        <TextInput
          style={styles.text}
          value={contact.name}
          onChangeText={handleNameChange}
        />
        <Text style={styles.text}>Phone Number:</Text>
        <TextInput
          style={styles.text}
          value={contact.phone}
          onChangeText={handleNumberChange}
        />
        <Text style={styles.text}>Help Message:</Text>
        <TextInput
          style={styles.text}
          value={contact.message}
          onChangeText={handleMessageChange}
        />
        <Text style={styles.text}>{'\n'}</Text>
        <FontAwesomeIcon
          icon={faTrash}
          onPress={() => {
            handleRemove(contact._id);
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={saveEdit}>
        <Text style={styles.buttonLabel}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonLabel}>Cancel</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    padding: 10,
  },
  text: {
    color: 'black',
    fontFamily: 'Courier',
    padding: 3,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
  },
});
