import React from 'react';
import {moderateScale} from '../constants/ScalingUnit';

export default theme = {
  colors: {
    primaryColor: '#ed1c24',
    textColor: '#40405A',
    grayColor: '#676767',
    lightGrayColor: '#707070',
    startGColor: '#545454',
    whiteColor: '#ffffff',
    blackColor: '#000000',
    lightBlackColor: '#545454',
  },
  fontFamily: {
    regular: 'Ubuntu-Regular',
    medium: 'Ubuntu-Medium',
    bold: 'Ubuntu-Bold',
  },
  fontSizes: {
    xxbig: moderateScale(34),
    xbig: moderateScale(26),
    big: moderateScale(22),
    xxmedium: moderateScale(19),
    xmedium: moderateScale(17),
    medium: moderateScale(15),
    small: moderateScale(13),
    verySmall: moderateScale(11),
    tinySmall: moderateScale(9),
  },
};
