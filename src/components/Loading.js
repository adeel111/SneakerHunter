import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import theme from '../theme';

export const Loading = ({visible}) => (
  <ActivityIndicator
    animating
    color={theme.colors.primaryColor}
    style={visible ? loader.centering : loader.hideIndicator}
    size="large"
  />
);

const loader = StyleSheet.create({
  centering: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    opacity: 0.8,
    position: 'absolute',
    backgroundColor: '#F5F5F5',
  },
  hideIndicator: {
    top: -100,
    opacity: 0,
    position: 'absolute',
  },
});
