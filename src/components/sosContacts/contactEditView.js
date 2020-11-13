import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import { Context as AuthContext } from '../../state/AuthContext';
import appApiClient from '../../api/appApiClient';

export default function ContactEditView() {
  const { state } = useContext(AuthContext);
  const [dataSource, setDataSource] = useState([]);
  const [prevState, setPrevState] = useState([]);
  const [copyOfState, setCopyOfState] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getContacts();
    console.log('useEffect fired');
    console.log(dataSource);
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
    // manage dataSource state
    const newSource = dataSource.filter((item) => item._id !== id);
    setDataSource(newSource);
    console.log(dataSource);
  };

  const renderItem = ({ item, index }) => {
    return (
      <Item
        item={item}
        /* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
        onRemove={handleRemove}
      />
    );
  };

  const Item = ({ item, onRemove }) => (
    <>
      <TouchableOpacity style={styles.list}>
        <Text style={styles.text}>
          {'\n'}
          Name:
        </Text>
        <TextInput style={styles.text} value={item.name} />
        <Text style={styles.text}>Phone Number:</Text>
        <TextInput style={styles.text} value={item.phone} />
        <Text style={styles.text}>Help Message:</Text>
        <TextInput style={styles.text} value={item.message} />
        <Text style={styles.text}>{'\n'}</Text>
        <FontAwesomeIcon
          icon={faTrash}
          onPress={() => {
            onRemove(item._id);
          }}
        />
      </TouchableOpacity>
    </>
  );

  //   const handleInputChange = (index, inputName, inputValue) => {
  //     copyOfState[index] = { ...copyOfState[index], [inputName]: inputValue };
  //     setCopyOfState([...copyOfState]);
  //   };

  //   const toggleDone = () => {
  //     setDataSource([...copyOfState]);
  //     setPrevState([...copyOfState]);
  //   };

  //   const toggleCancel = () => {
  //     setDataSource([...prevState]);
  //   };

  return (
    <FlatList
      style={styles.list}
      data={dataSource}
      keyExtractor={(item) => item._id}
      enableEmptySections
      renderItem={renderItem}
      onRemove={handleRemove}
    />
  );
  // <List data={dataSource} onRemove={handleRemove} />;
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
