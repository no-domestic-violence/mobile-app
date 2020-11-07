import React, { useContext } from 'react';
import { Button } from 'react-native';
import SosContactList from '_components/sosContacts/SosContactsList';
import { Context as AuthContext } from '../../state/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Home({ navigation }) {
  const { state } = useContext(AuthContext);
  const { t } = useTranslation();
  return (
    <>
      <SosContactList />
      <Button
        title={t('HomeScreen.emergency-title')}
        onPress={() => navigation.navigate('SosContactForm')}
      />
    </>
  );
}
