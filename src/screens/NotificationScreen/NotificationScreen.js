import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {Button, Center, ScrollView, Spinner, Text, View} from 'native-base';
import {useLayout} from '../../hooks';
 
import firestore from '@react-native-firebase/firestore';

import {IMAGES} from '../../configs/globalStyles';
import NoData from '../../components/NoData/NoData';
import Notification from '../../components/Notification/Notification';
import LoginRequiredCard from '../../components/LoginRequiredCard';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';

const PAGE_SIZE = 12;

const NotificationScreen = () => {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const {currentUser, isAuthenticated} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(false);
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [count, setCount] = React.useState(0);

  const [notifications, setNotifications] = React.useState([]);
  const [lastKey, setLastKey] = React.useState(null);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        notifications.length > 0 && (
          <Text fontSize={16} color="#FC4646" onPress={() => handleRemoveAll()}>
            Xóa tất cả
          </Text>
        ),
    });
  }, [notifications.length]);

  React.useEffect(() => {
    if (isAuthenticated) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(`${currentUser.id}`)
        .collection('notifications')
        .where('is_deleted', '==', false)
        .onSnapshot(querySnapshot => {
          let total = 0;
          querySnapshot.forEach(doc => {
            total = total + 1;
          });

          setCount(total);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser?.id]);

  React.useEffect(() => {
    if (isAuthenticated) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(`${currentUser.id}`)
        .collection('notifications')
        .where('is_deleted', '==', false)
        .orderBy('time', 'desc')
        .limit(PAGE_SIZE)
        .onSnapshot(querySnapshot => {
          const notificationList = [];
          querySnapshot.forEach(doc => {
            notificationList.push({
              ...doc.data(),
              key: doc.id,
            });
          });

          setNotifications(notificationList);
          setLastKey(querySnapshot.docs[querySnapshot.docs.length - 1]);
          setIsLoading(false);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [currentUser?.id]);

  const loadMore = async () => {
    setIsLoadMoreLoading(true);

    firestore()
      .collection('users')
      .doc(`${currentUser.id}`)
      .collection('notifications')
      .where('is_deleted', '==', false)
      .orderBy('time', 'desc')
      .startAfter(lastKey)
      .limit(PAGE_SIZE)
      .onSnapshot(nextQuerySnapshot => {
        const nextNotificationList = [];

        const lastVisible =
          nextQuerySnapshot.docs[nextQuerySnapshot.docs.length - 1];
        nextQuerySnapshot.forEach(doc => {
          nextNotificationList.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        setNotifications([...notifications, ...nextNotificationList]);
        setLastKey(lastVisible);
        setIsLoadMoreLoading(false);
      });
  };

  const handleRemove = key => {
    setIsFullScreenLoading(true);

    firestore()
      .collection('users')
      .doc(`${currentUser.id}`)
      .collection('notifications')
      .doc(`${key}`)
      .update({
        is_deleted: true,
      })
      .then(() => {
        const index = notifications.findIndex(value => value.key === key);
        if (index > -1) {
          let newNotifications = [...notifications];
          newNotifications.splice(index, 1);
          setNotifications(newNotifications);
        }

        toastMessages.success('Xóa thành công');
        setIsFullScreenLoading(false);
      })
      .catch(error => {
        toastMessages.error();
        setIsFullScreenLoading(false);
      });
  };

  const handleRemoveAll = async () => {
    try {
      setIsFullScreenLoading(true);

      const notificationsQuerySnapshot = await firestore()
        .collection('users')
        .doc(`${currentUser.id}`)
        .collection('notifications')
        .where('is_deleted', '==', false)
        .get();

      // Create a new batch instance
      const batch = firestore().batch();

      notificationsQuerySnapshot.forEach(doc => {
        const docRef = doc.ref;
        batch.update(docRef, {is_deleted: true});
      });

      batch.commit().then(() => toastMessages.success('Xóa tất cả thành công'));
    } catch (error) {
      toastMessages.error();
    } finally {
      setIsFullScreenLoading(false);
    }
  };

  const handleRead = key => {
    firestore()
      .collection('users')
      .doc(`${currentUser.id}`)
      .collection('notifications')
      .doc(`${key}`)
      .update({
        is_read: true,
      })
      .then(() => {
        console.log('read noti success.');
      })
      .catch(error => {
        console.log('read noti failed: ', error);
      });
  };

  const handleClickItem = item => {
    switch (item.type) {
      case 'SYSTEM':
        handleRead(item.key);
        navigation.navigate('HomeScreen');
        break;
      case 'EMPLOYER_VIEWED_RESUME':
        handleRead(item.key);
        navigation.navigate('MyCompanyScreen', {
          tabIndex: 0,
        });
        break;
      case 'EMPLOYER_SAVED_RESUME':
        handleRead(item.key);
        navigation.navigate('MyCompanyScreen', {
          tabIndex: 0,
        });
        break;
      case 'APPLY_STATUS':
        handleRead(item.key);
        navigation.navigate('MyJobScreen', {
          tabIndex: 1,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      {isFullScreenLoading && <BackdropLoading />}
      <View onLayout={handleLayout} style={{marginTop: headerHeight}}>
        {isAuthenticated ? (
          isLayoutLoading ? (
            <Center mt="5">
              <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
            </Center>
          ) : (
            <View>
              {isLoading ? (
                Array.from(Array(4).keys()).map(value => (
                  <Center paddingX="3" key={value}>
                    <Notification.Loading />
                  </Center>
                ))
              ) : notifications.length === 0 ? (
                <Center marginTop={50}>
                  <NoData
                    title="Không có thông báo nào"
                    imgSize="3xs"
                    img={IMAGES.img4}
                  />
                </Center>
              ) : (
                <ScrollView showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                  <View paddingBottom={100}>
                    {notifications.map(value => (
                      <Center paddingX="3" key={value.key}>
                        {/* Start: Notification */}
                        <Notification
                          key={value?.key}
                          id={value?.key}
                          title={value?.title}
                          content={value?.content}
                          image={value?.image}
                          time={value?.time?.seconds}
                          isRead={value?.is_read}
                          item={value}
                          handleRemove={handleRemove}
                          handleClickItem={handleClickItem}
                        />
                        {/* End: Notification */}
                      </Center>
                    ))}
                    {Math.ceil(count / PAGE_SIZE) > 1 &&
                      (isLoadMoreLoading ? (
                        <Center mt="3">
                          <Spinner
                            size="lg"
                            color="myJobCustomColors.deepSaffron"
                          />
                        </Center>
                      ) : (
                        <Text
                          mt="3"
                          textAlign="center"
                          fontFamily="DMSans-Bold"
                          color="myJobCustomColors.neonCarrot"
                          onPress={loadMore}>
                          Xem Thêm
                        </Text>
                      ))}
                  </View>
                </ScrollView>
              )}
            </View>
          )
        ) : (
          //  Start: LoginRequiredCard
          <LoginRequiredCard />
          // End: LoginRequiredCard
        )}
      </View>
    </>
  );
};

export default NotificationScreen;
