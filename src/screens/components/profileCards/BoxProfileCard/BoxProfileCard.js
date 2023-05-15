import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CV_TYPES} from '../../../../configs/constants';
import NoData from '../../../../components/NoData/NoData';
import BackdropLoading from '../../../../components/loadings/BackdropLoading';
import toSlug, {salaryString} from '../../../../utils/customData';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import jobSeekerProfileService from '../../../../services/jobSeekerProfileService';
import resumeService from '../../../../services/resumeService';
import {reloadResume} from '../../../../redux/profileSlice';

import {createPDF} from '../../../../utils/downloadFile';
import cvHtmlString from '../../../../utils/cvHtmlString';

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
  const dispatch = useDispatch();
  const {
    resume: {isReloadResume},
  } = useSelector(state => state.profile);
  const {currentUser} = useSelector(state => state.user);
  const {allConfig} = useSelector(state => state.config);
  const {isReloadGeneralProfile} = useSelector(state => state.reload);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
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
  }, [currentUser, isReloadGeneralProfile, isReloadResume]);

  const handleActive = id => {
    const activeResume = async resumeId => {
      setIsFullScreenLoading(true);
      try {
        await resumeService.activeResume(resumeId);

        dispatch(reloadResume());
        toastMessages.success('Cập nhật thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    activeResume(id);
  };

  const downloadPDF = resumeId => {
    const getProfileDetail = async resumeId => {
      try {
        setIsFullScreenLoading(true);
        const resData = await resumeService.getCvPdf(resumeId);
        const data = resData.data;

        const fileName = `MyJob_CV-${toSlug(currentUser?.fullName || '')}`;
        const file = await createPDF(cvHtmlString(allConfig, data), fileName);
        navigation.navigate('ViewPdfScreen', {
          title: 'MyJob CV',
          fileUrl: file?.filePath,
        });
      } catch (error) {
        console.log(error);
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    getProfileDetail(resumeId);
  };

  return (
    <>
      {isFullScreenLoading && <BackdropLoading />}
      {isLoading ? (
        <Loading />
      ) : resume === null ? (
        <NoData title="Không có dữ liệu" />
      ) : (
        <View
          padding={6}
          shadow={'myJobCustomShadows.0'}
          backgroundColor="myJobCustomColors.white"
          borderRadius="2xl">
          <HStack justifyContent="space-between">
            {resume?.isActive ? (
              <Button
                variant="outline"
                px="3"
                py="1.5"
                onPress={() => handleActive(resume.id)}>
                <Text
                  fontFamily="dMSansRegular"
                  fontSize="xs"
                  color="myJobCustomColors.mulledWine">
                  <Icon
                    as={FontAwesome}
                    color="myJobCustomColors.rubberDuckyYellow"
                    name="star"
                    size={4}
                  />{' '}
                  Cho phép tìm kiếm
                </Text>
              </Button>
            ) : (
              <Button
                variant="outline"
                px="3"
                py="1.5"
                onPress={() => handleActive(resume.id)}>
                <Text
                  fontFamily="dMSansRegular"
                  fontSize="xs"
                  lineHeight="sm"
                  color="myJobCustomColors.mulledWine">
                  <Icon as={FontAwesome} name="star-o" size={4} /> Cho phép tìm
                  kiếm
                </Text>
              </Button>
            )}

            <HStack space={4}>
              <TouchableOpacity onPress={() => downloadPDF(resume.id)}>
                <Icon
                  size="xl"
                  marginRight={1}
                  as={Ionicons}
                  name="eye-outline"
                  color="myJobCustomColors.deepSaffron"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OnlineProfileScreen', {
                    headerTitle: 'Hồ sơ Online',
                    resumeId: resume.id,
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
                  bg="myJobCustomColors.deepSaffron"
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
      )}
    </>
  );
};

export default BoxProfileCard;
