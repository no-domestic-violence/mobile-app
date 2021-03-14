import React from 'react';
import styled from 'styled-components/native';

const ErrorText = styled.Text`
  color: red;
  bottom: 10;
`;

const Error = ({ errors, name, style }) => {
  return (
    <>
      <ErrorText style={style}>
        {errors[name] ? errors[name].message : ' '}
      </ErrorText>
    </>
  );
};

export default Error;
