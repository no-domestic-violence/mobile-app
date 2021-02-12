import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SosContactList from 'components/sosContacts/SosContactList';

import EmergencySVG from '_assets/svg/emergency.svg';
import { useTranslation } from 'react-i18next';
import { StyledView } from 'styles/shared/StyledView';
import { Context as SosContext } from 'state/SosContext';

export default function SosContactHome({ navigation }) {
  const {
    getContacts,
    state: { contacts },
  } = useContext(SosContext);

  useEffect(() => {
    getContacts();
    navigation.setParams({ id: '' });
  }, []);

  const { t } = useTranslation();
  return (
    <>
      <StyledView style={styles.homeView}>
        <EmergencySVG style={styles.svg} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Emergency Contacts</Text>
        </View>
        <SosContactList contacts={contacts} navigation={navigation} />
      </StyledView>
    </>
  );
}
const styles = StyleSheet.create({
  homeView: {
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
  },
  titleContainer: {
    marginTop: 0,
    marginBottom: 120,
  },
});
