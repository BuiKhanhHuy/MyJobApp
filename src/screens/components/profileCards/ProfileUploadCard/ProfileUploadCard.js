import React from 'react';
import {useSelector} from 'react-redux';
import {HStack, ScrollView, Text, View} from 'native-base';

import {CV_TYPES} from '../../../../configs/constants';
import toastMessages from '../../../../utils/toastMessages';
import CvUploadCard from '../../../../components/CvUploadCard/CvUploadCard';
import jobSeekerProfileService from '../../../../services/jobSeekerProfileService';

const ProfileUploadCard = () => {
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

  return isLoading ? (
    <ScrollView horizontal>
      <HStack space={4}>
        {Array.from(Array(2).keys()).map(value => (
          <CvUploadCard.Loading key={value} />
        ))}
      </HStack>
    </ScrollView>
  ) : resumes.length === 0 ? (
    <Text>Rong</Text>
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
  );
};

export default ProfileUploadCard;
