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
  nameTxtStyle: {
    fontSize: 15,
    marginBottom: 5,
    color: theme.colors.blackColor,
    backgroundColor: 'transparent',
    fontFamily: theme.fontFamily.medium,
  },
  rowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descTxtStyle: {
    fontSize: 13,
    color: theme.colors.grayColor,
    backgroundColor: 'transparent',
    fontFamily: theme.fontFamily.regular,
  },
});

export default styles;
