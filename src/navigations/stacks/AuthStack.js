import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../../screens/Auth/Login';
import SignUp from '../../screens/Auth/SignUp';
import ForgotPass from '../../screens/Auth/ForgotPass';

const Stack = createStackNavigator();

function AuthStack(props) {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
    </Stack.Navigator>
  );
}

export default AuthStack;
