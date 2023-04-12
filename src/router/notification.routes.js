import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';

const NotificationStack = createNativeStackNavigator();
const NotificationRouter = () => {
  return (
    <NotificationStack.Navigator initialRouteName='NotificationScreen'>
      <NotificationStack.Screen name="NotificationScreen" component={NotificationScreen} />
    </NotificationStack.Navigator>
  );
};

export default NotificationRouter;
