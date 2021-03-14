import React from 'react';
import { Text } from 'react-native';

const Error = ({ errors, name, style }) => {
  return (
    <>
      <Text style={style}>{errors[name] ? errors[name].message : ' '}</Text>
    </>
  );
};

export default Error;
