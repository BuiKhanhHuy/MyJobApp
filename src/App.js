import 'react-native-gesture-handler';
import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import Login from './Login';
import Notification from './Notification';

const App = () => {
  return (
    // <NavigationContainer>
    //   <StatusBar />
    //   <Router />
    // </NavigationContainer>
    <Login />
    // <Notification />
  );
};

export default App;
