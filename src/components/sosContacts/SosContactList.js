import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { useIsFocused } from '@react-navigation/native';
import { Context as AuthContext } from '../../state/AuthContext';
import appApiClient from '../../api/appApiClient';

export default function SosContactList({ navigation, route }) {
  const { state } = useContext(AuthContext);

  const [dataSource, setDataSource] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const isFocused = useIsFocused();
  // TODO: remember why i need to use isFocused
  const [isEditable, setEditable] = useState(false);
  const [prevState, setPrevState] = useState([]);
  const [copyOfState, setCopyOfState] = useState([]);

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

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.listItem, style]}>
      <Text style={styles.text}>
        {'\n'}
        {item.name}
      </Text>
      <FontAwesomeIcon icon={faEnvelope} />
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    const backgroundColor = item._id === selectedId ? '#F9A121' : '#f9c2ff';
    return (
      <Item
        item={item}
        /* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
        onPress={() => setSelectedId(item._id)}
        style={{ backgroundColor }}
      />
    );
  };
  return (
    <View style={styles.homeView}>
      <Text>Emergency Contact List</Text>
      <FlatList
        style={styles.list}
        data={dataSource}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
        enableEmptySections
        renderItem={renderItem}
      />
    </View>
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
