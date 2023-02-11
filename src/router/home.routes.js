import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';

const HomeStack = createNativeStackNavigator();
const HomeRouter = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeRouter;
