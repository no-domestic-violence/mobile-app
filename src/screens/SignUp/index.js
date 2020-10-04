import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../../context';
export default function SignUpScreen({navigation}) {
  const {signUp} = useContext(AuthContext);
  return (
    <View>
      <Text>Registration screen is here!!</Text>
      <Button title="Sign Up" onPress={() => signUp()} />
    </View>
  );
}
