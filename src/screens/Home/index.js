import React, { useContext } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Context as AuthContext } from '../../state/AuthContext';

export default function Home({ navigation, route }) {
  const { state } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  //console.log(route.params.username);
  console.log(state.token);
  console.log(state.username);

  return (
    <View style={styles.homeView}>
      <Text>hello, {route.params}! </Text>
      <Button
        title={t('HomeScreen.emergency-title')}
        onPress={() =>
          navigation.navigate('SosContactForm', {
            username: state.username,
            text: 'test',
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
