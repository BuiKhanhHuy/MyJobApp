import React, {useEffect} from 'react';
import {Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const Notification = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getToken = async () => {
    const deviceToken = messaging().getToken();
    console.log('deviceToken: ', deviceToken);
  };

  useEffect(async () => {
    await requestUserPermission();
    await getToken();
  }, []);

  return <Text>noti</Text>;
};

export default Notification;
