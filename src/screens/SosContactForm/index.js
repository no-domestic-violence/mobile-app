import React, { useState, useContext, useParams } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import appApiClient from '../../api/appApiClient';
import { Context as AuthContext } from '../../state/AuthContext';

export default function EmergencyScreen({ navigation, route }) {
  const { state } = useContext(AuthContext);
  console.log(route);
  console.log(route.params);

  const initialContactState = {
    name: '',
    phone: '',
    message: '',
  };
  const [contact, setContact] = useState(initialContactState);
  const [submitted, setSubmitted] = useState(false);

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
      'contact_1.name': contact.name,
      'contact_1.phone': contact.phone,
      'contact_1.message': contact.message,
    };
    appApiClient
      .patch(`/users/${route.params.username}/contacts`, data)
      .then((response) => {
        // setContact({
        //   name: response.data.name,
        //   phone: response.data.phone,
        //   message: response.data.message,
        // });
        setSubmitted(true);
        alert(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const newContact = () => {
    setContact(initialContactState);
    setSubmitted(false);
  };

  return (
    //TODO: add form validation
    //TODO: implement send SMS button
    <View style={styles.view}>
      {submitted ? (
        <>
          <Text>Emergency Contact was successfully added!</Text>
          <TouchableOpacity>
            <Text style={styles.button} onPress={newContact}>
              Add another contact
            </Text>
          </TouchableOpacity>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </>
      ) : (
        <>
          <Text>Add Emergency Contact</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#6c757d"
            onChangeText={handleNameChange}
            value={contact.name}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#6c757d"
            onChangeText={handleNumberChange}
            value={contact.number}
          />
          <TextInput
            style={styles.input}
            placeholder="Write custom emergency message"
            placeholderTextColor="#6c757d"
            onChangeText={handleMessageChange}
            value={contact.message}
          />
          <TouchableOpacity>
            <Text style={styles.button} onPress={saveContact}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.button} onPress={newContact}>
              Add a second contact
            </Text>
          </TouchableOpacity>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#fff',
    margin: 10,
    padding: 8,
    color: '#000',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#009688',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 20,
    overflow: 'hidden',
    textAlign: 'center',
  },
});
