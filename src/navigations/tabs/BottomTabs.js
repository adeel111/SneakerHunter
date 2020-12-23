import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import Home from '../../screens/Main/Home';
import Search from '../../screens/Main/Search';
import Settings from '../../screens/Main/Settings';
import Notifications from '../../screens/Main/Notifications';

import theme from '../../theme';

const Tab = createBottomTabNavigator();

function BottomTabs(props) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'grey',
        labelStyle: {fontSize: 14, fontWeight: '500'},
        labelPosition: 'below-icon',
        showLabel: false,
        style: {backgroundColor: 'white'},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Icon
              type="entypo"
              name="home"
              color={
                focused
                  ? theme.colors.primaryColor
                  : theme.colors.lightGrayColor
              }
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          // tabBarLabel: 'Search',
          tabBarIcon: ({focused}) => (
            <Icon
              type="font-awesome"
              name="search"
              color={
                focused
                  ? theme.colors.primaryColor
                  : theme.colors.lightGrayColor
              }
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          // tabBarLabel: 'Notifications',
          tabBarIcon: ({focused}) => (
            <Icon
              type="MaterialIcons"
              name="notifications"
              color={
                focused
                  ? theme.colors.primaryColor
                  : theme.colors.lightGrayColor
              }
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          // tabBarLabel: 'Settings',
          tabBarIcon: ({focused}) => (
            <Icon
              type="MaterialIcons"
              name="settings"
              color={
                focused
                  ? theme.colors.primaryColor
                  : theme.colors.lightGrayColor
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
