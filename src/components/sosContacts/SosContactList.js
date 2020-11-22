/* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button, Icon } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Context as AuthContext } from '_state/AuthContext';
import appApiClient from '_api/appApiClient';

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
      <Button
        title={
          dataSource.length !== 0
            ? dataSource[0].name
            : 'Please add your trusted contact'
        }
        titleStyle={{ color: '#000000' }}
        type="solid"
        raised
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonText}
        iconContainerStyle={{ position: 'absolute', left: 10 }}
        onPress={
          dataSource.length !== 0
            ? () =>
                navigation.navigate('SosContactEdit', {
                  id: dataSource[0]._id,
                })
            : () => navigation.navigate('SosContactForm')
        }
        icon={<FontAwesomeIcon icon={faPen} />}></Button>

      <Button
        titleStyle={{ color: '#000000' }}
        title={
          dataSource.length !== 0 && dataSource.length !== 1
            ? dataSource[1].name
            : 'Please add your trusted contact'
        }
        type="solid"
        raised
        containerStyle={styles.buttonContainer}
        iconContainerStyle={{ position: 'absolute', left: 10, fontSize: 14 }}
        buttonStyle={styles.buttonText}
        onPress={
          dataSource.length !== 0 && dataSource.length !== 1
            ? () =>
                navigation.navigate('SosContactEdit', {
                  id: dataSource[1]._id,
                })
            : () => navigation.navigate('SosContactForm')
        }
        icon={<FontAwesomeIcon icon={faPen} />}></Button>

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
  buttonContainer: {
    width: '80%',
    backgroundColor: '#FEF8E3',
    borderRadius: 50,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonText: {
    backgroundColor: '#FEF8E3',
    padding: 18,
  },
});
