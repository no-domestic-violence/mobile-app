import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Divider, SearchBar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { LocationContext } from 'state/';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import HotlinesItem from 'components/hotlines/';
import { StyledView } from 'styles/shared/StyledView';
import { Colors } from 'styles/';
import useDebounce from 'hooks/useDebounce';
import { makeCall } from '../../utils';
import { styles } from './Hotlines.styles';

const HotlinesList = () => {
  const {
    state: { hotlinesData },
    searchHotlinesByParam,
  } = useContext(LocationContext);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    setLoading(true);
    searchHotlinesByParam(search);
    setLoading(false);
    inputRef.current.focus();
  }, [debouncedValue]);

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
        placeholder='Type city or organisation name'
        value={search}
      />
      <Divider style={{ height: 10, backgroundColor: Colors.primary }} />
      <FlatList
        testID='hotlinesFlatList'
        style={styles.list}
        data={hotlinesData}
        keyExtractor={(item, index) => index.toString()}
        enableEmptySections
        renderItem={({ item }) => (
          <HotlinesItem
            testID='hotlinesItem'
            item={item}
            makeCall={makeCall}
            title={item.phone}
          />
        )}
      />
    </StyledView>
  );
}


export default HotlinesList; 