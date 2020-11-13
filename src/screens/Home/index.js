import React, { useContext } from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SosContactList from 'components/sosContacts/SosContactList';
import { Context as AuthContext } from '../../state/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Home({ navigation }) {
  const { state } = useContext(AuthContext);
  const { t } = useTranslation();
  return (
    <>
      <View style={styles.homeView}>
        <SosContactList />
        <Button
          title={t('HomeScreen.emergency-title')}
          onPress={() => navigation.navigate('SosContactForm')}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('SosContactEdit')}
          style={styles.button}>
          <Text style={styles.buttonLabel}>Edit Contacts</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
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
