import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../../context';

export default function LoginScreen({navigation}) {
  const {logIn} = useContext(AuthContext);

  return (
    <View>
      <Text>Login screen is here!!</Text>
      <Button
        title="Without login"
        onPress={() => navigation.navigate('Home')}
      />
      <Button title="Login" onPress={() => logIn()} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Sign Up')} />
    </View>
  );
}
