import React from 'react';
import {HStack, Spinner, Text, VStack, View} from 'native-base';
import moment from 'moment-timezone';
import 'moment/locale/vi';

import {ChatContext} from '../../../context/ChatProvider';
import FastImage from 'react-native-fast-image';

const Message = ({userId, text, avatarUrl, createdAt}) => {
  const {currentUserChat} = React.useContext(ChatContext);

  return (
    <View py={1}>
      {`${currentUserChat?.userId}` === `${userId}` ? (
        <VStack
          space={1}
          maxWidth={'80%'}
          alignSelf="flex-end"
          alignItems="flex-end">
          <View
            padding={15}
            bgColor="myJobCustomColors.darkIndigo"
            roundedTopRight="xl"
            roundedLeft="xl">
            <Text textAlign="justify" fontFamily="dMSansRegular" color="myJobCustomColors.white">
              {text}
            </Text>
          </View>
          <View>
            <Text
              fontFamily="dMSansRegular"
              color="myJobCustomColors.mistBlue"
              fontSize={11}>
              {createdAt?.seconds
                ? moment(createdAt?.seconds * 1000).calendar(null, {
                    sameDay: '[Hôm nay] LT',
                    lastDay: '[Hôm qua] LT',
                    lastWeek: 'DD/MM/YYYY LT',
                    sameElse: 'DD/MM/YYYY LT',
                  })
                : 'Đang gửi ...'}
            </Text>
          </View>
        </VStack>
      ) : (
        <VStack space={1} maxWidth={'80%'}>
          <HStack space={2} alignItems="flex-end">
            <FastImage
              style={{
                width: 45,
                height: 45,
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
            <View
              padding={15}
              bgColor="myJobCustomColors.deepSaffron:alpha.20"
              roundedTopLeft="xl"
              roundedRight="xl">
              <Text
                textAlign="justify"
                fontFamily="dMSansRegular"
                color="myJobCustomColors.gunPowderPurplyBlue">
                {text}
              </Text>
            </View>
          </HStack>
          <View>
            <Text
              ml={52}
              fontFamily="dMSansRegular"
              color="myJobCustomColors.mistBlue"
              fontSize={11}>
              {createdAt?.seconds
                ? moment(createdAt?.seconds * 1000).calendar(null, {
                    sameDay: '[Hôm nay] LT',
                    lastDay: '[Hôm qua] LT',
                    lastWeek: 'DD/MM/YYYY LT',
                    sameElse: 'DD/MM/YYYY LT',
                  })
                : 'Đang gửi ...'}
            </Text>
          </View>
        </VStack>
      )}
    </View>
  );
};

export default Message;
