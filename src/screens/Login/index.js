import React from 'react';
import {View, Text, Button} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LoginScreen({navigation}) {
  const {t, i18n} = useTranslation();

  return (
    <View>
      <Text>{t('common.login')}</Text>
      <Button
        title="Without login"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
