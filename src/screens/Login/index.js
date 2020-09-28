import React from 'react';
import {View, Text, Button} from 'react-native';

export default function LoginScreen({navigation}) {
  return (
    <View>
      <Text>Login screen is here</Text>
      <Button
        title="Without login"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
