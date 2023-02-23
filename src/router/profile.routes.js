import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';

const ProfileStack = createNativeStackNavigator();
const ProfileRouter = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileRouter;
