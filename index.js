/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {NativeBaseProvider, extendTheme} from 'native-base';
// Theme
import {COLOR, CONFIG, FONTS, SHADOWS} from './src/configs/globalStyles';
// Action Sheet
import {SheetProvider} from 'react-native-actions-sheet/dist/src/provider';
// firebase message
import messaging from '@react-native-firebase/messaging';
import './src/sheets';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const Root = () => {
  const theme = extendTheme({
    colors: COLOR,
    fonts: FONTS,
    config: CONFIG,
    shadows: SHADOWS,
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <SheetProvider>
          <App />
        </SheetProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
