import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import SosContactList from 'components/sosContacts/SosContactList';

import EmergencySVG from '_assets/svg/emergency.svg';
import { StyledView } from 'styles/shared/StyledView';
import { Context as SosContext } from 'state/SosContext';
import { styles } from './SosContactHome.styles';

export default function SosContactHome({ navigation }) {
  const {
    getContacts,
    state: { contacts },
  } = useContext(SosContext);

  useEffect(() => {
    getContacts();
    navigation.setParams({ id: '' });
  }, []);

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

