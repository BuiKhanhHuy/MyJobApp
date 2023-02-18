import 'react-native-gesture-handler';
import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider, extendTheme} from 'native-base';
// Theme
import {COLOR, FONTS, CONFIG, SHADOWS} from './constants/globalStyles';
// Router
import Router from './router';

const App = () => {
  const theme = extendTheme({
    colors: COLOR,
    fonts: FONTS,
    config: CONFIG,
    shadows: SHADOWS
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <StatusBar />
        <Router />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
