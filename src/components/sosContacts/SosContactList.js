/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Context as AuthContext } from '../../state/AuthContext';
import appApiClient from '../../api/appApiClient';

export default function SosContactList() {
  const navigation = useNavigation();
  const { state } = useContext(AuthContext);

  const [dataSource, setDataSource] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getContacts();
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
      <TouchableOpacity>
        <Text style={styles.text}>
          {dataSource.length !== 0 ? dataSource[0].name : 'add contact'}
        </Text>
        <FontAwesomeIcon
          icon={faPen}
          onPress={
            dataSource.length !== 0
              ? () =>
                  navigation.navigate('SosContactEdit', {
                    id: dataSource[0]._id,
                  })
              : () => navigation.navigate('SosContactForm')
          }
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.text}>
          {dataSource.length !== 0 && dataSource.length !== 1
            ? dataSource[1].name
            : 'add contact'}
        </Text>
        <FontAwesomeIcon
          icon={faPen}
          onPress={
            dataSource.length !== 0 && dataSource.length !== 1
              ? () =>
                  navigation.navigate('SosContactEdit', {
                    id: dataSource[1]._id,
                  })
              : () => navigation.navigate('SosContactForm')
          }
        />
      </TouchableOpacity>
      <Button title="Send emergency text" />
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
  listItem: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderColor: 'grey',
    borderBottomWidth: 1,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
