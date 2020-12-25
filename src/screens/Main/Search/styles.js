import React from 'react';
import {Platform, StyleSheet, Dimensions} from 'react-native';
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
    justifyContent: 'space-between',
    backgroundColor: theme.colors.whiteColor,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: moderateScale(30),
    marginBottom: moderateScale(10),
  },
  searchContainer: {
    borderRadius: 5,
    borderWidth: 1,
    width: width / 1.35,
    height: width / 7.7,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: theme.colors.lightGrayColor,
    backgroundColor: theme.colors.whiteColor,
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    marginLeft: moderateScale(10),
  },
  inputStyle: {
    width: '85%',
    padding: moderateScale(10),
    fontSize: moderateScale(16),
    paddingLeft: moderateScale(15),
    fontFamily: theme.fontFamily.regular,
  },
  srchIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: moderateScale(25),
    borderBottomLeftRadius: moderateScale(25),
    width: moderateScale(45),
    marginRight: moderateScale(-7),
    height: width / 7.7,
    backgroundColor: theme.colors.primaryColor,
  },
  iconStyle: {
    alignSelf: 'center',
    fontSize: moderateScale(26),
    color: theme.colors.whiteColor,
  },
  cardContainer: {
    flex: 1,
    width: '90%',
    elevation: 5,
    shadowOpacity: 5,
    marginTop: 10,
    padding: 5,
    alignSelf: 'center',
    marginTop: moderateScale(15),
  },
  buttonStyle: {
    width: width / 3.4,
    alignSelf: 'flex-end',
    marginTop: moderateScale(5),
  },
  buttonText: {
    fontSize: 14,
    margin: moderateScale(7),
    textAlign: 'center',
    color: theme.colors.whiteColor,
    backgroundColor: 'transparent',
    fontFamily: theme.fontFamily.medium,
  },
  priceTxtStyle: {
    fontSize: 14,
    margin: moderateScale(7),
    color: theme.colors.blackColor,
    backgroundColor: 'transparent',
    fontFamily: theme.fontFamily.medium,
  },
  imgContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: moderateScale(10),
  },
  dateTxtStyle: {
    fontSize: 12,
    margin: moderateScale(7),
    color: theme.colors.grayColor,
    backgroundColor: 'transparent',
    fontFamily: theme.fontFamily.regular,
  },
  // modal styles
  modalViewContainer: {
    flex: Platform.OS === 'android' ? 0.5 : 0.45,
    width: Dimensions.get('window').width / 1.12,
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    backgroundColor: 'white',
  },
  dotStyle: {
    height: moderateScale(10),
    width: moderateScale(10),
    top: moderateScale(15),
    borderRadius: moderateScale(7),
  },
  activeDotStyle: {
    width: moderateScale(10),
    height: moderateScale(10),
    top: moderateScale(15),
    borderRadius: moderateScale(7),
  },
  recordsTextStyle: {
    fontSize: moderateScale(18),
    alignSelf: 'center',
    color: theme.colors.textColor,
    fontFamily: theme.fontFamily.medium,
  },
});

export default styles;
