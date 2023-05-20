import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {Button, Center, ScrollView, Spinner, Text, View} from 'native-base';
import {useLayout} from '../../hooks';

import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
  startAfter,
  orderBy,
  updateDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import db from '../../configs/firebase';
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
      const notificationsRef = collection(
        db,
        'users',
        `${currentUser.id}`,
        'notifications',
      );
      const allQuery = query(
        notificationsRef,
        where('is_deleted', '==', false),
      );

      const unsubscribe = onSnapshot(allQuery, querySnapshot => {
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
      const notificationsRef = collection(
        db,
        'users',
        `${currentUser.id}`,
        'notifications',
      );
      const first = query(
        notificationsRef,
        where('is_deleted', '==', false),
        orderBy('time', 'desc'),
        limit(PAGE_SIZE),
      );

      const unsubscribe = onSnapshot(first, querySnapshot => {
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

        return () => {
          unsubscribe();
        };
      });
    }
  }, [currentUser?.id]);

  const loadMore = async () => {
    setIsLoadMoreLoading(true);
    const notificationsRef = collection(
      db,
      'users',
      `${currentUser.id}`,
      'notifications',
    );
    const nextQuery = query(
      notificationsRef,
      where('is_deleted', '==', false),
      orderBy('time', 'desc'),
      startAfter(lastKey),
      limit(PAGE_SIZE),
    );

    const nextNotificationList = [];
    const nextQuerySnapshot = await getDocs(nextQuery);
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
  };

  const handleRemove = key => {
    setIsFullScreenLoading(true);

    updateDoc(doc(db, 'users', `${currentUser.id}`, 'notifications', key), {
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
      // Get a reference to the notifications collection
      const notificationsRef = collection(
        db,
        'users',
        `${currentUser.id}`,
        'notifications',
      );
      const deleteQuery = query(
        notificationsRef,
        where('is_deleted', '==', false),
      );
      const querySnapshot = await getDocs(deleteQuery);

      // Create a batch write operation
      const batch = writeBatch(db);

      // Iterate over all documents and add them to the batch
      querySnapshot.forEach(doc => {
        const docRef = doc.ref;
        batch.update(docRef, {is_deleted: true});
      });

      // Commit the batch write operation
      await batch.commit();
      toastMessages.success('Xóa tất cả thành công');
    } catch (error) {
      toastMessages.error();
    } finally {
      setIsFullScreenLoading(false);
    }
  };

  const handleRead = key => {
    updateDoc(doc(db, 'users', `${currentUser.id}`, 'notifications', key), {
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
                <ScrollView>
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
