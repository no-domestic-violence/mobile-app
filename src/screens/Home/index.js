import React, { useContext, useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Context as AuthContext } from '../../state/AuthContext';
import appApiClient from '../../api/appApiClient';

export default function Home({ navigation, route }) {
  const { state } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [dataSource, setDataSource] = useState([]);

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
        <Text>Show contact details</Text>
      </TouchableOpacity>
      <Text>SOS button is here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
