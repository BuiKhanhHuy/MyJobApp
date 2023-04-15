import React from 'react';
import {useDispatch} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import {View, Text} from 'native-base';

import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import AddOrEditAdvancedSkillForm from '../components/forms/AddOrEditAdvancedSkillForm';
import advancedSkillService from '../../services/advancedSkillService';
import {reloadAdvancedSkill} from '../../redux/reloadSlice';

const AddOrEditAdvancedSkillScreen = ({route, navigation}) => {
  const {id, resumeId} = route.params;
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      const loadAdvancedSkillDetailById = async advancedSkillId => {
        setIsLoading(true);

        try {
          const resData = await advancedSkillService.getAdvancedSkillById(
            advancedSkillId,
          );
          setEditData(resData.data);
        } catch (error) {
          toastMessages.error();
        } finally {
          setIsLoading(false);
        }
      };

      loadAdvancedSkillDetailById(id);
    }
  }, [id]);

  const handleAddOrUpdate = data => {
    setIsFullScreenLoading(true);

    const create = async data => {
      try {
        await advancedSkillService.addAdvancedSkills(data);

        toastMessages.success('Thêm thành công.');
        dispatch(reloadAdvancedSkill());
        navigation.goBack();
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const update = async data => {
      try {
        await advancedSkillService.updateAdvancedSkillById(data.id, data);

        dispatch(reloadAdvancedSkill());
        navigation.goBack();
        toastMessages.success('Cập nhật thành công.');
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    if (id) {
      update(data);
    } else {
      create({
        ...data,
        resume: resumeId,
      });
    }
  };

  return (
    <View
      flex={1}
      padding={6}
      onLayout={handleLayout}
      style={{marginTop: headerHeight}}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <>
          <View flex={1}>
            <Text
              fontFamily="dMSansBold"
              lineHeight="xl"
              fontSize="lg"
              color="myJobCustomColors.haitiBluePurple">
              About me
            </Text>
          </View>
          {isLoading ? (
            <AddOrEditAdvancedSkillForm.Loading />
          ) : (
            <AddOrEditAdvancedSkillForm
              handleAddOrUpdate={handleAddOrUpdate}
              editData={editData}
            />
          )}
        </>
      )}
      {isFullScreenLoading && <BackdropLoading />}
    </View>
  );
};

export default AddOrEditAdvancedSkillScreen;
