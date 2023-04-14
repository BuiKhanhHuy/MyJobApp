import React from 'react';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment-timezone';
import 'moment/locale/vi';
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Skeleton,
  Text,
  VStack,
  View,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {CV_TYPES} from '../../../../configs/constants';
import {salaryString} from '../../../../utils/customData';
import toastMessages from '../../../../utils/toastMessages';
import jobSeekerProfileService from '../../../../services/jobSeekerProfileService';

const Loading = () => (
  <>
    <View
      padding={6}
      backgroundColor="myJobCustomColors.white"
      borderRadius="2xl">
      <HStack justifyContent="space-between">
        <Skeleton h="8" w="100" rounded="md" />
        <HStack space={4}>
          <Skeleton h="8" w="10" rounded="md" />
          <Skeleton h="8" w="10" rounded="md" />
        </HStack>
      </HStack>
      <Box marginY={3}></Box>
      <VStack space={2}>
        <HStack space={2}>
          <Box>
            <Skeleton w="16" h="16" rounded="full" />
          </Box>
          <VStack justifyItems="center" space={2} flex={1}>
            <Skeleton h="6" rounded="md" />
            <Skeleton h="5" rounded="md" />
          </VStack>
        </HStack>
        <View>
          <VStack space={3}>
            <Skeleton h="4" rounded="md" />
            <Skeleton h="4" rounded="md" />
            <Skeleton h="4" rounded="md" />
          </VStack>
        </View>
        <Skeleton style={{marginLeft: 'auto'}} w="150" h="4" rounded="md" />
      </VStack>
    </View>
  </>
);

const BoxProfileCard = () => {
  const navigation = useNavigation();
  const {currentUser} = useSelector(state => state.user);
  const {allConfig} = useSelector(state => state.config);
  const [isLoading, setIsLoading] = React.useState(true);
  const [resume, setResume] = React.useState(null);

  React.useEffect(() => {
    const getOnlineProfile = async (jobSeekerProfileId, params) => {
      setIsLoading(true);
      try {
        const resData = await jobSeekerProfileService.getResumes(
          jobSeekerProfileId,
          params,
        );

        setResume(resData.data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };

    getOnlineProfile(currentUser?.jobSeekerProfileId, {
      resumeType: CV_TYPES.cvWebsite,
    });
  }, [currentUser]);

  return isLoading ? (
    <Loading />
  ) : resume === null ? (
    <Text>Rong</Text>
  ) : (
    <View
      padding={6}
      backgroundColor="myJobCustomColors.white"
      borderRadius="2xl">
      <HStack justifyContent="space-between">
        <Button variant="outline" px="3" py="1.5">
          <Text
            fontFamily="dMSansRegular"
            fontSize="xs"
            lineHeight="sm"
            color="myJobCustomColors.mulledWine">
            <Icon as={FontAwesome} name="star-o" size={4} /> Đặt làm CV chính
          </Text>
        </Button>
        <HStack space={4}>
          <Icon
            size="lg"
            marginRight={1}
            as={AntDesign}
            name="download"
            color="myJobCustomColors.deepSaffron"
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OnlineProfileScreen', {
                headerTitle: 'Hồ sơ Online',
                resumeId: resume.id
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
      </HStack>
      <Divider
        marginY={4}
        bg="myJobCustomColors.lavenderPinocchioTealishBlue"
      />
      <VStack space={2}>
        <HStack space={2}>
          <Box>
            <Avatar
              bg="green.500"
              size="md"
              source={{
                uri: resume?.user?.avatarUrl,
              }}>
              AJ
            </Avatar>
          </Box>
          <Box>
            <Text
              fontFamily="dMSansBold"
              color="myJobCustomColors.mulledWine"
              fontSize="md">
              {resume?.user?.fullName}
            </Text>
            <Text
              fontSize="sm"
              fontFamily="dMSansBold"
              color="myJobCustomColors.mulledWine">
              {resume?.title || '---'}
            </Text>
          </Box>
        </HStack>
        <View>
          <VStack space={1}>
            <Text
              fontFamily="dMSansRegular"
              color="myJobCustomColors.mulledWine">
              <Text fontWeight="bold">Kinh nghiệm:</Text>{' '}
              {allConfig.experienceDict[resume?.experience] || '---'}
            </Text>
            <Text
              fontFamily="dMSansRegular"
              color="myJobCustomColors.mulledWine">
              <Text fontWeight="bold">Cấp bậc:</Text>{' '}
              {allConfig.positionDict[resume?.position] || '---'}
            </Text>
            <Text
              fontFamily="dMSansRegular"
              color="myJobCustomColors.mulledWine">
              <Text fontWeight="bold">Mức lương mong muốn:</Text>{' '}
              {salaryString(resume?.salaryMin, resume?.salaryMax) || '---'}
            </Text>
          </VStack>
        </View>
      </VStack>
      <Text
        mt={5}
        fontFamily="dMSansRegular"
        fontSize="xs"
        lineHeight="sm"
        color="myJobCustomColors.mulledWine"
        textAlign="right">
        Ngày cập nhật: {moment(resume?.updateAt).format('DD/MM/YYYY')}
      </Text>
    </View>
  );
};

export default BoxProfileCard;
