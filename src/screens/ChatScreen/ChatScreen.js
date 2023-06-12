import React from 'react';
import {
  Center,
  FlatList,
  HStack,
  IconButton,
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
import {addDocument} from '../../services/firebaseService';
import Message from '../../components/chats/Message';
import UserInfo from '../../components/chats/UserInfo';

const limitNum = 20;
const messageCollection = firestore().collection('messages');

const ChatScreen = ({route, navigation}) => {
  const {
    selectRoomId,
    selectRoomAvatar,
    selectRoomName,
    selectRoomCompanyName,
    selectRoomCompanyId,
  } = route.params;
  const {currentAccount} = React.useContext(ChatContext);
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef(null);

  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(false);
  const [isLoadMore, setIsLoadMore] = React.useState(false);
  const [isReload, setIsReload] = React.useState(false);
  const [lastDocument, setLastDocument] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
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
              uri: `${selectRoomAvatar}`,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <VStack>
            <Text
              color="myJobCustomColors.haitiBluePurple"
              fontFamily="dMSansBold">
              {selectRoomName.substring(0, 30)}{' '}
              {selectRoomName.length > 30 && ' ...'}
            </Text>
            <Text
              color="myJobCustomColors.purplishGrey"
              fontSize={'xs'}
              fontFamily="dMSansRegular">
              {selectRoomCompanyName.substring(0, 38)}
              {selectRoomCompanyName.length > 38 && ' ...'}
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
              id: selectRoomCompanyId,
            })
          }
        />
      ),
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = messageCollection
      .where('roomId', '==', `${selectRoomId}`)
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
  }, [selectRoomId]);

  React.useEffect(() => {
    console.log('==> VAO USE EFFECT MESSAGE page = ', page);
    if (!isLoadMoreLoading) {
      setIsLoading(true);
    }

    let unsubscribe = messageCollection
      .where('roomId', '==', `${selectRoomId}`)
      .orderBy('createdAt', 'desc');

    if (lastDocument !== null) {
      unsubscribe = unsubscribe.startAfter(lastDocument);
    }

    unsubscribe = unsubscribe.limit(limitNum).onSnapshot(querySnapshot => {
      const messagesData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setPage(page + 1);
      if (isLoadMoreLoading) {
        setMessages([...messages, ...messagesData]);
      } else {
        setMessages(messagesData);
      }
      setIsLoadMoreLoading(false);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [selectRoomId, isLoadMore, isReload]);

  const handleLoadMore = () => {
    if (Math.ceil(count / limitNum) > page && !isLoadMoreLoading) {
      console.log('LOAD MORE');
      setIsLoadMoreLoading(true);
      setIsLoadMore(!isLoadMore);
    }
  };

  const handleInputChange = value => {
    setInputValue(value);
  };

  const handleOnSubmit = () => {
    if (inputValue.trim() !== '') {
      addDocument('messages', {
        text: inputValue,
        userId: `${currentAccount?.userId}`,
        roomId: selectRoomId,
      });

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
                  `${currentAccount?.userId}` === `${item?.userId}`
                    ? currentAccount?.avatarUrl
                    : selectRoomAvatar
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
          <UserInfo
            avatarUrl={selectRoomAvatar}
            title={selectRoomName}
            subTitle={selectRoomCompanyName}
          />
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
            bgColor="myJobCustomColors.darkIndigo"
            colorScheme="indigo"
            variant="solid"
            borderRadius="lg"
            width="45"
            height="45"
            _icon={{
              as: AntDeFontAwesomesign,
              name: 'send-o',
            }}
          />
        </HStack>
      </View>
    </View>
  );
};

export default ChatScreen;
