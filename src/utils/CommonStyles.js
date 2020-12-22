import {StyleSheet} from 'react-native';
import {moderateScale} from '../constants/ScalingUnit';
import theme from '../theme';

// Text Styles
export const txtStyle = (
  size,
  padding = 0,
  margin = 0,
  family = theme.fontFamily.medium,
  txtColor = theme.colors.textColor,
) =>
  StyleSheet.create({
    txtStyle: {
      fontSize: moderateScale(size),
      padding: moderateScale(padding),
      margin: moderateScale(margin),
      fontFamily: family,
      color: txtColor,
      alignSelf: 'center',
    },
  });

// Image Styles
export const imgStyle = (width, height, radius = 0) =>
  StyleSheet.create({
    imgStyle: {
      width: width,
      height: height,
      borderRadius: moderateScale(radius),
      alignSelf: 'center',
    },
  });

// Button Styles
export const btnStyle = (
  width,
  padding = 15,
  marginTop = 10,
  marginBottom = 10,
) =>
  StyleSheet.create({
    btnStyle: {
      width: moderateScale(width),
      padding: moderateScale(padding),
      marginTop: moderateScale(marginTop),
      marginBottom: moderateScale(marginBottom),
      borderRadius: moderateScale(5),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primaryColor,
    },
  });

//   Button Text Styles
export const btnTxtStyle = (color = theme.colors.whiteColor) =>
  StyleSheet.create({
    btnTxtStyle: {
      color: color,
      fontSize: moderateScale(18),
      textAlign: 'center',
      fontFamily: theme.fontFamily.bold,
    },
  });

//   Input View Container Styles
export const inputTxtStyle = (width) =>
  StyleSheet.create({
    inputTxtStyle: {
      width: width,
      margin: moderateScale(moderateScale(20)),
      borderBottomWidth: moderateScale(1),
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderColor: theme.colors.lightGrayColor,
    },
  });

//   Icon Styles
export const iconStyle = (
  fontSize = 20,
  padding = 10,
  color = theme.colors.grayColor,
) =>
  StyleSheet.create({
    iconStyle: {
      fontSize: moderateScale(fontSize),
      padding: moderateScale(padding),
      color: color,
      alignSelf: 'center',
    },
  });

// Divider Styles
export const dividerStyle = (
  width,
  height = 1,
  top = 0,
  bottom = 0,
  color = theme.colors.lightGrayColor,
) =>
  StyleSheet.create({
    dividerStyle: {
      width: moderateScale(width),
      height: moderateScale(height),
      marginTop: moderateScale(top),
      marginBottom: moderateScale(bottom),
      alignSelf: 'center',
      backgroundColor: color,
    },
  });
