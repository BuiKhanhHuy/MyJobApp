import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeRouter from './home.routes';
import MyConnectionRouter from './myConnection.routes';
import ChatRouter from './chat.routes';
import BookmarkRouter from './bookmark.routes';
import COLORS from '../constants/colors';

const Tab = createBottomTabNavigator();

const customCreatePostButton = size => {
  return (
    <TouchableOpacity
      style={{
        height: 36,
        width: 36,
        borderRadius: 68,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D0140',
      }}>
      <AntDesign
        name="plus"
        color={COLORS.white}
        style={{fontSize: size - 2}}
      />
    </TouchableOpacity>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          if (route.name == 'HomeTab')
            return (
              <Feather name="home" color={color} style={{fontSize: size}} />
            );
          else if (route.name == 'MyConnectionTab')
            return (
              <MaterialCommunityIcons
                name="atom-variant"
                color={color}
                style={{fontSize: size}}
              />
            );
          else if (route.name == 'ChatTab')
            return (
              <Feather
                name="message-square"
                color={color}
                style={{fontSize: size}}
              />
            );
          else if (route.name == 'BookmarkTab')
            return (
              <Feather name="bookmark" color={color} style={{fontSize: size}} />
            );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FCA34D',
        tabBarInactiveTintColor: '#A49EB5',
        tabBarStyle: {height: 55},
      })}>
      <Tab.Screen name="HomeTab" component={HomeRouter} />
      <Tab.Screen name="MyConnectionTab" component={MyConnectionRouter} />
      <Tab.Screen
        name="CreatePost"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({size}) => customCreatePostButton(size),
        }}
        component={HomeRouter}
      />
      <Tab.Screen name="ChatTab" component={ChatRouter} />
      <Tab.Screen name="BookmarkTab" component={BookmarkRouter} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
