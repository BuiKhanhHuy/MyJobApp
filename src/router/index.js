import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Color} from '../constants/globalStyles';

import Header from '../components/Header';

import LogoScreen from '../screens/LogoScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import CheckEmailScreen from '../screens/CheckEmailScreen';
import SuccessfullyScreen from '../screens/SuccessfullyScreen';
// MainTab
import BottomTabNavigator from './bottomNavigator.routes';
// Home
// Search
import {FilterScreen, SpecializationScreen} from '../screens/SearchScreen';
// ChatBot
import ChatBotScreen from '../screens/ChatBotScreen';
// MyConnection
// Profile

const RootStack = createNativeStackNavigator();

const Router = () => {
  return (
    <RootStack.Navigator
      initialRouteName="MainTab"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Logo" component={LogoScreen} />
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="SignUp" component={SignUpScreen} />
      <RootStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <RootStack.Screen name="CheckEmail" component={CheckEmailScreen} />
      <RootStack.Screen name="Successfully" component={SuccessfullyScreen} />

      {/* Start: Navigator */}
      <RootStack.Screen name="MainTab" component={BottomTabNavigator} />
      {/* End: Navigator */}

      <RootStack.Group
        screenOptions={{
          headerTransparent: false,
          headerShown: true,
          headerTintColor: '#514A6B',
          title: '',
        }}>
        {/* Start: Home */}
        <RootStack.Group></RootStack.Group>
        {/* End: Home */}

        {/* Start: Search */}
        <RootStack.Group>
          <RootStack.Screen
            name="SpecializationScreen"
            component={SpecializationScreen}
          />
          <RootStack.Screen name="FilterScreen" component={FilterScreen} />
        </RootStack.Group>
        {/* End: Search */}

        {/* Start: ChatBot */}
        <RootStack.Group>
          <RootStack.Screen name="ChatBotScreen" component={ChatBotScreen} />
        </RootStack.Group>
        {/* End: ChatBot */}

        {/* Start: MyConnection */}
        <RootStack.Group></RootStack.Group>
        {/* End: MyConnection */}

        {/* Start: Profile */}
        <RootStack.Group></RootStack.Group>
        {/* End: Profile */}
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default Router;
