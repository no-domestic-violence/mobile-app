import React from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={styles.homeView}>
      <Button
        title="Set your emergency message"
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
  }
});