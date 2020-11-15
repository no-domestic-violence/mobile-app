import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SosContactList from 'components/sosContacts/SosContactList';
import { useTranslation } from 'react-i18next';
import { Context as AuthContext } from '../../state/AuthContext';

export default function SosContactHome() {
  const { state } = useContext(AuthContext);
  const { t } = useTranslation();
  return (
    <>
      <View style={styles.homeView}>
        <Text>Please add your emergency contacts</Text>
        <SosContactList />
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
