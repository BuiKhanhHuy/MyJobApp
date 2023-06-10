import React from 'react';
import {
  HStack,
  IconButton,
  Input,
  Spacer,
  Stack,
  Text,
  VStack,
  View,
} from 'native-base';
import {useHeaderHeight} from '@react-navigation/elements';
import FastImage from 'react-native-fast-image';
import AntDeFontAwesomesign from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const ChatScreen = () => {
  const headerHeight = useHeaderHeight();

  return (
    <View flex={1}>
      <View
        bgColor="myJobCustomColors.white"
        flex={1}
        style={{paddingTop: headerHeight}}>
        <Stack pb={2} px={4}>
          <HStack alignItems="center" space={3}>
            <FastImage
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
              }}
              source={{
                uri: 'https://lh3.google.com/u/0/ogw/AOLn63Es8zFdoqnSOqKkJYF3aB8a7V5o-VWwodnaPLY=s32-c-mo',
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <VStack>
              <Text color="coolGray.800" bold>
                Trần Trung Nghĩa
              </Text>
              <Text color="coolGray.600">Công ty ABCD</Text>
            </VStack>
            <Spacer />
            <IconButton
              _pressed={{
                bg: 'rgba(255, 158, 135, 0.1)',
              }}
              borderRadius="full"
              icon={<Feather name="info" color="#FF9228" size={22} />}
            />
          </HStack>
        </Stack>
      </View>
      <View padding={3} flex={9}>
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
            <Text fontFamily="dMSansRegular" color="myJobCustomColors.white">
              I saw the UI/UX Designer vacancy that you uploaded on linkedin
              yesterday and I am interested in joining your company.
            </Text>
          </View>
          <View>
            <Text
              fontFamily="dMSansRegular"
              color="myJobCustomColors.mistBlue"
              fontSize={12}>
              09:30 am
            </Text>
          </View>
        </VStack>
        <VStack space={1} maxWidth={'80%'}>
          <HStack space={2} alignItems="flex-end">
            <FastImage
              style={{
                width: 45,
                height: 45,
                borderRadius: 50,
              }}
              source={{
                uri: 'https://lh3.google.com/u/0/ogw/AOLn63Es8zFdoqnSOqKkJYF3aB8a7V5o-VWwodnaPLY=s32-c-mo',
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
                fontFamily="dMSansRegular"
                color="myJobCustomColors.gunPowderPurplyBlue">
                I saw the UI/UX Designer vacancy that you uploaded on linkedin
                yesterday and I am interested in joining your company.
              </Text>
            </View>
          </HStack>
          <View>
            <Text
              ml={52}
              fontFamily="dMSansRegular"
              color="myJobCustomColors.mistBlue"
              fontSize={12}>
              09:30 am
            </Text>
          </View>
        </VStack>
      </View>
      <View padding={3} flex={1}>
        <HStack space={2}>
          <Input
            flex={1}
            borderWidth="0"
            borderRadius="lg"
            invalidOutlineColor="myJobCustomColors.lightRed"
            backgroundColor="myJobCustomColors.white"
            shadow="myJobCustomShadows.0"
            fontFamily="dMSansRegular"
            fontSize="md"
            color="myJobCustomColors.mulledWine"
            height={45}
          />

          <IconButton
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
