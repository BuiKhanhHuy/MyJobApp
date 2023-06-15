import React from 'react';
import {
  Box,
  Center,
  FlatList,
  HStack,
  IconButton,
  Skeleton,
  Spinner,
  Text,
  TextArea,
  VStack,
  View,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import AntDeFontAwesomesign from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';

import {ChatContext} from '../../context/ChatProvider';
import {
  addDocument,
  getChatRoomById,
  updateChatRoomByPartnerId,
} from '../../services/firebaseService';
import Message from '../../components/chats/Message';
import UserInfo from '../../components/chats/UserInfo';

const limitNum = 20;
const messageCollection = firestore().collection('messages');

const ChatScreen = ({navigation}) => {
  const {currentUserChat, selectedRoomId} = React.useContext(ChatContext);
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef(null);

  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = React.useState(false);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(false);
  const [lastDocument, setLastDocument] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [selectedRoom, setSelectedRoom] = React.useState({});
  const [partnerId, setPartnerId] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // cap nhat unreadCount
  React.useEffect(() => {
    if (selectedRoomId && currentUserChat) {
      const chatRoomDetailCollection = firestore()
        .collection('chatRooms')
        .doc(`${selectedRoomId}`);

      const subscriber = chatRoomDetailCollection.onSnapshot(doc => {
        const {recipientId, unreadCount} = doc.data();

        if (recipientId === `${currentUserChat.userId}` && unreadCount > 0) {
          chatRoomDetailCollection
            .update({
              unreadCount: 0,
            })
            .then(() => {
              console.log('Unread chat room updated!');
            });
        }
      });

      return () => subscriber();
    }
  }, [selectedRoomId, currentUserChat]);

  // lay thong tin partner
  React.useEffect(() => {
    const getChatRoom = async (selectedRoomId, userId) => {
      const selectRoom = await getChatRoomById(selectedRoomId, userId);

      setSelectedRoom(selectRoom);
      setPartnerId(selectRoom?.user?.userId);
    };

    if (selectedRoomId && currentUserChat) {
      getChatRoom(selectedRoomId, currentUserChat.userId);
    }
  }, [selectedRoomId, currentUserChat]);

  // thiet lap header bar
  React.useEffect(() => {
    if (Object.keys(selectedRoom).length !== 0) {
      navigation.setOptions({
        headerTitle: props => (
          <HStack justifyContent="flex-start" alignItems="center" space={3}>
            <FastImage
              style={{
                width: 42,
                height: 42,
                borderRadius: 50,
                borderWidth: 0.5,
                borderColor: '#E6E6E6',
              }}
              source={{
                uri: `${selectedRoom?.user?.avatarUrl}`,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <VStack>
              <Text
                color="myJobCustomColors.haitiBluePurple"
                fontFamily="dMSansBold">
                {selectedRoom?.user?.name.substring(0, 30)}{' '}
                {selectedRoom?.user?.name.length > 30 && ' ...'}
              </Text>
              <Text
                color="myJobCustomColors.purplishGrey"
                fontSize={'xs'}
                fontFamily="dMSansRegular">
                {selectedRoom?.user?.company?.companyName.substring(0, 38)}
                {selectedRoom?.user?.company?.companyName.length > 38 && ' ...'}
              </Text>
            </VStack>
          </HStack>
        ),
        headerRight: () => (
          <IconButton
            _pressed={{
              bg: 'rgba(255, 158, 135, 0.1)',
            }}
            borderRadius="full"
            icon={<Feather name="info" color="#FF9228" size={22} />}
            onPress={() =>
              navigation.navigate('CompanyDetailScreen', {
                id: selectedRoom?.user?.company?.companyId,
              })
            }
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerTitle: props => (
          <HStack justifyContent="flex-start" alignItems="center" space={3}>
            <Skeleton size={42} rounded="full" />
            <VStack flex={1} space={1.5}>
              <Skeleton h={3} w="70%" rounded="md" />
              <Skeleton h={3} w="70%" rounded="md" />
            </VStack>
          </HStack>
        ),
        headerRight: () => (
          <Center>
            <Skeleton rounded="full" width={6} height={6} />
          </Center>
        ),
      });
    }
  }, [selectedRoom]);

  // tong message
  React.useEffect(() => {
    const unsubscribe = messageCollection
      .where('roomId', '==', `${selectedRoomId}`)
      .onSnapshot(querySnapshot => {
        setCount(querySnapshot.size || 0);
      });

    return () => {
      unsubscribe();
    };
  }, [selectedRoomId]);

  // lay danh sach messages
  React.useEffect(() => {
    setIsLoading(true);

    let unsubscribe = messageCollection
      .where('roomId', '==', `${selectedRoomId}`)
      .orderBy('createdAt', 'desc')
      .limit(limitNum)
      .onSnapshot(querySnapshot => {
        const messagesData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (querySnapshot.docs.length > 0) {
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
        setPage(1);
        setMessages(messagesData);
        setIsLoading(false);
      });

    return () => unsubscribe();
  }, [selectedRoomId]);

  const handleLoadMore = () => {
    const getMoreData = async () => {
      if (lastDocument !== null) {
        const queryMessages = await messageCollection
          .where('roomId', '==', `${selectedRoomId}`)
          .orderBy('createdAt', 'desc')
          .startAfter(lastDocument)
          .limit(limitNum)
          .get();

        if (queryMessages.docs.length > 0) {
          setLastDocument(queryMessages.docs[queryMessages.docs.length - 1]);
        }
        const messagesData = queryMessages.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMessages([...messages, ...messagesData]);
      }

      setIsLoadMoreLoading(false);
    };

    if (Math.ceil(count / limitNum) > page && !isLoadMoreLoading) {
      setPage(page + 1);
      setIsLoadMoreLoading(true);
      getMoreData();
    }
  };

  const handleInputChange = value => {
    setInputValue(value);
  };

  const handleOnSubmit = () => {
    if (inputValue.trim() !== '') {
      setIsSubmitLoading(true);

      addDocument('messages', {
        text: inputValue,
        userId: `${currentUserChat?.userId}`,
        roomId: selectedRoomId,
      }).then(() => {
        setIsSubmitLoading(false);
      });

      // cap nhat chat room
      updateChatRoomByPartnerId(partnerId, selectedRoomId);

      setInputValue('');
      if (inputRef?.current) {
        setTimeout(() => {
          inputRef.current.focus();
        });
      }
    }
  };

  return (
    <View flex={1}>
      <View paddingX={3} flex={12}>
        {isLoading ? (
          <Center height="100%">
            <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
          </Center>
        ) : messages.length !== 0 ? (
          <FlatList
            inverted={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={messages}
            renderItem={({item}) => (
              <Message
                key={item.id}
                userId={item?.userId}
                text={item?.text}
                avatarUrl={
                  `${currentUserChat?.userId}` === `${item?.userId}`
                    ? currentUserChat?.avatarUrl
                    : selectedRoom?.user?.avatarUrl
                }
                createdAt={item?.createdAt}
              />
            )}
            keyExtractor={item => item.id}
            ListFooterComponent={
              isLoadMoreLoading ? (
                <Center my="3">
                  <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
                </Center>
              ) : null
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.2}
          />
        ) : (
          selectedRoom && (
            <UserInfo
              avatarUrl={selectedRoom?.user?.avatarUrl}
              title={selectedRoom?.user?.name}
              subTitle={selectedRoom?.user?.company?.companyName}
              description={
                selectedRoom?.createdBy !== `${currentUserChat?.userId}`
                  ? `${selectedRoom?.user?.company?.companyName} đã kết nối với bạn.`
                  : `Bạn đã kết nối đến ${selectedRoom?.user?.company?.companyName}`
              }
            />
          )
        )}
      </View>
      <View px={4} pt={2} pb={4}>
        <HStack space={2} alignItems={'flex-end'}>
          <TextArea
            ref={inputRef}
            // minH="45"
            // maxH="360"
            h={45}
            textAlign="justify"
            padding="2"
            value={inputValue}
            onChangeText={handleInputChange}
            flex={1}
            placeholder="Tin nhắn"
            borderRadius="lg"
            borderWidth={0}
            shadow="myJobCustomShadows.0"
            backgroundColor="myJobCustomColors.white"
            color="myJobCustomColors.mulledWine"
          />

          <IconButton
            onPress={handleOnSubmit}
            disabled={isSubmitLoading}
            bgColor={'myJobCustomColors.darkIndigo'}
            variant="solid"
            borderRadius="lg"
            width="45"
            height="45">
            {isSubmitLoading ? (
              <Spinner color="myJobCustomColors.neonCarrot" />
            ) : (
              <AntDeFontAwesomesign name="send-o" color="white" size={20} />
            )}
          </IconButton>
        </HStack>
      </View>
    </View>
  );
};

export default ChatScreen;
