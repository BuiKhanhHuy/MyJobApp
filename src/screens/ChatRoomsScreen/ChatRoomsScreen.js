import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RefreshControl} from 'react-native';

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
} from 'native-base';
import FastImage from 'react-native-fast-image';

import {useLayout} from '../../hooks';
import {ChatContext} from '../../context/ChatProvider';

const RenderItem = ({item}) => {
  const {setSelectedRoomId} = React.useContext(ChatContext);
  const navigation = useNavigation();

  const handleSelectRoom = chatRoomId => {
    setSelectedRoomId(chatRoomId);
    console.log('ĐÃ CHỌN CHAT ROOM: ', chatRoomId);
    navigation.navigate('ChatScreen');
  };

  return (
    <Box>
      <Pressable onPress={() => handleSelectRoom(item?.id)} bg="white">
        <Box py={2}>
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

const ChatRoomsScreen = () => {
  const {chatRooms} = React.useContext(ChatContext);
  const navigation = useNavigation();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);

  return (
    <View h="100%" bg="white" px={4} py={1}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={isLoading}
        //     onRefresh={onRefresh}
        //     colors={['#FF9228']}
        //   />
        // }
        data={chatRooms}
        renderItem={({item}) => <RenderItem item={item} key={item.id} />}
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
          const itemHeight = 260; // Chiều cao của mỗi mục trong danh sách
          const offset = itemHeight * index; // Vị trí của mục trong danh sách
          return {length: itemHeight, offset, index};
        }}
      />
    </View>
  );
};

export default ChatRoomsScreen;
