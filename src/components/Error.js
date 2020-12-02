import React from 'react';
import styled from 'styled-components';

const ErrorText = styled.Text`
  font-size: 10;
  color: red;
`;

export default function Error({ errors }) {
  return <ErrorText>{errors ? errors.message : ' '}</ErrorText>;
}
