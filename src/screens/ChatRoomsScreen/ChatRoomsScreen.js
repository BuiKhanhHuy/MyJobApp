import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RefreshControl} from 'react-native';
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
} from 'native-base';
import FastImage from 'react-native-fast-image';
import {useLayout} from '../../hooks';
import {ChatContext} from '../../context/ChatProvider';
import NoData from '../../components/NoData/NoData';
import {getUserAccount} from '../../services/firebaseService';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import {IMAGES} from '../../configs/globalStyles';

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
  const {setSelectedRoomId} = React.useContext(ChatContext);
  const navigation = useNavigation();

  const handleSelectRoom = chatRoom => {
    setSelectedRoomId(chatRoom?.id);
    console.log('ĐÃ CHỌN CHAT ROOM: ', chatRoom?.id);
    navigation.navigate('ChatScreen', {
      selectRoomId: chatRoom?.id,
      selectRoomAvatar: chatRoom?.user?.avatarUrl,
      selectRoomName: chatRoom?.user?.name,
      selectRoomCompanyName: chatRoom?.user?.company?.companyName,
      selectRoomCompanyId: chatRoom?.user?.company?.companyId,
    });
  };

  return (
    <Box>
      <Pressable
        onPress={() => handleSelectRoom(item)}
        // bg="white"
        _pressed={{
          bg: 'rgba(19, 1, 96, 0.1)',
          borderRadius: 'md'
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
            <VStack>
              <Text
                color="myJobCustomColors.haitiBluePurple"
                fontFamily="dMSansBold">
                {`${item?.user?.name}`}
              </Text>
              <Text
                color="myJobCustomColors.purplishGrey"
                fontFamily="dMSansRegular">
                {`${item?.user?.company?.companyName}` || '---'}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              color="myJobCustomColors.mistBlue"
              fontFamily="dMSansRegular"
              alignSelf="flex-start">
              {item.timeStamp}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
};

const limitNum = 20;
const chatRoomCollection = firestore().collection('chatRooms');

const ChatRoomsScreen = () => {
  const {currentAccount} = React.useContext(ChatContext);
  const {userId} = currentAccount;
  const navigation = useNavigation();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(false);
  const [isLoadMore, setIsLoadMore] = React.useState(false);
  const [isReload, setIsReload] = React.useState(false);
  const [lastDocument, setLastDocument] = React.useState(null);
  const [chatRooms, setChatRooms] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = chatRoomCollection
      .where('members', 'array-contains', `${userId}`)
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
  }, [userId]);

  React.useEffect(() => {
    console.log('==> VAO USE EFFECT page = ', page);
    if (!isLoadMoreLoading) {
      setIsLoading(true);
    }

    let unsubscribe = chatRoomCollection
      .where('members', 'array-contains', `${userId}`)
      .orderBy('createdAt', 'desc');

    if (lastDocument !== null) {
      unsubscribe = unsubscribe.startAfter(lastDocument);
    }

    unsubscribe = unsubscribe
      .limit(limitNum)
      .onSnapshot(async querySnapshot => {
        let chatRoomsData = [];

        const promises = querySnapshot.docs.map(async doc => {
          try {
            let partnerId = '';
            const chatRoomData = doc.data();

            if (chatRoomData?.userId1 === `${userId}`) {
              partnerId = chatRoomData?.userId2;
            } else {
              partnerId = chatRoomData?.userId1;
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

        setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        await Promise.all(promises);
        setPage(page + 1);
        if (isLoadMoreLoading) {
          setChatRooms([...chatRooms, ...chatRoomsData]);
        } else {
          setChatRooms(chatRoomsData);
        }
        setIsLoadMoreLoading(false);
        setIsLoading(false);
      });

    return () => unsubscribe();
  }, [userId, isLoadMore, isReload]);

  const handleLoadMore = () => {
    if (Math.ceil(count / limitNum) > page && !isLoadMoreLoading) {
      console.log('LOAD MORE');
      setIsLoadMoreLoading(true);
      setIsLoadMore(!isLoadMore);
    }
  };

  const onRefresh = () => {
    console.log('GỌI REFRESH...................');
    setIsReload(!isReload);
    setLastDocument(null);
    setPage(0);
  };

  return (
    <View h="100%" bg="white" py={1} onLayout={handleLayout}>
      {false ? (
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
