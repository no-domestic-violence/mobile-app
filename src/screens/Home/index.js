import React, { useContext } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Context as AuthContext } from '../../state/AuthContext';

export default function Home({ navigation }) {
  const { state } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.homeView}>
      <Button
        title={t('HomeScreen.emergency-title')}
        onPress={() =>
          navigation.navigate('SosContactForm', {
            username: state.username,
          })
        }
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
