import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {moderateScale} from '../../../constants/ScalingUnit';
import theme from '../../../theme';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  headerImgStyle: {
    width: width,
    height: moderateScale(200),
    marginTop: moderateScale(-3),
  },
  descTextStyle: {
    width: '80%',
    fontSize: moderateScale(13),
    alignSelf: 'center',
    // textAlign: 'center',
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.lightBlackColor,
  },
  buttonStyle: {
    width: width / 1.25,
    alignSelf: 'center',
    marginTop: moderateScale(15),
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
