import React from 'react';
import {Text, useTheme} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Octicons from 'react-native-vector-icons/Octicons';

import SearchScreen from '../screens/SearchScreen';
import {TouchableOpacity} from 'react-native';

const SearchStack = createNativeStackNavigator();

const SearchRouter = ({navigation}) => {
  const {colors, sizes} = useTheme();

  return (
    <SearchStack.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{
        headerTransparent: true,
        headerShown: true,
        headerTitle: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Octicons
              name="arrow-left"
              size={sizes[6]}
              color={colors.myJobCustomColors.white}
            />
          </TouchableOpacity>
        ),
      }}>
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
    </SearchStack.Navigator>
  );
};

export default SearchRouter;
