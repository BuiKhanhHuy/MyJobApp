import React from 'react';
import {Box, Skeleton, Text, VStack, View} from 'native-base';
import FastImage from 'react-native-fast-image';

const UserInfo = ({avatarUrl, title, subTitle}) => {
  return (
    <Box mt={5}>
      <VStack space={1} alignItems="center">
        <View mb={1.5}>
          {avatarUrl ? (
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
          ) : (
            <Skeleton rounded="full" size="90" />
          )}
        </View>
        {title ? (
          <Text
            textAlign="center"
            color="myJobCustomColors.haitiBluePurple"
            fontSize="lg"
            fontFamily="dMSansBold">
            {title}
          </Text>
        ) : (
          <Skeleton h={5} rounded="md" />
        )}
        {subTitle ? (
          <Text
            textAlign="center"
            color="myJobCustomColors.haitiBluePurple"
            fontSize="md"
            fontFamily="dMSansMedium">
            {subTitle}
          </Text>
        ) : (
          <Skeleton mt={1} h={5} rounded="md" />
        )}
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
