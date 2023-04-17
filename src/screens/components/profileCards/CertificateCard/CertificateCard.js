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
import NoData from '../../../../components/NoData/NoData';
import ProfileCard from '../ProfileCard';
import resumeService from '../../../../services/resumeService';

const CertificateCard = ({resumeId}) => {
  const navigation = useNavigation();
  const {isReloadCertificate} = useSelector(state => state.reload);
  const [isLoading, setIsLoading] = React.useState(true);
  const [certificates, setCertificates] = React.useState([]);

  React.useEffect(() => {
    const loadCertificates = async resumeId => {
      setIsLoading(true);

      try {
        const resData = await resumeService.getCertificates(resumeId);

        setCertificates(resData.data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };

    loadCertificates(resumeId);
  }, [resumeId, isReloadCertificate]);

  return (
    <ProfileCard
      titleIcon="badge"
      title="Chứng chỉ"
      isShowDivider={true}
      onPressRightButton={() =>
        navigation.navigate('AddOrEditCertificateScreen', {
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
          ) : certificates.length === 0 ? (
            <NoData title="Bạn chưa thêm chứng chỉ" />
          ) : (
            certificates.map(value => (
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
                          {value?.name}
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
                        navigation.navigate('AddOrEditCertificateScreen', {
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
                    {value?.trainingPlace}
                  </Text>
                </Box>
                <Box>
                  <Text
                    fontFamily="dMSansRegular"
                    fontSize="xs"
                    lineHeight="sm"
                    color="myJobCustomColors.mulledWine">
                    {value?.expirationDate
                      ? `${moment(value?.startDate).format(
                          'DD/MM/YYYY',
                        )} - ${moment(value?.expirationDate).format(
                          'DD/MM/YYYY',
                        )}`
                      : 'Không thời hạn'}
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

export default CertificateCard;
