import 'react-native-gesture-handler';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
// redux
import {getUserInfo} from './redux/userSlice';
import {getAllConfig} from './redux/configSlice';
// Router
import Router from './router';
// Logo Screen
import LogoScreen from './screens/LogoScreen';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  console.log('APP RENDER: loading: ', loading);

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
    <NavigationContainer>
      {/* <StatusBar /> */}
      <Router />
    </NavigationContainer>
  );
};

export default App;
