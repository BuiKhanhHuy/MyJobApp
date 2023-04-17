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
import {AirbnbRating} from 'react-native-ratings';

import toastMessages from '../../../../utils/toastMessages';
import NoData from '../../../../components/NoData/NoData';
import ProfileCard from '../ProfileCard';
import resumeService from '../../../../services/resumeService';

const AdvancedSkillCard = ({resumeId}) => {
  const navigation = useNavigation();
  const {isReloadAdvancedSkill} = useSelector(state => state.reload);
  const [isLoading, setIsLoading] = React.useState(true);
  const [advancedSkills, setAdvancedSkills] = React.useState([]);

  React.useEffect(() => {
    const loadAdvancedSkills = async resumeId => {
      setIsLoading(true);

      try {
        const resData = await resumeService.getAdvancedSkills(resumeId);

        setAdvancedSkills(resData.data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };

    loadAdvancedSkills(resumeId);
  }, [resumeId, isReloadAdvancedSkill]);

  return (
    <ProfileCard
      titleIcon="trophy"
      title="Kỹ năng chuyên môn"
      isShowDivider={true}
      onPressRightButton={() =>
        navigation.navigate('AddOrEditAdvancedSkillScreen', {
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
          ) : advancedSkills.length === 0 ? (
            <NoData title="Bạn chưa thêm kỹ năng chuyên môn" />
          ) : (
            advancedSkills.map(value => (
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
                        navigation.navigate('AddOrEditAdvancedSkillScreen', {
                          id: value.id,
                        })
                      }
                    />
                  </HStack>
                </HStack>
                <HStack justifyContent="flex-start">
                  <AirbnbRating
                    defaultRating={value.level}
                    jumpValue={1}
                    count={5}
                    size={22}
                    isDisabled={true}
                    showRating={false}
                    ratingContainerStyle={{marginRight: 'auto'}}
                  />
                </HStack>
              </View>
            ))
          )}
        </VStack>
      </View>
    </ProfileCard>
  );
};

export default AdvancedSkillCard;
