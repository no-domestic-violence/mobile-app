import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import appApiClient from '../../api/appApiClient';

import { Context as AuthContext } from '../../state/AuthContext';
import ContactEditView from '../../components/sosContacts/ContactEditView';

export default function SosContactEdit() {
  const { state } = useContext(AuthContext);
  return (
    <>
      <ContactEditView />
    </>
  );
}
