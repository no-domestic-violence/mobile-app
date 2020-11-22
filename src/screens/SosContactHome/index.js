import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SosContactList from 'components/sosContacts/SosContactList';

import EmergencySVG from '_assets/svg/emergency.svg';
import { useTranslation } from 'react-i18next';
import { Context as AuthContext } from 'state/AuthContext';
import { StyledView } from 'styles/shared/StyledView';

export default function SosContactHome() {
  const { state } = useContext(AuthContext);
  const { t } = useTranslation();
  return (
    <>
      <StyledView style={styles.homeView}>
        <EmergencySVG style={styles.svg} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Emergency Contacts</Text>
        </View>
        <SosContactList />
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
