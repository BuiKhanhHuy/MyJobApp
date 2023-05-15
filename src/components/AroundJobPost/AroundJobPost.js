import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Center, HStack, Skeleton, Stack, Text, VStack, View} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {salaryString} from '../../utils/customData';
import {TouchableNativeFeedback, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

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
        width={'100%'}
        rounded="xl"
        padding={4}
        shadow="myJobCustomShadows.0"
        backgroundColor="myJobCustomColors.white">
        <VStack space={2}>
          <HStack space={3}>
            <View>
              <FastImage
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                }}
                source={{
                  uri: companyImageUrl,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View>
              <View
                style={{
                  overflow: 'hidden',
                  width: '90%',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  fontFamily="dMSansBold"
                  color="#150a33"
                  fontSize={16}>
                  {jobName || '---'}
                </Text>
              </View>
              <View style={{overflow: 'hidden', width: '90%'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  fontFamily="dMSansMedium"
                  color="#524b6b"
                  fontSize={14}>
                  {companyName || '---'}
                </Text>
              </View>
              <HStack space={3} mt={0.5}>
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
              <Skeleton rounded={'full'} style={{height: 55, width: 55}} />
            </View>
            <View width={"82%"}>
              <Stack space={1} justifyContent="space-evenly">
                <Skeleton rounded={'md'} h={5} />

                <Skeleton rounded={'md'} h={4} />

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
