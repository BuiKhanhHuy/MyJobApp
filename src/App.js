import 'react-native-gesture-handler';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// redux
import {getUserInfo} from './redux/userSlice';
import {getAllConfig} from './redux/configSlice';
// Router
import Router from './router';
// Logo Screen
import LogoScreen from './screens/LogoScreen';
import { AUTH_CONFIG } from './configs/constants';

const config = {
  screens: {
    MainTab: {
      path: '',
    },
    Login: 'dang-nhap-ung-vien',
    Successfully: 'successfully',
  },
};

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  const linking = {
    prefixes: [
      'MyJob://app',
    ],
    config,
  };

  React.useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: AUTH_CONFIG.GOOGLE_CLIENT_ID,
      offlineAccess: true,
      hostedDomain: '',
      forceCodeForRefreshToken: true,
      accountName: '',
      iosClientId: '',
      googleServicePlistPath: '',
      openIdRealm: '',
      profileImageSize: 120,
    });
  }, []);

  React.useEffect(() => {
    // hide splash screen
    SplashScreen.hide();

    Promise.all([
      dispatch(getUserInfo()).unwrap(),
      dispatch(getAllConfig()).unwrap(),
    ])
      .then(res => console.log('LOAD DATA SUCCESS.'))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <LogoScreen />
  ) : (
    <NavigationContainer linking={linking}>
      <Router />
    </NavigationContainer>
  );
};

export default App;
