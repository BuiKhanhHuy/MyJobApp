import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';

const SearchStack = createNativeStackNavigator();

const SearchRouter = ({navigation}) => {
  return (
    <SearchStack.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{
        headerTransparent: false,
        headerShown: true,
        headerTintColor: 'red',
      }}>
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
    </SearchStack.Navigator>
  );
};

export default SearchRouter;
