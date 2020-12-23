import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {moderateScale} from '../../../constants/ScalingUnit';
import theme from '../../../theme';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  forgotTextStyle: {
    fontSize: moderateScale(13),
    alignSelf: 'flex-end',
    marginTop: -5,
    marginRight: moderateScale(30),
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.lightBlackColor,
  },
  headerImgStyle: {
    width: width,
    height: moderateScale(200),
    marginTop: moderateScale(-3),
  },
  buttonStyle: {
    width: width / 1.25,
    alignSelf: 'center',
    marginTop: moderateScale(15),
    marginBottom: moderateScale(20),
  },
  buttonText: {
    fontSize: 18,
    margin: moderateScale(13),
    textAlign: 'center',
    color: theme.colors.whiteColor,
    backgroundColor: 'transparent',
    fontFamily: theme.fontFamily.medium,
  },
  bottomTextStyle: {
    fontSize: moderateScale(13),
    alignSelf: 'center',
    marginTop: -5,
    alignSelf: 'center',
    marginBottom: moderateScale(20),
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.lightBlackColor,
  },
});

export default styles;
