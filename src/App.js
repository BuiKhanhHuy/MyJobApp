import 'react-native-gesture-handler';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {StatusBar} from 'react-native';
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
      webClientId:
        '717983009047-bivsoh68v9ve21mptak9cjnb9d7q2h9u.apps.googleusercontent.com',
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
      {/* <StatusBar /> */}
      <Router />
    </NavigationContainer>
  );
};

export default App;
