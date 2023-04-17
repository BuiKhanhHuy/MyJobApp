import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import dayjs from 'dayjs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {ICONS} from '../../../../configs/globalStyles';
import NoData from '../../../../components/NoData/NoData';
import ProfileCard from '../ProfileCard';
import resumeService from '../../../../services/resumeService';

const CVCard = ({resumeId}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [cv, setCv] = React.useState(null);

  React.useEffect(() => {
    const getResumeDetail = async resumeId => {
      setIsLoading(true);
      try {
        const resData = await resumeService.getCv(resumeId);

        setCv(resData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getResumeDetail(resumeId);
  }, [resumeId]);

  return (
    <ProfileCard
      titleIcon="paper-clip"
      title="Tệp CV đính kèm"
      isShowDivider={true}
      iconName="upload-to-cloud"
      onPressRightButton={() =>
        navigation.navigate('EditCvScreen', {
          resumeId: resumeId,
        })
      }>
      <VStack space={2}>
        {isLoading ? (
          <Center mt="5">
            <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
          </Center>
        ) : cv === null ? (
          <NoData title="Không có dữ liệu" />
        ) : (
          <>
            <Box
              padding={5}
              borderStyle="dashed"
              borderWidth="1"
              borderColor="myJobCustomColors.amethystSmoke"
              backgroundColor="myJobCustomColors.artyClickUltramarine:0.05"
              rounded="xl">
              <VStack space={4}>
                <HStack space={3} alignItems="center">
                  <View>
                    <Image
                      alt="icon"
                      source={ICONS.PDF_ICON}
                      width="45"
                      height="50"
                    />
                  </View>
                  <VStack>
                    <View>
                      <Text
                        color="myJobCustomColors.darkIndigo"
                        fontFamily="dMSansRegular">
                        {cv?.title || '---'}
                      </Text>
                    </View>
                    <View>
                      <Text
                        color="myJobCustomColors.greyCloud"
                        fontFamily="dMSansRegular">
                        {dayjs(cv?.updateAt).format('DD/MM/YYYY HH:mm:ss a')}
                      </Text>
                    </View>
                  </VStack>
                </HStack>
                <View>
                  <HStack
                    alignItems="center"
                    space={3}
                    justifyContent="flex-end">
                    <Icon
                      size="xl"
                      marginRight={1}
                      as={Ionicons}
                      name="eye-outline"
                      color="myJobCustomColors.deepSaffron"
                    />
                    <Icon
                      size="lg"
                      marginRight={1}
                      as={AntDesign}
                      name="download"
                      color="myJobCustomColors.deepSaffron"
                    />
                  </HStack>
                </View>
              </VStack>
            </Box>
          </>
        )}
      </VStack>
    </ProfileCard>
  );
};

export default CVCard;
