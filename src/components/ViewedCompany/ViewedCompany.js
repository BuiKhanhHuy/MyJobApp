import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native';
import moment from 'moment-timezone';
import 'moment/locale/vi';
import {Text, VStack, View, Avatar, Skeleton, HStack} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

const ViewedCompany = ({
  companyId,
  companyName,
  companyImageUrl,
  resumeTitle,
  views,
  isSavedResume,
  createAt,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('CompanyDetailScreen', {
          id: companyId,
        })
      }>
      <View bg="myJobCustomColors.white" shadow={'myJobCustomShadows.0'} width="100%" borderRadius="2xl" p={4}>
        <VStack space={2}>
          <HStack space={2} justifyContent="flex-start">
            <Avatar
              bg="green.500"
              size="lg"
              source={{
                uri: companyImageUrl,
              }}>
              LOGO
            </Avatar>
            <VStack justifyContent="center" space={1}>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize={15}
                  color="myJobCustomColors.purpleBlue">
                  {companyName}
                </Text>
              </View>
              <HStack justifyContent="space-between" alignItems="center">
                <View>
                  <Text
                    fontFamily="DMSans-Regular"
                    fontSize={13}
                    color="#AAA6B9">
                    Đã xem hồ sơ {resumeTitle}{' '}
                    <Text color="myJobCustomColors.deepSaffron">{views}</Text>{' '}
                    lần
                  </Text>
                </View>
              </HStack>
            </VStack>
          </HStack>
          <HStack space={2} justifyContent="space-between" alignItems="center">
            <View>
              {isSavedResume && (
                <Text
                  fontFamily="DMSans-Regular"
                  color="myJobCustomColors.irishGreen">
                  <Feather name="check" color="myJobCustomColors.irishGreen" />{' '}
                  Đã lưu hồ sơ của bạn
                </Text>
              )}
            </View>
            <View>
              <Text
                fontFamily="DMSans-Regular"
                fontSize={12}
                textAlign="right"
                color="#AAA6B9">
                {moment(createAt).fromNow()}
              </Text>
            </View>
          </HStack>
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Loading = () => (
  <>
    <View
      bg="myJobCustomColors.white"
      py="5"
      px="4"
      width="100%"
      borderRadius="2xl">
      <HStack space={2} justifyContent="flex-start" alignItems="center">
        <View>
          <Skeleton rounded="full" w={'16'} h={'16'} />
        </View>
        <View width={'100%'}>
          <VStack space={2}>
            <Skeleton rounded="md" h="5" />
            <Skeleton rounded="md" h="5" />
          </VStack>
        </View>
      </HStack>
      <View mt={2}>
        <Skeleton rounded="md" h="4" width="100%" />
      </View>
    </View>
  </>
);

ViewedCompany.Loading = Loading;

export default ViewedCompany;
