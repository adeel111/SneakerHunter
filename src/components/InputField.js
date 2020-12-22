import React from 'react';
import {TextInput, Platform} from 'react-native';
import {PropTypes} from 'prop-types';
import theme from '../theme';
import {moderateScale} from '../constants/ScalingUnit';

const InputField = ({
  placeholder,
  inputType,
  capitalize,
  value,
  onChangeText,
  secure = false,
  editable = true,
}) => {
  return (
    <TextInput
      autoCorrect={false}
      style={{
        width: '90%',
        height: 45,
        color: theme.colors.textColor,
        fontFamily: theme.fontFamily.regular,
        // backgroundColor: 'red',
      }}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.lightGrayColor}
      secureTextEntry={secure}
      keyboardType={inputType}
      fontSize={moderateScale(15)}
      autoCapitalize={capitalize}
      value={value}
      editable={editable}
      onChangeText={onChangeText}
      paddingLeft={15}
    />
  );
};

InputField.propTypes = {
  placeholder: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  capitalize: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default InputField;
