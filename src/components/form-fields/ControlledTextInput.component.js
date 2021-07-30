import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'react-native-elements';
import styled from 'styled-components/native';
import { Bar } from 'react-native-progress';
import zxcvbn from 'zxcvbn';

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
  formType,
  watchPassword,
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
            {...props}
            {...initialTextInputProps}
          />
        )}
      />
      <ErrorText errorstyle={errorStyle}>
        {errors[name] ? errors[name].message : ' '}
      </ErrorText>
      {formType === 'sign up' && name === 'password' ? (
        <Bar
          progress={
            watchPassword && watchPassword.length > 0
              ? zxcvbn(watchPassword).score / 4
              : 0
          }
          width={400}
        />
      ) : null}
    </>
  );
};
export default ControlledTextInput;
