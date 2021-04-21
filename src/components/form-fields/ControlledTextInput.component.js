import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'react-native-elements';
import styled from 'styled-components/native';

const ErrorText = styled.Text`
  color: red;
  bottom: 10px;
`;

const initialTextInputProps = {
  placeholderTextColor: '#6c757d',
  autoCapitalize: 'none',
  blurOnSubmit: false,
  autoCorrect: false,
  textContentType: 'oneTimeCode',
  autoCompleteType: 'off',
}

const ControlledTextInput = ({
  name,
  defaultValue,
  control,
  returnKeyType,
  onSubmitEditing,
  errors,
  errorStyle,
  inputRef,
  ...props
}) => {
  return (
    <>
      <Controller
        name={name}
        defaultValue={defaultValue || ''}
        control={control}
        onFocus={() => {
          inputRef.current.focus();
        }}
        render={({ onChange, value }) => (
          <Input
            onChangeText={onChange}
            returnKeyType={returnKeyType || 'next'}
            onSubmitEditing={onSubmitEditing}
            value={value}
            ref={inputRef}
            {...props}
            {...initialTextInputProps}
          />
        )}
      />
      <ErrorText errorstyle={errorStyle}>
        {errors[name] ? errors[name].message : ' '}
      </ErrorText>
    </>
  );
};
export default ControlledTextInput;
