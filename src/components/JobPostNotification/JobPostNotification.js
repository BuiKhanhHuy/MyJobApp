import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {TouchableNativeFeedback} from 'react-native';
import {HStack, Skeleton, Switch, Text, VStack, View} from 'native-base';

import {convertMoney} from '../../utils/customData';
import BackdropLoading from '../loadings/BackdropLoading';
import errorHandling from '../../utils/errorHandling';
import jobPostNotificationService from '../../services/jobPostNotificationService';

const ActiveButtonComponent = ({id, isActive}) => {
  const [checked, setChecked] = React.useState(isActive);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const handleUpdateActive = () => {
    const updateJobPostNotification = async id => {
      setIsFullScreenLoading(true);
      try {
        const resData = await jobPostNotificationService.active(id);
        const data = resData.data;

        setChecked(data.isActive);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    updateJobPostNotification(id);
  };

  return (
    <>
      {isFullScreenLoading && <BackdropLoading />}
      <Switch
        size="md"
        isChecked={checked}
        onTrackColor="#56CD53"
        onThumbColor="#04B015"
        onChange={handleUpdateActive}
      />
    </>
  );
};

const JobPostNotification = ({
  id,
  jobName,
  positionId,
  experienceId,
  salary,
  frequency,
  isActive,
  careerId,
  cityId,
}) => {
  const navigation = useNavigation();
  const {allConfig} = useSelector(state => state.config);

  return (
    <>
      <TouchableNativeFeedback
        onPress={() =>
          navigation.navigate('AddOrEditJobPostNotificationScreen', {
            id: id,
          })
        }>
        <View
          bgColor="white"
          width="100%"
          padding="4"
          borderRadius="2xl"
          shadow={'myJobCustomShadows.0'}>
          <VStack space={1.5}>
            <HStack>
              <View flex={1}>
                <Text fontSize={16} fontFamily="dMSansMedium" color="#524B6B">
                  {jobName}
                </Text>
              </View>
              <View>
                {/* Start: ActiveButtonComponent */}
                <ActiveButtonComponent id={id} isActive={isActive} />
                {/* End: ActiveButtonComponent */}
              </View>
            </HStack>
            <VStack space={0.5}>
              <View>
                <Text fontFamily="dMSansRegular" color="#524B6B" fontSize={13}>
                  {(careerId && allConfig?.careerDict[careerId]) || '---'}
                </Text>
              </View>
              <View>
                <Text fontFamily="dMSansRegular" color="#524B6B" fontSize={13}>
                  Mức lương {salary ? convertMoney(salary) : '---'}{' '}
                  {positionId &&
                    ` | ${allConfig?.positionDict[positionId] || '---'}`}{' '}
                </Text>
              </View>
              <View>
                <Text fontFamily="dMSansRegular" color="#524B6B" fontSize={13}>
                  {(experienceId && allConfig?.experienceDict[experienceId]) ||
                    '---'}
                </Text>
              </View>
              <View>
                <Text fontFamily="dMSansRegular" color="#524B6B" fontSize={13}>
                  {(cityId && allConfig?.cityDict[cityId]) || '---'}
                </Text>
              </View>
              <View>
                <Text fontFamily="dMSansRegular" color="#524B6B" fontSize={13}>
                  Thông báo qua email
                </Text>
              </View>
              <View>
                <Text fontFamily="dMSansRegular" color="#524B6B" fontSize={13}>
                  Tần suất{' '}
                  <Text
                    fontFamily="dMSansMedium"
                    color="myJobCustomColors.deepSaffron">
                    {(frequency &&
                      allConfig?.frequencyNotificationDict[frequency]) ||
                      '---'}
                  </Text>
                </Text>
              </View>
            </VStack>
            <View></View>
          </VStack>
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

const Loading = () => {
  return (
    <>
      <View
        bgColor="white"
        width="100%"
        padding="4"
        borderRadius="2xl"
        shadow={'myJobCustomShadows.0'}>
        <VStack space={2}>
          <HStack>
            <View flex={1}>
              <Skeleton size="5" w={48} rounded="md" />
            </View>
            <View>
              <Skeleton size="5" w={16} rounded="md" />
            </View>
          </HStack>
          <VStack space={2}>
            <View>
              <Skeleton rounded="md" flex={1} h="4" />
            </View>
            <View>
              <Skeleton rounded="md" flex={1} h="4" />
            </View>
            <View>
              <Skeleton rounded="md" flex={1} h="4" />
            </View>
            <View>
              <Skeleton rounded="md" flex={1} h="4" />
            </View>
            <View>
              <Skeleton rounded="md" flex={1} h="4" />
            </View>
            <View>
              <Skeleton rounded="md" flex={1} h="4" />
            </View>
          </VStack>
          <View></View>
        </VStack>
      </View>
    </>
  );
};

JobPostNotification.Loading = Loading;

export default JobPostNotification;
