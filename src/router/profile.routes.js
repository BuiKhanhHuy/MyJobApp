import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const ProfileStack = createNativeStackNavigator();
const ProfileRouter = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="" component={''} />
      <ProfileStack.Screen name="" component={''} />
    </ProfileStack.Navigator>
  );
};

export default ProfileRouter;
