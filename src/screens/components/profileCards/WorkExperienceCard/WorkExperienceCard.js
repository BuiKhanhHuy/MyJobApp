import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SheetManager} from 'react-native-actions-sheet';
import {
  Box,
  Center,
  HStack,
  Icon,
  Spinner,
  Text,
  View,
  VStack,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment-timezone';
import 'moment/locale/vi';

import toastMessages from '../../../../utils/toastMessages';
import ProfileCard from '../ProfileCard';
import NoData from '../../../../components/NoData';
import BackdropLoading from '../../../../components/loadings/BackdropLoading';
import resumeService from '../../../../services/resumeService';
import expericenDetailService from '../../../../services/expericenDetailService';
import {reloadExperience} from '../../../../redux/reloadSlice';

const WorkExperienceCard = ({resumeId}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const {isReloadExperience} = useSelector(state => state.reload);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [experiencesDetail, setExperiencesDetail] = React.useState([]);

  React.useEffect(() => {
    const loadExperiencesDetail = async resumeId => {
      setIsLoading(true);

      try {
        const resData = await resumeService.getExperiencesDetail(resumeId);

        setExperiencesDetail(resData.data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };

    loadExperiencesDetail(resumeId);
  }, [resumeId, isReloadExperience]);

  const handleDeleteExperienceDetail = async id => {
    const del = async id => {
      setIsFullScreenLoading(true);
      try {
        await expericenDetailService.deleteExperienceDetailById(id);

        dispatch(reloadExperience());
        toastMessages.success('Xóa thành công.');
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const isOk = await SheetManager.show('confirm-sheet', {
      payload: {
        title: 'Xóa kinh nghiệm làm việc',
        description:
          'Bạn có chắc chắn muốn xóa thông tin kinh nghiệm làm việc này không?',
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
      <ProfileCard
        titleIcon="briefcase"
        title="Kinh nghiệm"
        isShowDivider={true}
        onPressRightButton={() =>
          navigation.navigate('AddOrEditExperienceScreen', {
            id: null,
            resumeId: resumeId,
          })
        }>
        <View>
          <VStack space={5}>
            {isLoading ? (
              <Center mt="5">
                <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
              </Center>
            ) : experiencesDetail.length === 0 ? (
              <NoData title="Bạn chưa thêm kinh nghiệm" />
            ) : (
              experiencesDetail.map(value => (
                <View key={value.id}>
                  <HStack justifyContent="space-between" paddingBottom={2}>
                    <View justifyContent="center" alignItems="baseline">
                      <HStack>
                        <Box justifyContent="center">
                          <Text
                            fontFamily="dMSansBold"
                            lineHeight="sm"
                            fontSize="sm"
                            color="myJobCustomColors.haitiBluePurple">
                            {value?.jobName}
                          </Text>
                        </Box>
                      </HStack>
                    </View>
                    <HStack space={2}>
                      <TouchableOpacity
                        onPress={() => handleDeleteExperienceDetail(value.id)}>
                        <Icon
                          size="md"
                          marginRight={1}
                          as={AntDesign}
                          name="delete"
                          color="myJobCustomColors.roseMadder"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('AddOrEditExperienceScreen', {
                            id: value.id,
                          })
                        }>
                        <Icon
                          size="md"
                          marginRight={1.5}
                          as={AntDesign}
                          name="edit"
                          color="myJobCustomColors.deepSaffron"
                          _light={{
                            color: 'myJobCustomColors.deepSaffron',
                          }}
                        />
                      </TouchableOpacity>
                    </HStack>
                  </HStack>
                  <Box paddingBottom={1}>
                    <Text
                      fontFamily="dMSansRegular"
                      fontSize="xs"
                      lineHeight="sm"
                      color="myJobCustomColors.mulledWine">
                      {value?.companyName}
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontFamily="dMSansRegular"
                      fontSize="xs"
                      lineHeight="sm"
                      color="myJobCustomColors.mulledWine">
                      {moment(value.startDate).format('DD/MM/YYYY')} -{' '}
                      {moment(value.endDate).format('DD/MM/YYYY')}
                    </Text>
                  </Box>
                </View>
              ))
            )}
          </VStack>
        </View>
      </ProfileCard>
    </>
  );
};

export default WorkExperienceCard;
