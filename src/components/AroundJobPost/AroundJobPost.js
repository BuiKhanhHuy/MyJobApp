import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Center,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  VStack,
  View,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {salaryString} from '../../utils/customData';
import {TouchableNativeFeedback} from 'react-native';

const AroundJobPost = ({
  id,
  jobName,
  salaryMin,
  salaryMax,
  deadline,
  latitude,
  longitude,
  companyName,
  companyImageUrl,
  cityId,
}) => {
  const navigation = useNavigation();
  const {allConfig} = useSelector(state => state.config);

  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate('JobPostDetailScreen', {
          id: id,
        })
      }>
      <View
        width="100%"
        rounded="xl"
        padding={4}
        shadow="myJobCustomShadows.0"
        backgroundColor="myJobCustomColors.white">
        <VStack space={2}>
          <HStack space={3}>
            <Image
              rounded="full"
              source={{
                uri: companyImageUrl,
              }}
              alt="---"
              size="sm"
            />
            <View>
              <View style={{overflow: 'hidden'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="clip"
                  fontFamily="dMSansBold"
                  color="#150a33"
                  fontSize={16}>
                  {jobName || '---'}
                </Text>
              </View>
              <View style={{overflow: 'hidden'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="clip"
                  fontFamily="dMSansMedium"
                  color="#524b6b"
                  fontSize={14}>
                  {companyName || '---'}
                </Text>
              </View>
              <HStack space={3}>
                <Text fontFamily="dMSansRegular" color="#524b6b" fontSize={12}>
                  <FontAwesome5 name="search-dollar" size={15} />{' '}
                  {salaryString(salaryMin, salaryMax)}
                </Text>
                <Text fontFamily="dMSansRegular" color="#524b6b" fontSize={12}>
                  <Entypo name="location" size={15} />{' '}
                  {allConfig?.cityDict[cityId]}
                </Text>
              </HStack>
            </View>
          </HStack>
          <View>
            <Text
              fontFamily="dMSansRegular"
              fontSize={13}
              color="myJobCustomColors.coolGrey">
              <MaterialCommunityIcons name="timer-sand-complete" size={15} />
              Còn{' '}
              {(
                (new Date(deadline).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
              ).toFixed(0)}{' '}
              ngày để ứng tuyển
            </Text>
          </View>
        </VStack>
      </View>
    </TouchableNativeFeedback>
  );
};

const Loading = () => {
  return (
    <Center
      width="100%"
      rounded="xl"
      padding={4}
      shadow="myJobCustomShadows.0"
      backgroundColor="myJobCustomColors.white">
      <VStack space={2} width="100%">
        <View>
          <HStack space={2}>
            <View>
              <Skeleton rounded={'full'} w={20} h={20} />
            </View>
            <View>
              <Stack space={1} justifyContent="center">
                <View>
                  <Skeleton rounded={'md'} h={5} />
                </View>
                <View>
                  <Skeleton rounded={'md'} h={4} />
                </View>
                <HStack space={3}>
                  <Skeleton rounded={'md'} h={4} w={100} />
                  <Skeleton rounded={'md'} h={4} w={100} />
                </HStack>
              </Stack>
            </View>
          </HStack>
        </View>
        <View>
          <Skeleton rounded={'md'} h={4} />
        </View>
      </VStack>
    </Center>
  );
};

AroundJobPost.Loading = Loading;

export default AroundJobPost;
