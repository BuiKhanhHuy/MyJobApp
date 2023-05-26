import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const GetFCMToken = async () => {
  let fcmToken = AsyncStorage.getItem('fcmToken');
  console.log('old fcm token: ', fcmToken);

  if (fcmToken._k === null) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('new fcm token: ', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('Error in save fcmtoken -> ', error);
    }
  }
};

const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification ... state : ', remoteMessage);
  });
};

export {requestUserPermission, GetFCMToken, NotificationListener};
