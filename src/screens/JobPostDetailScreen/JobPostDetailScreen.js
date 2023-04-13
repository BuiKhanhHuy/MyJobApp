import React from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment-timezone';
import 'moment/locale/vi';
import {StyleSheet} from 'react-native';
import {
  ScrollView,
  Avatar,
  View,
  Text,
  VStack,
  Center,
  HStack,
  Button,
  Icon,
  IconButton,
  Box,
} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import toastMessages from '../../utils/toastMessages';
import JobPostDetail from '../../components/JobPostDetail/JobPostDetail';
import SuggestedJobPostCard from '../../components/SuggestedJobPostCard/SuggestedJobPostCard';
import CompanyDetail from '../../components/CompanyDetail/CompanyDetail';

import jobService from '../../services/jobService';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';

const MenuButtonComponent = ({tab, setTab}) => {
  return (
    <View>
      <HStack space={2}>
        <Button
          onPress={() => setTab(0)}
          disabled={tab === 0 ? true : false}
          size="lg"
          width="50%"
          rounded="lg"
          bgColor={
            tab === 0
              ? 'myJobCustomColors.darkIndigo'
              : 'myJobCustomColors.moonrakerPurplyBlue'
          }>
          <Text
            fontFamily="DMSans-Bold"
            color={
              tab === 0
                ? 'myJobCustomColors.white'
                : 'myJobCustomColors.darkIndigo'
            }>
            Chi tiết công việc
          </Text>
        </Button>
        <Button
          onPress={() => setTab(1)}
          disabled={tab === 1 ? true : false}
          size="lg"
          width="50%"
          rounded="lg"
          bgColor={
            tab === 1
              ? 'myJobCustomColors.darkIndigo'
              : 'myJobCustomColors.moonrakerPurplyBlue'
          }>
          <Text
            fontFamily="DMSans-Bold"
            color={
              tab === 1
                ? 'myJobCustomColors.white'
                : 'myJobCustomColors.darkIndigo'
            }>
            Công ty
          </Text>
        </Button>
      </HStack>
    </View>
  );
};

const textItem = value => (
  <>
    {value ? (
      <Text style={styles.text} color="myJobCustomColors.mulledWine">
        {value}
      </Text>
    ) : (
      <Text style={styles.textEmpty} color="myJobCustomColors.mulledWine">
        Chưa cập nhật
      </Text>
    )}
  </>
);

const JobPostDetailScreen = ({route, navigation}) => {
  const {id} = route.params;
  const {allConfig} = useSelector(state => state.config);
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(true);
  const [tab, setTab] = React.useState(0);
  const [jobPostDetail, setJobPostDetail] = React.useState(null);

  React.useEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => (
        <IconButton
          icon={<Icon as={MaterialIcons} name="more-vert" />}
          borderRadius="full"
          _icon={{
            color: 'myJobCustomColors.mulledWineBluePurple',
            size: 'lg',
          }}
        />
      ),
    });
  }, []);

  React.useEffect(() => {
    const getJobPostDetail = async id => {
      setIsLoading(true);

      try {
        const resData = await jobService.getJobPostDetailById(id);

        setJobPostDetail(resData.data);
        setIsLoading(true);
      } catch (error) {
        toastMessages.error();
      }
    };

    getJobPostDetail(id);
  }, [id]);

  return (
    <View onLayout={handleLayout} flex={1}>
      <View flex={9}>
        <ScrollView>
          {isLayoutLoading ? (
            <BackdropLoading />
          ) : (
            <View flex={1}>
              <View flex={1} bgColor="#F9F9F9" zIndex={1}>
                <Center bottom={-20}>
                  <Avatar
                    size={84}
                    bg="myJobCustomColors.neonCarrot"
                    source={{
                      uri: jobPostDetail?.mobileCompanyDict?.companyImageUrl,
                    }}>
                    LOGO
                  </Avatar>
                </Center>
              </View>
              <View flex={1} paddingX={6} bgColor="myJobCustomColors.porcelain">
                <VStack pt={8} pb={4} space={3}>
                  <Center>
                    <Text
                      fontFamily="DMSans-Bold"
                      fontSize={20}
                      lineHeight={21}
                      textAlign="center"
                      color="myJobCustomColors.haitiBluePurple">
                      {jobPostDetail?.jobName}
                    </Text>
                  </Center>
                  <View>
                    <Center>
                      <Text
                        textAlign="center"
                        fontSize={16}
                        fontFamily="DMSans-Bold"
                        color="myJobCustomColors.mulledWine">
                        {jobPostDetail?.mobileCompanyDict?.companyName}
                      </Text>
                    </Center>
                    <HStack justifyContent="space-between" mt={1.5}>
                      <Center>
                        <Octicons name="dot-fill" color="black" />
                      </Center>
                      <Center>
                        {textItem(
                          allConfig?.cityDict[
                            jobPostDetail?.locationDict?.city
                          ],
                        )}
                      </Center>
                      <Center>
                        <Octicons name="dot-fill" color="black" />
                      </Center>
                      <Center>
                        <Text
                          style={styles.text}
                          color="myJobCustomColors.mulledWine">
                          {textItem(
                            moment(jobPostDetail?.deadline).format(
                              'DD/MM/YYYY',
                            ),
                          )}
                        </Text>
                      </Center>
                      <Center>
                        <Octicons name="dot-fill" color="black" />
                      </Center>
                      <Center>
                        <Text
                          style={styles.text}
                          color="myJobCustomColors.mulledWine">
                          {textItem(moment(jobPostDetail?.updateAt).fromNow())}
                        </Text>
                      </Center>
                    </HStack>
                  </View>
                </VStack>
              </View>
              <View flex={6} paddingX={6} paddingY={2} bgColor="#F9F9F9">
                {/* Start: MenuButtonComponent */}
                <MenuButtonComponent tab={tab} setTab={setTab} />
                {/* End: MenuButtonComponent */}

                <View mt={10} mb={5}>
                  {tab === 0 ? (
                    <JobPostDetail
                      jobName={jobPostDetail?.jobName}
                      jobDescription={jobPostDetail?.jobDescription}
                      jobRequirement={jobPostDetail?.jobRequirement}
                      benefitsEnjoyed={jobPostDetail?.benefitsEnjoyed}
                      careerId={jobPostDetail?.location?.city}
                      experienceId={jobPostDetail?.experience}
                      academicLevelId={jobPostDetail?.academicLevel}
                      positionId={jobPostDetail?.position}
                      salaryMin={jobPostDetail?.salaryMin}
                      salaryMax={jobPostDetail?.salaryMax}
                      jobTypeId={jobPostDetail?.jobType}
                      typeOfWorkplaceId={jobPostDetail?.typeOfWorkplace}
                      quantity={jobPostDetail?.quantity}
                      genderRequiredId={jobPostDetail?.genderRequired}
                      contactPersonName={jobPostDetail?.contactPersonName}
                      contactPersonEmail={jobPostDetail?.contactPersonEmail}
                      contactPersonPhone={jobPostDetail?.contactPersonPhone}
                      address={jobPostDetail?.location?.address}
                      lat={jobPostDetail?.location?.lat}
                      lng={jobPostDetail?.location?.lng}
                    />
                  ) : (
                    <CompanyDetail
                      companyName={
                        jobPostDetail?.mobileCompanyDict?.companyName
                      }
                      employeeSizeId={
                        jobPostDetail?.mobileCompanyDict?.employeeSize
                      }
                      fieldOperation={
                        jobPostDetail?.mobileCompanyDict?.fieldOperation
                      }
                      taxCode={jobPostDetail?.mobileCompanyDict?.taxCode}
                      since={jobPostDetail?.mobileCompanyDict?.since}
                      companyEmail={
                        jobPostDetail?.mobileCompanyDict?.companyEmail
                      }
                      companyPhone={
                        jobPostDetail?.mobileCompanyDict?.companyPhone
                      }
                      websiteUrl={jobPostDetail?.mobileCompanyDict?.websiteUrl}
                      facebookUrl={
                        jobPostDetail?.mobileCompanyDict?.facebookUrl
                      }
                      youtubeUrl={jobPostDetail?.mobileCompanyDict?.youtubeUrl}
                      linkedinUrl={
                        jobPostDetail?.mobileCompanyDict?.linkedinUrl
                      }
                      description={
                        jobPostDetail?.mobileCompanyDict?.description
                      }
                      cityId={jobPostDetail?.mobileCompanyDict?.location?.city}
                      address={
                        jobPostDetail?.mobileCompanyDict?.location?.address
                      }
                      lat={jobPostDetail?.mobileCompanyDict?.location?.lat}
                      lng={jobPostDetail?.mobileCompanyDict?.location?.lng}
                      companyImages={
                        jobPostDetail?.mobileCompanyDict?.companyImages
                      }
                    />
                  )}
                </View>
              </View>

              <View marginTop={5} paddingX={6}>
                <View>
                  <HStack space={3} justifyContent="space-between">
                    <Text
                      fontFamily="DMSans-Bold"
                      fontSize="lg"
                      lineHeight="sm"
                      color="myJobCustomColors.haitiBluePurple">
                      Việc làm gợi ý
                    </Text>
                    <Text
                      fontFamily="DMSans-Bold"
                      color="myJobCustomColors.neonCarrot"
                      onPress={() =>
                        navigation.navigate('SuggestedJobPostScreen', {
                          headerTitle: 'Việc làm gợi ý',
                          pageSize: 20,
                          params: {},
                        })
                      }>
                      Xem Thêm
                    </Text>
                  </HStack>
                </View>
                <View>
                  {/* Start: SuggestedJobPostCard */}
                  <SuggestedJobPostCard pageSize={10} />
                  {/* End: SuggestedJobPostCard */}
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      <View flex={1} justifyContent="center" bgColor="white" px={8}>
        <HStack space={3}>
          <Button
            size="lg"
            rounded="lg"
            bgColor="myJobCustomColors.white"
            shadow={1}>
            <Icon as={Feather} name="bookmark" size={5} color="#FCA34D" />
          </Button>
          <Button
            size="lg"
            flex={1}
            rounded="lg"
            bgColor="myJobCustomColors.darkIndigo"
            fontFamily="DMSans-Bold"
            fontSize={14}
            lineHeight={18}>
            ỨNG TUYỂN NGAY
          </Button>
        </HStack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'DMSans-Regular',
    textAlign: 'justify',
  },
  textEmpty: {
    fontFamily: 'DMSans-Italic',
    textAlign: 'justify',
  },
});

export default JobPostDetailScreen;