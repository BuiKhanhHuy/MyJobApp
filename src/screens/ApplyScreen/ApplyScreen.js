import React from 'react';
import {
  Button,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
  Icon,
  Radio,
  Spinner,
  Center,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';

import {CV_TYPES, REGEX_VATIDATE} from '../../configs/constants';
import {salaryString} from '../../utils/customData';
import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import TextInputCustom from '../../components/TextInputCustom';
import jobSeekerProfileService from '../../services/jobSeekerProfileService';
import jobPostActivityService from '../../services/jobPostActivityService';
import errorHandling from '../../utils/errorHandling';

const ProfileItem = ({item}) => {
  return (
    <View
      p={3}
      bgColor="white"
      width={'100%'}
      borderRadius={10}
      //   borderWidth={1}
      //   borderColor={'#FCA34D'}
    >
      <VStack>
        <HStack alignItems="center" space={1}>
          <Icon
            size={4}
            as={AntDesign}
            name={item.type === CV_TYPES.cvUpload ? 'profile' : 'pdffile1'}
            color="myJobCustomColors.mulledWine"
          />
          <Text
            style={{
              fontFamily: 'DMSans-Bold',
              color: '#150a33',
              fontSize: 15,
            }}>
            {item.type === CV_TYPES.cvUpload
              ? 'Hồ sơ Online'
              : 'Hồ sơ đính kèm'}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text
            style={{
              fontFamily: 'DMSans-Bold',
              color: '#514A6B',
              fontSize: 14,
            }}>
            {item?.title || '---'}
          </Text>
          <Radio colorScheme="orange" value={item?.id} my={1}>
            {' '}
          </Radio>
        </HStack>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'DMSans-Regular',
            color: '#aaa6b9',
          }}>
          Cập nhật lần cuối: 16/05/2023
        </Text>
      </VStack>
    </View>
  );
};

const ApplyScreen = ({route}) => {
  const navigation = useNavigation();
  const {
    jobPostId,
    jobName,
    companyName,
    companyImageUrl,
    salaryMin,
    salaryMax,
  } = route.params;

  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [isLoadingResumes, setIsLoadingResumes] = React.useState(false);
  const {currentUser} = useSelector(state => state.user);
  const [resumes, setResumes] = React.useState([]);

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Họ và tên là bắt buộc.')
      .max(100, 'Họ và tên vượt quá độ dài cho phép.'),
    email: yup
      .string()
      .required('Email là bắt buộc.')
      .email('Email không hợp lệ.')
      .max(100, 'Email vượt quá độ dài cho phép.'),
    phone: yup
      .string()
      .required('Số điện thoại là bắt buộc.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Số điện thoại không hợp lệ.')
      .max(15, 'Số điện thoại vượt quá độ dài cho phép.'),
  });

  const {control, setValue, handleSubmit} = useForm({
    defaultValues: {
      fullName: currentUser.fullName,
      email: currentUser.email,
      phone: currentUser?.jobSeekerProfilePhone || '',
      resume: '',
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    const getOnlineProfile = async (jobSeekerProfileId, params) => {
      setIsLoadingResumes(true);
      try {
        const resData = await jobSeekerProfileService.getResumes(
          jobSeekerProfileId,
          params,
        );

        setResumes(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingResumes(false);
      }
    };

    getOnlineProfile(currentUser?.jobSeekerProfileId);
  }, [currentUser]);

  const handleApplyJob = data => {
    const applyJob = async data => {
      setIsFullScreenLoading(true);
      try {
        await jobPostActivityService.applyJob(data);
        toastMessages.success('Ứng tuyển thành công.');

        navigation.navigate('JobPostDetailScreen', {
          id: jobPostId,
          isApplySucess: true,
        });
      } catch (error) {
        console.log(error);
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };
    applyJob({...data, job_post: jobPostId});
  };

  return (
    <>
      <View onLayout={handleLayout} flex={1}>
        <View flex={9}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {isLayoutLoading ? (
              <BackdropLoading />
            ) : (
              <View paddingX={4} paddingBottom={6} paddingTop={4}>
                <View padding={2} mb={4} bgColor="white" borderRadius={10}>
                  <HStack alignItems="center" space={2}>
                    <View>
                      <FastImage
                        style={{
                          width: 75,
                          height: 75,
                          borderRadius: 50,
                          borderWidth: 1,
                          borderColor: '#E6E1FF',
                        }}
                        source={{
                          uri: companyImageUrl,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                    <VStack
                      style={{
                        overflow: 'hidden',
                        width: '80%',
                      }}>
                      <Text
                        ellipsizeMode="tail"
                        style={{
                          fontFamily: 'DMSans-Bold',
                          color: '#150a33',
                          fontSize: 14,
                        }}>
                        {jobName || '---'}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#524b6b',
                          fontFamily: 'DMSans-Medium',
                        }}>
                        {companyName || '---'}
                      </Text>
                      <Text
                        mt={1}
                        style={{
                          fontFamily: 'DMSans-Bold',
                          color: '#FF6B2C',
                          fontSize: 14,
                        }}>
                        {salaryString(salaryMin, salaryMax)}
                      </Text>
                    </VStack>
                  </HStack>
                </View>
                {/* <JobPost.Loading /> */}
                <View>
                  {/* Start: ApplyForm */}
                  <View>
                    <VStack space={4}>
                      <TextInputCustom
                        name="fullName"
                        title="Họ và tên"
                        showRequired={true}
                        placeholder="Nhập họ và tên của bạn"
                        control={control}
                      />
                      <TextInputCustom
                        name="email"
                        title="Email"
                        showRequired={true}
                        placeholder="Nhập email"
                        control={control}
                      />
                      <TextInputCustom
                        name="phone"
                        title="Số điện thoại"
                        showRequired={true}
                        placeholder="Nhập số điện thoại"
                        control={control}
                      />
                      <View>
                        <Text
                          fontFamily="dMSansMedium"
                          fontSize="xs"
                          color="myJobCustomColors.purpleBlue"
                          paddingBottom="1"
                          mb={1.5}>
                          Hồ sơ ứng tuyển{' '}
                          <Text color="myJobCustomColors.lavaRed">*</Text>
                        </Text>
                        <View>
                          {isLoadingResumes || resumes.length === 0 ? (
                            <Center my="3">
                              <Spinner
                                size="lg"
                                color="myJobCustomColors.deepSaffron"
                              />
                            </Center>
                          ) : (
                            <Radio.Group
                              defaultValue={() => {
                                let defaultResumes = resumes.filter(
                                  value => value.type === CV_TYPES.cvWebsite,
                                );
                                if (defaultResumes.length > 0) {
                                  setValue('resume', `${defaultResumes[0].id}`);
                                  return defaultResumes[0].id;
                                } else if (resumes.length > 0) {
                                  setValue('resume', `${resumes[0].id}`);
                                  return resumes[0].id;
                                }
                              }}
                              name="resume"
                              onChange={value => setValue('resume', value)}
                              accessibilityLabel="favorite colorscheme">
                              <VStack space={2} width={'100%'}>
                                {resumes.map(item => (
                                  <ProfileItem key={item?.id} item={item} />
                                ))}
                              </VStack>
                            </Radio.Group>
                          )}
                        </View>
                      </View>
                    </VStack>
                  </View>
                  {/* End: ApplyForm */}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
        <View flex={1} justifyContent="center" bgColor="white" px={8}>
          <HStack space={3}>
            <Button
              onPress={handleSubmit(handleApplyJob)}
              size="lg"
              flex={1}
              rounded="lg"
              bgColor="myJobCustomColors.darkIndigo"
              fontFamily="DMSans-Bold"
              fontSize={14}
              lineHeight={18}>
              Xác nhận ứng tuyển
            </Button>
          </HStack>
        </View>
      </View>
      {isFullScreenLoading && <BackdropLoading />}
    </>
  );
};

export default ApplyScreen;
