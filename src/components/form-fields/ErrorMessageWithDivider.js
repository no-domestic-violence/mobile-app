import React from 'react';
import { Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { Colors } from 'styles/';

const ErrorMessageWithDivider = ({ errors, name }) => {
  return (
    <>
      <Text style={{ color: 'red' }}>
        {errors[name] ? errors[name].message : ' '}
      </Text>
      <Divider style={{ height: 20, backgroundColor: Colors.primary }} />
    </>
  );
};

export default ErrorMessageWithDivider;
