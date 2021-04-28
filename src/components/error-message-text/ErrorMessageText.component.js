import React from 'react';
import { Text } from 'react-native';
import { styles } from './ErrorMessageText.styles';

const ErrorMessageText = (error) => {
  return (
    <Text style={styles.errorMessage}>
      {error.errorMessage ? error.errorMessage : ' '}
    </Text>
  );
};

export default ErrorMessageText;
