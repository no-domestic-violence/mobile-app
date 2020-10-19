import React from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

export default function Home({navigation}) {
  const {t, i18n} = useTranslation();

  return (
    <View style={styles.homeView}>
      <Button
        title={t('HomeScreen.emergency-title')}
        onPress={() => navigation.navigate('SosContactForm')}
      />
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
