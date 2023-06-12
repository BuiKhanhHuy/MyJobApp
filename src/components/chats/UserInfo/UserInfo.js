import React from 'react';
import {Box, Text, VStack, View} from 'native-base';
import FastImage from 'react-native-fast-image';

const UserInfo = ({avatarUrl, title, subTitle}) => {
  return (
    <Box mt={5}>
      <VStack space={1} alignItems="center">
        <View mb={1.5}>
          <FastImage
            style={{
              width: 90,
              height: 90,
              borderRadius: 50,
              borderWidth: 0.5,
              borderColor: '#E6E6E6',
            }}
            source={{
              uri: `${avatarUrl}`,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text
          textAlign="center"
          color="myJobCustomColors.haitiBluePurple"
          fontSize="lg"
          fontFamily="dMSansBold">
          {title}
        </Text>
        <Text
          textAlign="center"
          color="myJobCustomColors.haitiBluePurple"
          fontSize="md"
          fontFamily="dMSansMedium">
          {subTitle}
        </Text>
        <Text
          textAlign="center"
          color="myJobCustomColors.purplishGrey"
          fontFamily="dMSansRegular"
          mt={1.5}>
          Hãy bắt đầu cuộc trò chuyện bằng một lời chào 😍
        </Text>
      </VStack>
    </Box>
  );
};

export default UserInfo;
