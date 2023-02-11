import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const ChatStack = createNativeStackNavigator();
const ChatRouter = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="" component={''} />
      <ChatStack.Screen name="" component={''} />
    </ChatStack.Navigator>
  );
};

export default ChatRouter;
