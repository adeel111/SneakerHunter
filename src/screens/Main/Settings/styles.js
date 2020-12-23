import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {moderateScale} from '../../../constants/ScalingUnit';
import theme from '../../../theme';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.whiteColor,
  },
  headerCard: {
    width: width,
    elevation: 0,
    shadowOpacity: 0,
    margin: 0,
    padding: 0,
    alignSelf: 'center',
  },
  headerContainer: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.whiteColor,
  },
  rowContainer: {
    width: width / 1.25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  buttonStyle: {
    width: width / 1.25,
    alignSelf: 'center',
    marginTop: moderateScale(20),
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
});

export default styles;
