import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { Context as AuthContext } from '../../state/AuthContext';
import appApiClient from '../../api/appApiClient';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

export default function SosContactList({ navigation, route }) {
  const { state } = useContext(AuthContext);

  const [dataSource, setDataSource] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const isFocused = useIsFocused();
  // TODO: remember why i need to use isFocused
  const [isEditable, setEditable] = useState(false);
  const [prevState, setPrevState] = useState([]);
  const [copyOfState, setCopyOfState] = useState([]);

  const handleEditButton = () => {
    setEditable(true);
  };

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
      setPrevState([...dataSource]);
      setCopyOfState([...dataSource]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = () => {
    appApiClient
      .delete(`/users/${state.username}/delete`, {
        params: { id: selectedId },
      })
      .then((response) => {
        console.log(response.data);
        console.log(selectedId);
      })
      .catch((e) => {
        alert(e);
      });
    // get updated contacts
    getContacts();
  };

  const saveEdit = () => {
    setDataSource([...copyOfState]);
    setPrevState([...copyOfState]);
    setEditable(false);

    console.log(dataSource);
  };

  const handleCancelEdit = () => {
    setEditable(false);

    setDataSource([...prevState]);
    console.log(dataSource);
  };
  // const update = (text, i) => {
  //   const copyOfState = [...dataSource];
  //   copyOfState[i].value = text;
  //   setDataSource(copyOfState);
  // };

  // const handleNameChange = (index, name) => {
  //   const copyOfState = [...dataSource];
  //   copyOfState[index] = { ...copyOfState[index], name };
  //   setDataSource(copyOfState);
  // };

  const handleInputChange = (index, inputName, inputValue) => {
    copyOfState[index] = { ...copyOfState[index], [inputName]: inputValue };
    setCopyOfState([...copyOfState]);
    console.log(copyOfState);
  };

  const Item = ({
    item,
    onPress,
    style,
    onChangeName,
    onChangePhone,
    onChangeMessage,
  }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.text}>
        {'\n'}
        Name:
      </Text>
      <TextInput
        style={styles.text}
        value={item.name}
        editable={isEditable}
        onChangeText={onChangeName}
      />
      <Text style={styles.text}>Phone Number:</Text>
      <TextInput
        style={styles.text}
        value={item.phone}
        editable={isEditable}
        onChangeText={onChangePhone}
      />
      <Text style={styles.text}>Help Message:</Text>
      <TextInput
        style={styles.text}
        value={item.message}
        editable={isEditable}
        onChangeText={onChangeMessage}
      />
      <Text style={styles.text}>{'\n'}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => {
    const backgroundColor = item._id === selectedId ? '#F9A121' : '#f9c2ff';

    // firstContact.name = 'Soyoon';

    // console.log(firstContact);
    // console.log(copiedState);

    // console.log(copiedState[0].name);
    // const handleChange = () => {
    //   const items = [...dataSource];
    //   console.log(items);
    //   const item1 = { ...dataSource[0] };
    // };
    // console.log(newNames);

    // toggleEditable state
    // const handleNameChange = (name) => {
    //   console.log(name);
    //   const id = '5fa625dfd6fd1ecbce9f1714';
    //   const updatedList = dataSource.map((item) => {
    //     if (item._id === id) {
    //       console.log(item);
    //       return { ...item, name };
    //     }
    //     return item;
    //   });
    //   console.log(updatedList);
    //   setDataSource({ updatedList });

    // };

    const enableEdit = () => {
      switch (isEditable) {
        case false:
          return (
            <>
              <Button title="Edit" onPress={handleEditButton} />
              <Button title="Delete" onPress={deleteContact} />
            </>
          );
        case true:
          return (
            <>
              <Button title="Cancel" onPress={handleCancelEdit} />
              <Button title="Save" onPress={saveEdit} />
            </>
          );
        default:
          return (
            <>
              <Button title="Edit" onPress={handleEditButton} />
              <Button title="Delete" onPress={deleteContact} />
            </>
          );
      }
    };
    return (
      <>
        <Item
          item={item}
          /* eslint no-underscore-dangle: ['error', { 'allow': ['_id'] }] */
          onPress={() => setSelectedId(item._id)}
          style={{ backgroundColor }}
          onChangeName={(value) => handleInputChange(index, 'name', value)}
          onChangePhone={(value) => handleInputChange(index, 'phone', value)}
          onChangeMessage={(value) =>
            handleInputChange(index, 'message', value)
          }
        />
        {item._id === selectedId && enableEdit()}
      </>
    );
  };

  return (
    <View style={styles.homeView}>
      <Text>Emergency Contact List</Text>
      {/* <TextInput
        value={item1.name}
        onChangeText={(newName) => setDataSource([newName])}
      /> */}
      <FlatList
        style={styles.list}
        data={isEditable ? copyOfState : dataSource}
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
    color: 'black',
  },
  text: {
    color: 'black',
    fontFamily: 'Courier',
    padding: 3,
  },
});
