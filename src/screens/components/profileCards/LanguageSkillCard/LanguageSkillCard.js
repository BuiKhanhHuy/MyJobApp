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
import ProfileCard from '../ProfileCard';
import resumeService from '../../../../services/resumeService';

const LanguageSkillCard = ({resumeId}) => {
  const navigation = useNavigation();
  const {allConfig} = useSelector(state => state.config);
  const {isReloadLanguageSkill} = useSelector(state => state.reload);
  const [isLoading, setIsLoading] = React.useState(true);
  const [languageSkills, setLanguageSkills] = React.useState([]);

  React.useEffect(() => {
    const loadLanguageSkills = async resumeId => {
      setIsLoading(true);

      try {
        const resData = await resumeService.getLanguageSkills(resumeId);

        setLanguageSkills(resData.data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguageSkills(resumeId);
  }, [resumeId, isReloadLanguageSkill]);

  return (
    <ProfileCard
      titleIcon="book-open"
      title="Kỹ năng ngôn ngữ"
      isShowDivider={true}
      onPressRightButton={() =>
        navigation.navigate('AddOrEditLanguageSkillScreen', {
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
          ) : languageSkills.length === 0 ? (
            <Text>Rong</Text>
          ) : (
            languageSkills.map(value => (
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
                          {allConfig?.languageDict[value?.language]}
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
                        navigation.navigate('AddOrEditLanguageSkillScreen', {
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

export default LanguageSkillCard;
