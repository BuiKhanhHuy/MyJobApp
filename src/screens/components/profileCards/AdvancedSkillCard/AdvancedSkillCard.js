import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import {AirbnbRating} from 'react-native-ratings';
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

import toastMessages from '../../../../utils/toastMessages';
import BackdropLoading from '../../../../components/loadings/BackdropLoading/BackdropLoading';
import NoData from '../../../../components/NoData/NoData';
import ProfileCard from '../ProfileCard';
import resumeService from '../../../../services/resumeService';
import advancedSkillService from '../../../../services/advancedSkillService';
import {reloadAdvancedSkill} from '../../../../redux/reloadSlice';

const AdvancedSkillCard = ({resumeId}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isReloadAdvancedSkill} = useSelector(state => state.reload);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
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

  const handleDeleteAdvancedSkill = async id => {
    const del = async id => {
      setIsFullScreenLoading(true);
      try {
        await advancedSkillService.deleteAdvancedSkillById(id);

        dispatch(reloadAdvancedSkill());
        toastMessages.success('Xóa thành công.');
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const isOk = await SheetManager.show('confirm-sheet', {
      payload: {
        title: 'Xóa kỹ năng chuyên môn',
        description: 'Bạn có chắc chắn muốn xóa kỹ năng chuyên môn này không?',
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
                      <TouchableOpacity
                        onPress={() => handleDeleteAdvancedSkill(value.id)}>
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
                          navigation.navigate('AddOrEditAdvancedSkillScreen', {
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

export default AdvancedSkillCard;
