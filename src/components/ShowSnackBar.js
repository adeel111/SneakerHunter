import React from 'react';
import Snackbar from 'react-native-snackbar';
import theme from '../theme';

const ShowSnackBar = (
  text,
  bgColor = theme.colors.primaryColor,
  duration = Snackbar.LENGTH_SHORT,
) => {
  Snackbar.show({
    text: text,
    backgroundColor: bgColor,
    duration: duration,
  });
};

export default ShowSnackBar;
