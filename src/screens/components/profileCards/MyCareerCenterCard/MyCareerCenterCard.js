import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native';
import {Box, HStack, Icon, Text, VStack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MyCareerCenterCard = () => {
  const navigation = useNavigation();

  return (
    <VStack space={2}>
      <HStack space={2} justifyContent="space-between">
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('MyJobScreen')}>
          <VStack
            shadow={'myJobCustomShadows.0'}
            space={3}
            padding={4}
            borderRadius="lg"
            backgroundColor="myJobCustomColors.white"
            flex={1}>
            <Box>
              <Icon
                size="xl"
                marginRight={1}
                as={MaterialIcons}
                name="work"
                color="myJobCustomColors.deepSaffron"
              />
            </Box>
            <Box>
              <Text
                fontFamily="DMSans-Bold"
                fontSize="md"
                lineHeight="sm"
                color="myJobCustomColors.haitiBluePurple">
                Việc làm của tôi
              </Text>
            </Box>
          </VStack>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('JobPostNotificationScreen')}>
          <VStack
            shadow={'myJobCustomShadows.0'}
            space={3}
            padding={4}
            borderRadius="lg"
            backgroundColor="myJobCustomColors.white"
            flex={1}>
            <Box>
              <Icon
                size="xl"
                marginRight={1}
                as={MaterialIcons}
                name="notifications-active"
                color="myJobCustomColors.deepSaffron"
              />
            </Box>
            <Box>
              <Text
                fontFamily="DMSans-Bold"
                fontSize="md"
                lineHeight="sm"
                color="myJobCustomColors.haitiBluePurple">
                Thông báo việc làm
              </Text>
            </Box>
          </VStack>
        </TouchableWithoutFeedback>
      </HStack>
      <HStack space={2} justifyContent="space-between">
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('MyCompanyScreen')}>
          <VStack
            shadow={'myJobCustomShadows.0'}
            space={3}
            padding={4}
            borderRadius="lg"
            backgroundColor="myJobCustomColors.white"
            flex={1}>
            <Box>
              <Icon
                size="xl"
                marginRight={1}
                as={MaterialIcons}
                name="home-work"
                color="myJobCustomColors.deepSaffron"
              />
            </Box>
            <Box>
              <Text
                fontFamily="DMSans-Bold"
                fontSize="md"
                lineHeight="sm"
                color="myJobCustomColors.haitiBluePurple">
                Công ty của tôi
              </Text>
            </Box>
          </VStack>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('MapScreen')}>
          <VStack
            shadow={'myJobCustomShadows.0'}
            space={3}
            padding={4}
            borderRadius="lg"
            backgroundColor="myJobCustomColors.white"
            flex={1}>
            <Box>
              <Icon
                size="xl"
                marginRight={1}
                as={MaterialIcons}
                name="my-location"
                color="myJobCustomColors.deepSaffron"
              />
            </Box>
            <Box>
              <Text
                fontFamily="DMSans-Bold"
                fontSize="md"
                lineHeight="sm"
                color="myJobCustomColors.haitiBluePurple">
                Việc làm xung quanh
              </Text>
            </Box>
          </VStack>
        </TouchableWithoutFeedback>
      </HStack>
    </VStack>
  );
};

export default MyCareerCenterCard;
