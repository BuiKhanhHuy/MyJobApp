import React from 'react';
import {Text, useTheme} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Octicons from 'react-native-vector-icons/Octicons';

import {TouchableOpacity} from 'react-native';

import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';

const NotificationStack = createNativeStackNavigator();
const NotificationRouter = ({navigation}) => {
  const {colors, sizes} = useTheme();

  return (
    <NotificationStack.Navigator
      initialRouteName="NotificationScreen"
      screenOptions={{
        headerTransparent: true,
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginRight: 20}}>
            <Octicons name="arrow-left" size={sizes[6]} color={'#514A6B'} />
          </TouchableOpacity>
        ),
        headerTintColor: '#514A6B',
      }}>
      <NotificationStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
    </NotificationStack.Navigator>
  );
};

export default NotificationRouter;
