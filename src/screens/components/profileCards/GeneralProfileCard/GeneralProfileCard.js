import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Center, Spinner, Text, VStack, View} from 'native-base';

import toastMessages from '../../../../utils/toastMessages';
import NoData from '../../../../components/NoData';
import ProfileCard from '../ProfileCard';
import resumeService from '../../../../services/resumeService';
import {salaryString} from '../../../../utils/customData';

const Item = ({title, content}) => (
  <View>
    <Text
      fontFamily="dMSansBold"
      lineHeight="sm"
      color="myJobCustomColors.mulledWine">
      {title}
    </Text>
    <Text
      fontFamily="dMSansRegular"
      lineHeight="lg"
      color="myJobCustomColors.mulledWine">
      {content || '---'}
    </Text>
  </View>
);

const GeneralProfileCard = ({resumeId}) => {
  const navigation = useNavigation();
  const {allConfig} = useSelector(state => state.config);
  const {isReloadGeneralProfile} = useSelector(state => state.reload);
  const [isLoading, setIsLoading] = React.useState(true);
  const [resumeDetail, setResumeDetail] = React.useState(null);

  React.useEffect(() => {
    const getResumeDetail = async resumeId => {
      try {
        const resData = await resumeService.getResumeOwner(resumeId);

        setResumeDetail(resData.data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };

    getResumeDetail(resumeId);
  }, [resumeId, isReloadGeneralProfile]);

  return (
    <ProfileCard
      titleIcon="info"
      title="Thông tin chung"
      isShowDivider={true}
      iconName="edit"
      onPressRightButton={() =>
        navigation.navigate('EditGeneralProfileScreen', {
          resumeId: resumeId,
        })
      }>
      <VStack space={2}>
        {isLoading ? (
          <Center mt="5">
            <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
          </Center>
        ) : resumeDetail === null ? (
          <NoData title="Không có dữ liệu" />
        ) : (
          <>
            <Item title="Vị trí mong muốn" content={resumeDetail?.title} />
            <Item
              title="Cấp bậc mong muốn"
              content={allConfig.positionDict[resumeDetail?.position]}
            />
            <Item
              title="Trình độ học vấn"
              content={allConfig.academicLevelDict[resumeDetail?.academicLevel]}
            />
            <Item
              title="Kinh nghiệm làm việc"
              content={allConfig.experienceDict[resumeDetail?.experience]}
            />
            <Item
              title="Nghề nghiệp"
              content={allConfig.careerDict[resumeDetail?.career]}
            />
            <Item
              title="Địa điểm làm việc"
              content={allConfig.cityDict[resumeDetail?.city]}
            />
            <Item
              title="Mức lương mong muốn"
              content={salaryString(
                resumeDetail?.salaryMin,
                resumeDetail?.salaryMax,
              )}
            />
            <Item
              title="Nơi làm việc"
              content={
                allConfig.typeOfWorkplaceDict[resumeDetail?.typeOfWorkplace]
              }
            />
            <Item
              title="Hình thức làm việc"
              content={allConfig.jobTypeDict[resumeDetail?.jobType]}
            />
          </>
        )}
      </VStack>
    </ProfileCard>
  );
};

export default GeneralProfileCard;
