import React from 'react';
import {useSelector} from 'react-redux';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  NativeModules,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import firestore from '@react-native-firebase/firestore';

import {AUTH_CONFIG} from '../configs/constants';
import HomeRouter from './home.routes';
import NotificationRouter from './notification.routes';
import ProfileRouter from './profile.routes';
import SearchRouter from './search.routes';
import BackdropLoading from '../components/loadings/BackdropLoading';

export default BottomTabNavigator = () => {
  const {currentUser, isAuthenticated} = useSelector(state => state.user);
  const [isShowNewNoti, setIsShowNewNoti] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(`${currentUser.id}`)
        .collection('notifications')
        .where('is_deleted', '==', false)
        .where('is_read', '==', false)
        .onSnapshot(querySnapshot => {
          let total = 0;
          querySnapshot.forEach(doc => {
            total = total + 1;
          });

          setIsShowNewNoti(total > 0);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser?.id]);

  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';
    let label = '';
    switch (routeName) {
      case 'HomeTab':
        icon = 'ios-home-outline';
        label = 'Trang chủ';
        break;
      case 'SearchTab':
        icon = 'ios-search-outline';
        label = 'Việc làm';
        break;
      case 'NotificationTab':
        icon = 'notifications-outline';
        label = 'Thông báo';
        break;
      case 'ProfileTab':
        icon = 'person-outline';
        label = 'Cá nhân';
        break;
    }

    return (
      <>
        {routeName === 'NotificationTab' && isShowNewNoti && (
          <Octicons
            style={{position: 'absolute', top: 5, right: 35, zIndex: 1}}
            size={15}
            name="dot-fill"
            color="#E5252A"
          />
        )}
        <Ionicons
          name={icon}
          size={25}
          color={routeName === selectedTab ? '#FCA34D' : '#aaa6b9'}
        />
        <Text
          style={{
            color: routeName === selectedTab ? '#FCA34D' : '#aaa6b9',
            fontFamily: 'DMSans-Medium',
            fontSize: 11,
            marginTop: 3,
          }}>
          {label}
        </Text>
      </>
    );
  };

  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 5,
        }}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  const openChatBot = () => {
    var RNKommunicateChat = NativeModules.RNKommunicateChat;
    let conversationObject = {
      appId: AUTH_CONFIG.CHAT_APP_ID,
    };

    setIsFullScreenLoading(true);
    RNKommunicateChat.buildConversation(
      conversationObject,
      (response, responseMessage) => {
        if (response === 'Success') {
          console.log('Conversation Successfully with id: ' + responseMessage);
        }
        setIsFullScreenLoading(false);
      },
    );
  };

  return (
    <>
      {isFullScreenLoading && <BackdropLoading />}
      
      <CurvedBottomBar.Navigator
        strokeWidth={1}
        style={styles.bottomBar}
        height={55}
        circleWidth={55}
        bgColor="white"
        initialRouteName="HomeTab"
        renderCircle={({selectedTab, navigate}) => (
          <Animated.View style={styles.btnCircle}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              onPress={openChatBot}>
              <Image
                source={require('../assets/images/icons/chatbot-icon.png')}
                style={{width: 35, height: 35}}
                alt=""
              />
            </TouchableOpacity>
          </Animated.View>
        )}
        screenOptions={{headerShown: false}}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          position="LEFT"
          name="HomeTab"
          component={HomeRouter}
        />
        <CurvedBottomBar.Screen
          position="LEFT"
          name="SearchTab"
          component={SearchRouter}
        />
        <CurvedBottomBar.Screen
          position="RIGHT"
          name="NotificationTab"
          component={NotificationRouter}
        />
        <CurvedBottomBar.Screen
          position="RIGHT"
          name="ProfileTab"
          component={ProfileRouter}
        />
      </CurvedBottomBar.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },
  bottomBar: {},
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#130160',
    padding: 10,
    elevation: 5,
    shadowColor: '#130160',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  img: {
    width: 30,
    height: 30,
  },
});
