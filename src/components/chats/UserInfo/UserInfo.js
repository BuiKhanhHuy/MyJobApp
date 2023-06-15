import React from 'react';
import {Box, HStack, Skeleton, Text, VStack, View} from 'native-base';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserInfo = ({avatarUrl, title, subTitle, description}) => {
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
        {avatarUrl && title && subTitle ? (
          <>
            <HStack px={4} space={1} justifyContent="center" mt={1.5}>
              <Ionicons
                key={2}
                name="checkmark-circle-outline"
                color={'#04B015'}
                size={20}
              />
              <Text
                textAlign="center"
                color="myJobCustomColors.mediumSeaGreen"
                fontFamily="dMSansRegular">
                {description}
              </Text>
            </HStack>

            <Text
              textAlign="center"
              color="myJobCustomColors.purplishGrey"
              fontFamily="dMSansRegular">
              Hãy bắt đầu cuộc trò chuyện bằng một lời chào 😍
            </Text>
          </>
        ) : (
          <>
            <Skeleton mt={1} h={4} rounded="md" mt={1.5} />
            <Skeleton mt={1} h={4} rounded="md" />
          </>
        )}
      </VStack>
    </Box>
  );
};

export default UserInfo;
