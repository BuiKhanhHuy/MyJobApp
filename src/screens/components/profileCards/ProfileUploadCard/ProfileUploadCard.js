import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Box, Button, HStack, Icon, ScrollView} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

import NoData from '../../../../components/NoData/NoData';
import {CV_TYPES} from '../../../../configs/constants';
import toastMessages from '../../../../utils/toastMessages';
import CvUploadCard from '../../../../components/CvUploadCard/CvUploadCard';
import jobSeekerProfileService from '../../../../services/jobSeekerProfileService';

const ProfileUploadCard = () => {
  const navigation = useNavigation();
  const {currentUser} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const [resumes, setResumes] = React.useState([]);

  React.useEffect(() => {
    const getOnlineProfile = async (jobSeekerProfileId, params) => {
      setIsLoading(true);
      try {
        const resData = await jobSeekerProfileService.getResumes(
          jobSeekerProfileId,
          params,
        );

        setResumes(resData.data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };

    getOnlineProfile(currentUser?.jobSeekerProfileId, {
      resumeType: CV_TYPES.cvUpload,
    });
  }, [currentUser]);

  return (
    <>
      {isLoading ? (
        <ScrollView horizontal>
          <HStack space={4}>
            {Array.from(Array(2).keys()).map(value => (
              <CvUploadCard.Loading key={value} />
            ))}
          </HStack>
        </ScrollView>
      ) : resumes.length === 0 ? (
        <NoData title="Bạn chưa tải lên CV nào" />
      ) : (
        <ScrollView horizontal>
          <HStack space={4}>
            {resumes.map(value => (
              <CvUploadCard
                key={value.id}
                id={value?.id}
                title={value?.title}
                updateAt={value?.updateAt}
                imageUrl={value?.imageUrl}
                fileUrl={value?.fileUrl}
                isActive={value?.isActive}
              />
            ))}
          </HStack>
        </ScrollView>
      )}
      <Box mt={2}>
        <Button
          onPress={() => navigation.navigate('UploadProfileScreen')}
          size="md"
          flex={1}
          rounded="lg"
          bgColor="myJobCustomColors.neonCarrot"
          fontFamily="DMSans-Bold"
          fontSize={14}
          leftIcon={
            <Icon
              as={Feather}
              size="md"
              name="upload"
              color="myJobCustomColors.white"
            />
          }
          lineHeight={18}>
          UPLOAD CV
        </Button>
      </Box>
    </>
  );
};

export default ProfileUploadCard;
