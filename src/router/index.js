import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogoScreen from '../screens/LogoScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import CheckEmailScreen from '../screens/CheckEmailScreen';
import SuccessfullyScreen from '../screens/SuccessfullyScreen';

const RootStack = createNativeStackNavigator();

const Router = () => {
  return (
    <RootStack.Navigator initialRouteName="Successfully">
      <RootStack.Screen
        name="Logo"
        component={LogoScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="CheckEmail"
        component={CheckEmailScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Successfully"
        component={SuccessfullyScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default Router;
