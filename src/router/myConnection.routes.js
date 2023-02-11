import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const MyConnectionStack = createNativeStackNavigator();
const MyConnectionRouter = () => {
  return (
    <MyConnectionStack.Navigator>
      <MyConnectionStack.Screen name="" component={''} />
      <MyConnectionStack.Screen name="" component={''} />
    </MyConnectionStack.Navigator>
  );
};

export default MyConnectionRouter;
