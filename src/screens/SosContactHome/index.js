import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import SosContactList from 'components/sosContactList';

import EmergencySVG from '_assets/svg/emergency.svg';
import { ErrorMessageText } from 'components/error-message-text';
import { StyledView } from 'styles/shared/StyledView';
import { SosContext } from 'state';
import { styles } from './SosContactHome.styles';

export default function SosContactHome({ navigation }) {
  const { getContacts, state } = useContext(SosContext);

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StyledView style={styles.homeView}>
        <EmergencySVG style={styles.svg} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Emergency Contacts</Text>
        </View>
        <SosContactList contacts={state.contacts} navigation={navigation} />
        <ErrorMessageText errorMessage={state.errorMessage} />
      </StyledView>
    </>
  );
}
