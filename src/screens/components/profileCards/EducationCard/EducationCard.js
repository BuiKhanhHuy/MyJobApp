import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
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
import resumeService from '../../../../services/resumeService';

const EducationCard = ({resumeId}) => {
  const navigation = useNavigation();
  const {isReloadEducation} = useSelector(state => state.reload);
  const [isLoading, setIsLoading] = React.useState(true);
  const [educationsDetail, setEducationsDetail] = React.useState([]);

  React.useEffect(() => {
    const loadEducationsDetail = async resumeId => {
      setIsLoading(true);

      try {
        const resData = await resumeService.getEducationsDetail(resumeId);

        setEducationsDetail(resData.data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };

    loadEducationsDetail(resumeId);
  }, [resumeId, isReloadEducation]);

  return (
    <ProfileCard
      titleIcon="graduation"
      title="Học vấn"
      isShowDivider={true}
      onPressRightButton={() =>
        navigation.navigate('AddOrEditEducationScreen', {
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
          ) : educationsDetail.length === 0 ? (
            <Text>Rong</Text>
          ) : (
            educationsDetail.map(value => (
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
                          {value?.major}
                        </Text>
                      </Box>
                    </HStack>
                  </View>
                  <HStack space={2}>
                    <Icon
                      size="md"
                      marginRight={1}
                      as={AntDesign}
                      name="delete"
                      color="myJobCustomColors.roseMadder"
                    />
                    <Icon
                      size="md"
                      marginRight={1.5}
                      as={AntDesign}
                      name="edit"
                      color="myJobCustomColors.deepSaffron"
                      _light={{
                        color: 'myJobCustomColors.deepSaffron',
                      }}
                      onPress={() =>
                        navigation.navigate('AddOrEditEducationScreen', {
                          id: value.id,
                        })
                      }
                    />
                  </HStack>
                </HStack>
                <Box paddingBottom={1}>
                  <Text
                    fontFamily="dMSansRegular"
                    fontSize="xs"
                    lineHeight="sm"
                    color="myJobCustomColors.mulledWine">
                    {value?.trainingPlaceName}
                  </Text>
                </Box>
                <Box>
                  <Text
                    fontFamily="dMSansRegular"
                    fontSize="xs"
                    lineHeight="sm"
                    color="myJobCustomColors.mulledWine">
                    {moment(value?.startDate).format('DD/MM/YYYY')} -{' '}
                    {value?.completedDate
                      ? moment(value?.completedDate).format('DD/MM/YYYY')
                      : 'Hiện tại'}
                  </Text>
                </Box>
              </View>
            ))
          )}
        </VStack>
      </View>
    </ProfileCard>
  );
};

export default EducationCard;
