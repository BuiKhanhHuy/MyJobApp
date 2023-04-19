import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native';
import {Box, HStack, Icon, Text, VStack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MyCareerCenterCard = () => {
  const navigation = useNavigation();

  return (
    <HStack space={2} justifyContent="space-between">
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('MyJobScreen')}>
        <VStack
          shadow={'myJobCustomShadows.0'}
          space={3}
          padding={6}
          borderRadius="2xl"
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
        onPress={() => navigation.navigate('MyCompanyScreen')}>
        <VStack
          shadow={'myJobCustomShadows.0'}
          space={3}
          padding={6}
          borderRadius="2xl"
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
    </HStack>
  );
};

export default MyCareerCenterCard;
