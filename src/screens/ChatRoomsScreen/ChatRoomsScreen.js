import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RefreshControl, Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {
  Box,
  Text,
  Pressable,
  HStack,
  VStack,
  Spacer,
  View,
  FlatList,
  Center,
  Spinner,
  Skeleton,
  Button,
  Icon,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import Octicons from 'react-native-vector-icons/Octicons';
import {useLayout} from '../../hooks';
import {ChatContext} from '../../context/ChatProvider';
import NoData from '../../components/NoData/NoData';
import {getUserAccount} from '../../services/firebaseService';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import {IMAGES} from '../../configs/globalStyles';

const screenWidth = Dimensions.get('window').width;

const LoadingItem = () => {
  return (
    <Box p={2}>
      <HStack alignItems="center" space={3}>
        <Skeleton rounded="full" width={50} height={50} />
        <VStack space={2} flex={1}>
          <Skeleton rounded="md" height={5} />
          <Skeleton rounded="md" height={3} />
        </VStack>
      </HStack>
    </Box>
  );
};

const RenderItem = ({item}) => {
  const {currentUserChat} = React.useContext(ChatContext);
  const {setSelectedRoomId} = React.useContext(ChatContext);
  const navigation = useNavigation();

  const handleSelectRoom = chatRoom => {
    setSelectedRoomId(chatRoom?.id);
    navigation.navigate('ChatScreen');
  };

  return (
    <Box>
      <Pressable
        onPress={() => handleSelectRoom(item)}
        _pressed={{
          bg: 'rgba(19, 1, 96, 0.1)',
          borderRadius: 'md',
        }}>
        <Box p={2}>
          <HStack alignItems="center" space={3}>
            <FastImage
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                borderWidth: 0.5,
                borderColor: '#E6E6E6',
              }}
              source={{
                uri: `${item?.user?.avatarUrl}`,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <VStack
              style={{
                overflow: 'hidden',
                width: screenWidth - 112,
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                color="myJobCustomColors.haitiBluePurple"
                fontFamily="dMSansBold">
                {`${item?.user?.name}`}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                color="myJobCustomColors.purplishGrey"
                fontFamily="dMSansRegular">
                {`${item?.user?.company?.companyName}` || '---'}
              </Text>
            </VStack>
            {`${item?.recipientId}` === `${currentUserChat.userId}` &&
              item?.unreadCount > 0 && (
                <Icon as={Octicons} name="dot-fill" size="sm" color="#2979ff" />
              )}
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
};

const limitNum = 20;
const chatRoomCollection = firestore().collection('chatRooms');

const ChatRoomsScreen = () => {
  const {currentUserChat} = React.useContext(ChatContext);
  const {userId} = currentUserChat;
  const navigation = useNavigation();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(false);
  const [isReload, setIsReload] = React.useState(false);
  const [lastDocument, setLastDocument] = React.useState(null);
  const [chatRooms, setChatRooms] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = chatRoomCollection
      .where('members', 'array-contains', `${userId}`)
      .onSnapshot(querySnapshot => {
        setCount(querySnapshot.size || 0);
      });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  React.useEffect(() => {
    setIsLoading(true);

    const unsubscribe = chatRoomCollection
      .where('members', 'array-contains', `${userId}`)
      .orderBy('updatedAt', 'desc')
      .limit(limitNum)
      .onSnapshot(async querySnapshot => {
        let chatRoomsData = [];

        const promises = querySnapshot.docs.map(async doc => {
          try {
            let partnerId = '';
            const chatRoomData = doc.data();

            if (chatRoomData?.members[0] === `${currentUserChat.userId}`) {
              partnerId = chatRoomData?.members[1];
            } else {
              partnerId = chatRoomData?.members[0];
            }

            const userAccount = await getUserAccount(
              'accounts',
              `${partnerId}`,
            );

            chatRoomsData.push({
              ...chatRoomData,
              id: doc.id,
              user: userAccount,
            });
          } catch (error) {
            console.error(error);
          }
        });

        if (querySnapshot.docs.length > 0) {
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
        await Promise.all(promises);

        setPage(1);
        setChatRooms(chatRoomsData);
        setIsLoading(false);
      });

    return () => unsubscribe();
  }, [userId, isReload]);

  const handleLoadMore = () => {
    const getMoreData = async () => {
      if (lastDocument !== null) {
        const queryChatRooms = await chatRoomCollection
          .where('members', 'array-contains', `${userId}`)
          .orderBy('updatedAt', 'desc')
          .startAfter(lastDocument)
          .limit(limitNum)
          .get();

        let chatRoomsData = [];
        const promises = queryChatRooms.docs.map(async doc => {
          try {
            let partnerId = '';
            const chatRoomData = doc.data();

            if (chatRoomData?.members[0] === `${currentUserChat.userId}`) {
              partnerId = chatRoomData?.members[1];
            } else {
              partnerId = chatRoomData?.members[0];
            }

            const userAccount = await getUserAccount(
              'accounts',
              `${partnerId}`,
            );

            chatRoomsData.push({
              ...chatRoomData,
              id: doc.id,
              user: userAccount,
            });
          } catch (error) {
            console.error(error);
          }
        });

        if (queryChatRooms.docs.length > 0) {
          setLastDocument(queryChatRooms.docs[queryChatRooms.docs.length - 1]);
        }
        await Promise.all(promises);

        setChatRooms([...chatRooms, ...chatRoomsData]);
      }

      setIsLoadMoreLoading(false);
    };

    if (Math.ceil(count / limitNum) > page && !isLoadMoreLoading) {
      setPage(page + 1);
      setIsLoadMoreLoading(true);
      getMoreData();
    }
  };

  const onRefresh = () => {
    setIsReload(!isReload);
  };

  return (
    <View h="100%" bg="white" py={1} onLayout={handleLayout}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <>
          {isLoading ? (
            <View px={2}>
              {Array.from(Array(12).keys()).map(value => (
                <LoadingItem key={value} />
              ))}
            </View>
          ) : chatRooms.length === 0 ? (
            <Center marginTop={50}>
              <NoData
                title="Không tìm thấy cuộc trò chuyện nào!"
                titleSize="sm"
                subtitle="Chỉ cho phép trò chuyện với nhà tuyển dụng đã ứng tuyển."
                imgSize="2xl"
                img={IMAGES.img2}>
                <Button
                  onPress={() =>
                    navigation.navigate('MyJobScreen', {
                      tabIndex: 1,
                    })
                  }
                  mt={4}
                  size="md"
                  rounded="lg"
                  bgColor="myJobCustomColors.darkIndigo"
                  fontFamily="DMSans-Bold"
                  fontSize={14}
                  lineHeight={18}>
                  ĐI ĐẾN VIỆC LÀM ĐÃ ỨNG TUYỂN
                </Button>
              </NoData>
            </Center>
          ) : (
            <View px={2}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                    colors={['#FF9228']}
                  />
                }
                data={chatRooms}
                renderItem={({item}) => (
                  <RenderItem item={item} key={item.id} />
                )}
                keyExtractor={item => item.id}
                ListFooterComponent={
                  isLoadMoreLoading ? (
                    <Center my="3">
                      <Spinner
                        size="lg"
                        color="myJobCustomColors.deepSaffron"
                      />
                    </Center>
                  ) : null
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.2}
                getItemLayout={(data, index) => {
                  const itemHeight = 66;
                  const offset = itemHeight * index;
                  return {length: itemHeight, offset, index};
                }}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default ChatRoomsScreen;
