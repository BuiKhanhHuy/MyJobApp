import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  Text,
  VStack,
  View,
  Avatar,
  Button,
  Skeleton,
  Spinner,
  Center,
} from 'native-base';

import toastMessages from '../../utils/toastMessages';
import companyService from '../../services/companyService';
import {reloadFollowCompany} from '../../redux/reloadSlice';

const FollowedComponent = ({id, isFollowed}) => {
  const dispath = useDispatch();
  const navigation = useNavigation();
  const {isAuthenticated} = useSelector(state => state.user);
  const [isFollowLoading, setIsFollowLoading] = React.useState(false);

  const handleFollow = id => {
    const followCompany = async companyId => {
      setIsFollowLoading(true);

      try {
        const resData = await companyService.followCompany(companyId);
        const followStatus = resData?.data?.isFollowed;

        dispath(
          reloadFollowCompany({
            id: companyId,
            status: followStatus,
          }),
        );
        toastMessages.success(
          followStatus ? 'Đã theo dõi.' : 'Đã hủy theo dõi.',
        );
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFollowLoading(false);
      }
    };

    followCompany(id);
  };

  return (
    <>
      {isFollowLoading ? (
        <Spinner color="myJobCustomColors.deepSaffron" />
      ) : (
        <Button
          width={130}
          borderRadius="3xl"
          borderWidth="0.5"
          variant="outline"
          backgroundColor={isFollowed ? 'myJobCustomColors.dullLavender' : null}
          borderColor="myJobCustomColors.blueLotus"
          onPress={() =>
            isAuthenticated ? handleFollow(id) : navigation.navigate('Login')
          }
          size="sm">
          {isFollowed ? (
            <Text
              fontFamily="DMSans-Regular"
              fontSize={12}
              color="myJobCustomColors.white">
              Đang theo dõi
            </Text>
          ) : (
            <Text
              fontFamily="DMSans-Regular"
              fontSize={12}
              color="myJobCustomColors.purpleBlue">
              Theo dõi
            </Text>
          )}
        </Button>
      )}
    </>
  );
};

const Company = ({
  id,
  companyName,
  companyImageUrl,
  followNumber,
  jobPostNumber,
  isFollowed,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('CompanyDetailScreen', {
          id: id,
        })
      }>
      <View
        key={id}
        alignItems="center"
        flexDirection="column"
        bg="myJobCustomColors.white"
        shadow={'myJobCustomShadows.0'}
        height="250"
        width="100%"
        py="5"
        px="4"
        borderRadius="2xl">
        <VStack justifyContent="space-between">
          <VStack alignItems="center" space={1} flex={1}>
            <View>
              <Avatar
                bg="green.500"
                source={{
                  uri: companyImageUrl,
                }}>
                LOGO
              </Avatar>
            </View>
            <Text
              textAlign="center"
              fontFamily="DMSans-Bold"
              fontSize={15}
              color="myJobCustomColors.purpleBlue">
              {companyName}
            </Text>
            <Text fontFamily="DMSans-Regular" fontSize={14} color="#AAA6B9">
              {followNumber} lượt theo dõi
            </Text>
            <Text fontFamily="DMSans-Regular" fontSize={14} color="#AAA6B9">
              {jobPostNumber} việc làm
            </Text>
          </VStack>
          <Center>
            {/* Start: FollowedComponent */}
            <FollowedComponent id={id} isFollowed={isFollowed} />
            {/* End: FollowedComponent */}
          </Center>
        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Loading = () => (
  <View
    alignItems="center"
    flexDirection="column"
    bg="myJobCustomColors.white"
    height="250"
    width="100%"
    py="5"
    px="4"
    borderRadius="2xl">
    <VStack justifyContent="space-between">
      <VStack alignItems="center" space={3} flex={1}>
        <View>
          <Skeleton rounded="full" w={20} h={20} />
        </View>

        <Skeleton rounded="md" h="10" width="100%" />

        <Skeleton rounded="md" h="5" width="100%" />

        <Skeleton rounded="md" h="5" width="100%" />
      </VStack>
      <Skeleton rounded="md" h="8" width="100%" />
    </VStack>
  </View>
);

Company.Loading = Loading;

export default Company;
