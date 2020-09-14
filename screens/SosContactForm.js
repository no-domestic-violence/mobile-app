import React from 'react';
import {View, Button, StyleSheet, Text, TextInput} from 'react-native';

export default function SosContactForm({navigation}) {
  return (
    <View style={styles.formView}>
      <Text>Here is the form</Text>
      <TextInput style={styles.formInput} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  formView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
