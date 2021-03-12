import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'react-native-elements';

const ControlledTextInput = ({
  name,
  defaultValue = '',
  placeholder,
  autoCapitalize = 'none',
  autoCorrect = false,
  returnKeyType,
  blurOnSubmit,
  placeholderTextColor = '#6c757d',
  control,
  secureTextEntry = false,
  onSubmitEditing,
  inputRef,
  textContentType = 'oneTimeCode',
  style,
  leftIcon,
  leftIconContainerStyle,
  autoCompleteType = 'off',
  keyboardType,
}) => {
  return (
    <>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        onFocus={() => {
          inputRef.current.focus();
        }}
        render={({ onChange, value }) => (
          <Input
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            placeholderTextColor={placeholderTextColor}
            returnKeyType={returnKeyType}
            blurOnSubmit={blurOnSubmit}
            textContentType={textContentType}
            onChangeText={onChange}
            value={value}
            ref={inputRef}
            secureTextEntry={secureTextEntry}
            onSubmitEditing={onSubmitEditing}
            style={style}
            leftIcon={leftIcon}
            leftIconContainerStyle={leftIconContainerStyle}
            autoCompleteType={autoCompleteType}
            keyboardType={keyboardType}
          />
        )}
      />
    </>
  );
};
export default ControlledTextInput;
