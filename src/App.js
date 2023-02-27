import 'react-native-gesture-handler';
import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
// Router
import Router from './router';
// Logo Screen
import LogoScreen from './screens/LogoScreen';

const App = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log('>> Tắt splash screen hình ảnh thật.');
    SplashScreen.hide();
    console.log('>> call api user && call api configs');
    setTimeout(() => {
      console.log('DONE');
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LogoScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar />
      <Router />
    </NavigationContainer>
  );
};

export default App;
