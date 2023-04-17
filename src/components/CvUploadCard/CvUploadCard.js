import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment-timezone';
import 'moment/locale/vi';
import {
  Box,
  AspectRatio,
  Image,
  Text,
  HStack,
  Stack,
  Icon,
  Button,
  Skeleton,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CvUploadCard = ({
  id,
  title,
  updateAt,
  imageUrl,
  fileUrl,
  isActive,
  handleDelete,
}) => {
  const navigation = useNavigation();

  return (
    <Box
      overflow="hidden"
      borderRadius="2xl"
      backgroundColor="myJobCustomColors.white">
      <Box>
        <AspectRatio w="300" ratio={16 / 9}>
          <Image
            source={{
              uri: imageUrl,
            }}
            alt="image"
          />
        </AspectRatio>
      </Box>
      <Stack padding={6} space={3}>
        <Stack space={1}>
          <Text
            fontFamily="DMSans-Bold"
            fontSize="lg"
            lineHeight="sm"
            color="myJobCustomColors.haitiBluePurple">
            {title}
          </Text>
          <Text
            fontFamily="dMSansRegular"
            fontSize="xs"
            lineHeight="sm"
            color="myJobCustomColors.mulledWine">
            Cập nhật lần cuối: {moment(updateAt).format('DD/MM/YYYY')}
          </Text>
        </Stack>
        <HStack alignItems="center" space={4} justifyContent="flex-end">
          <Button variant="outline" px="3" py="1.5">
            <Text
              fontFamily="dMSansRegular"
              fontSize="xs"
              lineHeight="sm"
              color="myJobCustomColors.mulledWine">
              <Icon
                as={FontAwesome}
                name="star-o"
                size={4}
                color="myJobCustomColors.mulledWine"
              />{' '}
              Đặt làm CV chính
            </Text>
          </Button>
          <TouchableOpacity onPress={() => handleDelete(id)}>
            <Icon
              size="lg"
              marginRight={1}
              as={AntDesign}
              name="delete"
              color="myJobCustomColors.roseMadder"
            />
          </TouchableOpacity>
          <Icon
            size="lg"
            marginRight={1}
            as={AntDesign}
            name="download"
            color="myJobCustomColors.deepSaffron"
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AttachedProfileScreen', {
                resumeId: id,
              })
            }>
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

const Loading = () => (
  <>
    <Box
      overflow="hidden"
      borderRadius="2xl"
      backgroundColor="myJobCustomColors.white">
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Skeleton height="100%" />
        </AspectRatio>
      </Box>
      <Stack padding={6} space={3}>
        <Stack space={2}>
          <Skeleton h={6} rounded="md" />
          <Skeleton h={3} rounded="md" />
        </Stack>
        <HStack alignItems="center" space={4} justifyContent="flex-end">
          <Skeleton h="8" w="10" rounded="md" />
          <Skeleton h="8" w="10" rounded="md" />
          <Skeleton h="8" w="10" rounded="md" />
        </HStack>
      </Stack>
    </Box>
  </>
);

CvUploadCard.Loading = Loading;

export default CvUploadCard;
