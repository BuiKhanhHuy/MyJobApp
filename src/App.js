import 'react-native-gesture-handler';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
// redux
import {getUserInfo} from './redux/userSlice';
// Router
import Router from './router';
// Logo Screen
import LogoScreen from './screens/LogoScreen';

const App = () => {
  const dispatch = useDispatch();
  const {isLoading: isLoadingUser, isAuthenticated} = useSelector(
    state => state.user,
  );
  console.log('APP RENDER: isLoadingUser: ', isLoadingUser);

  React.useEffect(() => {
    // hide splash screen
    SplashScreen.hide();

    // load user info
    dispatch(getUserInfo())
      .unwrap()
      .then(res => {
        console.log('handle result here: ', res);
      })
      .catch(error => {
        console.log('handle error here: ', error.message);
      });

    // load configs
  }, []);

  return isLoadingUser ? (
    <LogoScreen />
  ) : (
    <NavigationContainer>
      {/* <StatusBar /> */}
      <Router isAuthenticated={isAuthenticated} />
    </NavigationContainer>
  );
};

export default App;
