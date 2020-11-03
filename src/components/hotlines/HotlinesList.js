import React, { useState, useEffect } from 'react';
import appApiClient from '../../api/appApiClient';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Linking,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ListItem from './ListItem';

export default function HotlinesList() {
  const [search, setSearch] = useState('');
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => { getHotlinesData() }),[];

  const makeCall = (phoneNumber) => {
    const iosPhoneNumber = `tel:${phoneNumber}`;
    Linking.openURL(iosPhoneNumber);
  };

  const searchFilterFunction = () => {
    setSearch(search);
  };

  const getHotlinesData = async () => {
  try {
    const response = await appApiClient.get('/hotlines');
    setDataSource([...dataSource, ...response.data]);
  } catch (error) {
    console.error(error);
  }
}

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#c8c8c8',
        }}
      />
    );
  };
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getHotlinesData}
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {/* TODO: how to decode location  */}
      {/* <Text>Current Location</Text> */}
      <TextInput
        style={styles.input}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction('')}
        placeholder="City..."
        value={search}
      />
        <FlatList
          style={styles.list}
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          enableEmptySections={true}
          renderItem={({ item }) => (
            <ListItem item={item} makeCall={makeCall} title={item.phone} />
          )}
          ListFooterComponent={renderFooter}
        />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
    color: 'black',
  },
  text: {
    color: 'black',
    fontFamily: 'Courier',
  },
  input: {
    width: 350,
    height: 55,
    margin: 10,
    padding: 8,
    color: '#000',
    borderRadius: 14,
    borderBottomWidth: 1,
    fontSize: 18,
    fontWeight: '500',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: 'lightgreen',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
});
