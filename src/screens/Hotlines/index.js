import React, { useState, useEffect, useRef } from 'react';
import { getHotlinesData } from '../../api/';
import { View, FlatList, Linking, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SearchBar } from 'react-native-elements';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import HotlinesItem from '_components/hotlines/';
import { StyledView } from '_styles/shared/StyledView';
import { Colors } from '_styles/';
import useDebounce from '_hooks/useDebounce';
import { styles } from './Hotlines.styles';

export default function HotlinesList() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const inputRef = useRef();

  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    setLoading(true);
    getHotlinesData(setDataSource, setLoading, search, inputRef);
  }, [debouncedValue]);

  const makeCall = (phoneNumber) => {
    const iosPhoneNumber = `tel:${phoneNumber}`;
    Linking.openURL(iosPhoneNumber);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={Colors.darkBlue} />
      </View>
    );
  }
  return (
    <StyledView style={styles.container}>
      <SearchBar
        ref={inputRef}
        searchIcon={<FontAwesomeIcon icon={faSearch} size={20} />}
        clearIcon={{ name: 'times', type: 'font-awesome' }}
        inputStyle={{ backgroundColor: Colors.primary, width: '70%' }}
        inputContainerStyle={{ backgroundColor: Colors.primary, width: '90%' }}
        containerStyle={{ backgroundColor: Colors.primary, borderTopWidth: 0 }}
        autoCorrect={false}
        autoCapitalize='none'
        onChangeText={setSearch}
        placeholder='Type city or orgaisation name'
        value={search}
      />
      <Divider style={{ height: 10, backgroundColor: Colors.primary }} />
      <FlatList
        style={styles.list}
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        enableEmptySections={true}
        renderItem={({ item }) => (
          <HotlinesItem item={item} makeCall={makeCall} title={item.phone} />
        )}
      />
    </StyledView>
  );
}
