import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const ErrorText = styled.Text`
  font-size: 10px;
  color: red;
`;

export default function Error({ errors }) {
  return <ErrorText>{errors ? errors.message : ' '}</ErrorText>;
}

Error.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string),
};

Error.defaultProps = {
  errors: '',
};
