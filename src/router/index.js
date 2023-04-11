import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {Color} from '../configs/globalStyles';

import Header from '../components/Header';

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
import FilterScreen from '../screens/FilterScreen';
import SpecializationScreen from '../screens/SpecializationScreen';
import FilterJobPostScreen from '../screens/FilterJobPostScreen';
import SuggestedJobPostScreen from '../screens/SuggestedJobPostScreen';
import MainJobPostScreen from '../screens/MainJobPostScreen';
// ChatBot
import ChatBotScreen from '../screens/ChatBotScreen';
// Discover
// Profile
import AboutMeScreen from '../screens/AboutMeScreen';
// Map
import MapScreen from '../screens/MapScreen';

const RootStack = createNativeStackNavigator();

const Router = () => {
  const {isAuthenticated} = useSelector(state => state.user);

  return (
    <RootStack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}>
      <RootStack.Screen name="CheckEmail" component={CheckEmailScreen} />
      {!isAuthenticated && (
        <>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="SignUp" component={SignUpScreen} />
          <RootStack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <RootStack.Screen
            name="Successfully"
            component={SuccessfullyScreen}
          />
          <RootStack.Screen name="Splash" component={SplashScreen} />
        </>
      )}

      {/* Start: Navigator */}
      <RootStack.Screen name="MainTab" component={BottomTabNavigator} />
      {/* End: Navigator */}

      <RootStack.Group
        screenOptions={{
          headerTransparent: true,
          headerShown: true,
          headerTintColor: '#514A6B',
        }}>
        {/* Start: Home */}
        <RootStack.Group></RootStack.Group>
        {/* End: Home */}

        {/* Start: Search */}
        <RootStack.Group>
          <RootStack.Screen
            name="SpecializationScreen"
            options={{
              headerTitle: 'Ngành nghề'
            }}
            component={SpecializationScreen}
          />
          <RootStack.Screen
            options={{headerTransparent: false}}
            name="FilterJobPostScreen"
            component={FilterJobPostScreen}
          />
          <RootStack.Screen
            options={{headerTransparent: false}}
            name="SuggestedJobPostScreen"
            component={SuggestedJobPostScreen}
          />
          <RootStack.Screen
            name="MainJobPostScreen"
            component={MainJobPostScreen}
            options={{
              headerTransparent: false,
            }}
          />
          <RootStack.Screen name="FilterScreen" component={FilterScreen} />
        </RootStack.Group>
        {/* End: Search */}

        {/* Start: ChatBot */}
        <RootStack.Group>
          <RootStack.Screen name="ChatBotScreen" component={ChatBotScreen} />
        </RootStack.Group>
        {/* End: ChatBot */}

        {/* Start: Discover */}
        <RootStack.Group></RootStack.Group>
        {/* End: Discover */}

        {/* Start: Profile */}
        <RootStack.Group>
          <RootStack.Screen name="AboutMeScreen" component={AboutMeScreen} />
        </RootStack.Group>
        {/* End: Profile */}

        {/* Start: Map */}
        <RootStack.Group>
          <RootStack.Screen name="MapScreen" component={MapScreen} />
        </RootStack.Group>
        {/* End: Map */}
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default Router;
