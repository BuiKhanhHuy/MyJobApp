import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
import {AirbnbRating} from 'react-native-ratings';

import toastMessages from '../../../../utils/toastMessages';
import NoData from '../../../../components/NoData/NoData';
import BackdropLoading from '../../../../components/loadings/BackdropLoading';
import ProfileCard from '../ProfileCard';
import resumeService from '../../../../services/resumeService';
import languageSkillService from '../../../../services/languageSkillService';
import {reloadLanguageSkill} from '../../../../redux/reloadSlice';

const LanguageSkillCard = ({resumeId}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const {allConfig} = useSelector(state => state.config);
  const {isReloadLanguageSkill} = useSelector(state => state.reload);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
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

  const handleDeleteLanguageSkill = async id => {
    const del = async id => {
      setIsFullScreenLoading(true);
      try {
        await languageSkillService.deleteLanguageSkillById(id);

        dispatch(reloadLanguageSkill());
        toastMessages.success('Xóa thành công.');
      } catch (error) {
        console.log(error)
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const isOk = await SheetManager.show('confirm-sheet', {
      payload: {
        title: 'Xóa kỹ năng ngôn ngữ',
        description: 'Bạn có chắc chắn muốn xóa kỹ năng ngôn ngữ này không?',
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
              <NoData title="Bạn chưa thêm kỹ năng ngôn ngữ" />
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
                      <TouchableOpacity
                        onPress={() => handleDeleteLanguageSkill(value.id)}>
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
                          navigation.navigate('AddOrEditLanguageSkillScreen', {
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
    </>
  );
};

export default LanguageSkillCard;
