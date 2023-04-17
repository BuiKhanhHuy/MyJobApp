import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { SheetManager } from 'react-native-actions-sheet';
import {Box, Button, HStack, Icon, ScrollView} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

import {CV_TYPES} from '../../../../configs/constants';
import toastMessages from '../../../../utils/toastMessages';
import NoData from '../../../../components/NoData/NoData';
import BackdropLoading from '../../../../components/loadings/BackdropLoading/BackdropLoading';
import CvUploadCard from '../../../../components/CvUploadCard/CvUploadCard';
import jobSeekerProfileService from '../../../../services/jobSeekerProfileService';
import resumeService from '../../../../services/resumeService';
import {reloadAttachedProfile} from '../../../../redux/reloadSlice';

const ProfileUploadCard = () => {
  const navigation = useNavigation();
  const {currentUser} = useSelector(state => state.user);
  const {isReloadAttachedProfile} = useSelector(state => state.reload);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
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
  }, [currentUser, isReloadAttachedProfile]);

  const handleDelete = async id => {
    const del = async id => {
      setIsFullScreenLoading(true);
      try {
        await resumeService.deleteResume(id);

        dispatch(reloadAttachedProfile());
        toastMessages.success('Xóa thành công.');
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const isOk = await SheetManager.show('confirm-sheet', {
      payload: {
        title: 'Xóa CV đính kèm',
        description: 'Bạn có chắc chắn muốn xóa CV đính kèm này không?',
        yesText: 'Đồng ý',
        noText: 'Hủy bỏ',
      },
    });

    if (isOk) {
      del(id);
    }
  };

  return (
    <>
     {isFullScreenLoading && <BackdropLoading />}
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
                handleDelete={handleDelete}
              />
            ))}
          </HStack>
        </ScrollView>
      )}
      <Box mt={6}>
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
