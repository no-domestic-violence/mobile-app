import React, { useState, useEffect, useRef } from 'react';
import appApiClient from '../../api/appApiClient';
import {
  View,
  StyleSheet,
  FlatList,
  Linking,
  ActivityIndicator,
} from 'react-native';
import ListItem from './ListItem';
import { SearchBar } from 'react-native-elements';
export default function HotlinesList() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    setLoading(true);
    getHotlinesData();
  }, [search]);

  const makeCall = (phoneNumber) => {
    const iosPhoneNumber = `tel:${phoneNumber}`;
    Linking.openURL(iosPhoneNumber);
  };

  const getHotlinesData = async () => {
    try {
      const response = await appApiClient.get(`/hotlines`, {
        params: { searchTerm: search },
      });
      setDataSource([...response.data]);
      setLoading(false);
      inputRef.current.focus();
    } catch (error) {
      console.error(error);
    }
  };

  const ItemSeparatorView = () => {
    return <View style={styles.itemSeparator} />;
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <>
      {/* TODO: how to decode location  */}
      {/* <Text>Current Location</Text> */}
      <SearchBar
        ref={inputRef}
        inputStyle={{ backgroundColor: 'white' }}
        inputContainerStyle={{ backgroundColor: 'white' }}
        containerStyle={{ backgroundColor: 'white' }}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={setSearch}
        placeholder="Type city or name"
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontFamily: 'Courier',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemSeparator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#c8c8c8',
  },
});
