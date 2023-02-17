import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatBotScreen from '../screens/ChatBotScreen';

const ChatBotStack = createNativeStackNavigator();
const ChatBotRouter = () => {
  return (
    <ChatBotStack.Navigator
      initialRouteName="ChatBotScreen"
      screenOptions={{headerShown: false}}>
      <ChatBotStack.Screen name="ChatBotScreen" component={ChatBotScreen} />
    </ChatBotStack.Navigator>
  );
};

export default ChatBotRouter;
