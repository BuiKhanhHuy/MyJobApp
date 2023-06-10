import React from 'react';
import {
  FlatList,
  HStack,
  IconButton,
  Text,
  TextArea,
  VStack,
  View,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import AntDeFontAwesomesign from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {useFirebaseFireStore} from '../../hooks';
import {ChatContext} from '../../context/ChatProvider';
import {addDocument} from '../../services/firebaseService';
import Message from '../../components/chats/Message';

const ChatScreen = ({navigation}) => {
  const {currentAccount, selectedRoom} = React.useContext(ChatContext);
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    console.log('2. useeffect');
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
  }, []);

  const condition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id],
  );

  const messages = useFirebaseFireStore('messages', condition, 'desc');

  const handleInputChange = value => {
    setInputValue(value);
  };

  const handleOnSubmit = () => {
    if (inputValue.trim() !== '') {
      addDocument('messages', {
        text: inputValue,
        userId: `${currentAccount?.userId}`,
        roomId: selectedRoom.id,
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
        <FlatList
          inverted={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isLoading}
          //     onRefresh={onRefresh}
          //     colors={['#FF9228']}
          //   />
          // }
          data={messages}
          renderItem={({item}) => (
            <Message
              key={item.id}
              userId={item?.userId}
              text={item?.text}
              avatarUrl={
                `${currentAccount?.userId}` === `${item?.userId}`
                  ? currentAccount?.avatarUrl
                  : selectedRoom?.user?.avatarUrl
              }
              createdAt={item?.createdAt}
            />
          )}
          keyExtractor={item => item.id}
          // ListFooterComponent={
          //   isLoadMoreLoading ? (
          //     <Center my="3">
          //       <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
          //     </Center>
          //   ) : null
          // }
          // onEndReached={handleLoadMore}
          // onEndReachedThreshold={0.2}
          getItemLayout={(data, index) => {
            const itemHeight = 260;  
            const offset = itemHeight * index; 
            return {length: itemHeight, offset, index};
          }}
        />
      </View>
      <View px={4} pt={2} pb={4}>
        <HStack space={2} alignItems={'flex-end'}>
          <TextArea
            ref={inputRef}
            // minH="45"
            // maxH="360"
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
