import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { Context as AuthContext } from '../../state/AuthContext';
import appApiClient from '../../api/appApiClient';

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.text}>
      {'\n'}
      Name:
      {item.name}
    </Text>
    <Text style={styles.text}>
      Phone Number:
      {item.phone}
    </Text>
    <Text style={styles.text}>
      Help Message:
      {item.message}
      {'\n'}
    </Text>
  </TouchableOpacity>
);

export default function Home({ navigation, route }) {
  const { state } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [dataSource, setDataSource] = useState([]);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    try {
      const response = await appApiClient.get(
        `/users/${route.params.username}/contacts`,
      );

      setDataSource([...response.data.contacts]);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item._id === selectedId ? '#6e3b6e' : '#f9c2ff';
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
      <Button
        title={t('HomeScreen.emergency-title')}
        onPress={() =>
          navigation.navigate('SosContactForm', {
            username: state.username,
          })
        }
      />
      <TouchableOpacity onPress={getContacts}>
        <Text style={styles.text}>Show contact details</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.list}
        data={dataSource}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
        enableEmptySections
        renderItem={renderItem}
      />

      <Text style={styles.text}>SOS button is here</Text>
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
    color: 'black',
  },
  text: {
    color: 'black',
    fontFamily: 'Courier',
  },
});
