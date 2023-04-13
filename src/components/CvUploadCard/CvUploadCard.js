import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Box,
  AspectRatio,
  Image,
  Text,
  HStack,
  Stack,
  Icon,
  Button,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CvUploadCard = () => {
  const navigation = useNavigation();

  return (
    <Box
      overflow="hidden"
      borderRadius="2xl"
      backgroundColor="myJobCustomColors.white">
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
            }}
            alt="image"
          />
        </AspectRatio>
        <Button
          variant="outline"
          position="absolute"
          bottom="1"
          left="1"
          px="3"
          py="1.5">
          <Text
            fontFamily="dMSansRegular"
            fontSize="xs"
            lineHeight="sm"
            color="myJobCustomColors.white">
            <Icon as={FontAwesome} name="star-o" size={4} color="white" /> Đặt
            làm CV chính
          </Text>
        </Button>
      </Box>
      <Stack padding={6} space={3}>
        <Stack space={1}>
          <Text
            fontFamily="DMSans-Bold"
            fontSize="lg"
            lineHeight="sm"
            color="myJobCustomColors.haitiBluePurple">
            Lập trình viên Python
          </Text>
          <Text
            fontFamily="dMSansRegular"
            fontSize="xs"
            lineHeight="sm"
            color="myJobCustomColors.mulledWine">
            Cập nhật lần cuối: 27/02/2001
          </Text>
        </Stack>
        <HStack alignItems="center" space={4} justifyContent="flex-end">
          <Icon
            size="lg"
            marginRight={1}
            as={AntDesign}
            name="delete"
            color="myJobCustomColors.roseMadder"
          />
          <Icon
            size="lg"
            marginRight={1}
            as={AntDesign}
            name="download"
            color="myJobCustomColors.deepSaffron"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('AttachedProfileScreen', {
              headerTitle: "HIHI"
            })}>
            <Icon
              size="lg"
              marginRight={1}
              as={AntDesign}
              name="edit"
              color="myJobCustomColors.deepSaffron"
            />
          </TouchableOpacity>
        </HStack>
      </Stack>
    </Box>
  );
};

export default CvUploadCard;
