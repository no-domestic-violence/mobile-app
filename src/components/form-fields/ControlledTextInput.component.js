import React from 'react';
import { Controller } from 'react-hook-form';
import { Text } from 'react-native';
import { Divider, Input } from 'react-native-elements';
import { Colors } from 'styles/';

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
  errors,
  secureTextEntry = false,
  onSubmitEditing,
  inputRef,
  textContentType = 'oneTimeCode',
  style,
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
          />
        )}
      />
      <Divider style={{ height: 5 }} />
      {errors[name] && (
        <Text style={{ color: 'red' }}>{errors[name].message}</Text>
      )}
      <Divider style={{ height: 20, backgroundColor: Colors.primary }} />
    </>
  );
};
export default ControlledTextInput;
