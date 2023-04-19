import React from 'react';
import {useDispatch} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import {View} from 'native-base';

import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import errorHandling from '../../utils/errorHandling';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import AddOrEditLanguageSkillForm from '../components/forms/AddOrEditLanguageSkillForm';
import languageSkillService from '../../services/languageSkillService';
import {reloadLanguageSkill} from '../../redux/reloadSlice';

const AddOrEditLanguageSkillScreen = ({route, navigation}) => {
  const {id, resumeId} = route.params;
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [serverErrors, setServerErrors] = React.useState(null);

  React.useLayoutEffect(() => {
    if (id) {
      navigation.setOptions({title: 'Cập nhật kỹ năng ngôn ngữ'});
    } else {
      navigation.setOptions({title: 'Thêm kỹ năng ngôn ngữ'});
    }
  }, []);

  React.useEffect(() => {
    if (id) {
      const loadLanguageSkillDetailById = async languageSkillId => {
        setIsLoading(true);

        try {
          const resData = await languageSkillService.getLanguageSkillById(
            languageSkillId,
          );
          setEditData(resData.data);
        } catch (error) {
          toastMessages.error();
        } finally {
          setIsLoading(false);
        }
      };

      loadLanguageSkillDetailById(id);
    }
  }, [id]);

  const handleAddOrUpdate = data => {
    setIsFullScreenLoading(true);

    const create = async data => {
      try {
        await languageSkillService.addLanguageSkills(data);

        dispatch(reloadLanguageSkill());
        navigation.goBack();
        toastMessages.success('Thêm thành công.');
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const update = async data => {
      try {
        await languageSkillService.updateLanguageSkillById(data.id, data);

        toastMessages.success('Cập nhật thành công.');
        dispatch(reloadLanguageSkill());
        navigation.goBack();
      } catch (error) {
        errorHandling(error, setServerErrors);
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
      paddingX={6}
      paddingBottom={6}
      onLayout={handleLayout}
      style={{marginTop: headerHeight}}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <>
          {isLoading ? (
            <AddOrEditLanguageSkillForm.Loading />
          ) : (
            <AddOrEditLanguageSkillForm
              handleAddOrUpdate={handleAddOrUpdate}
              editData={editData}
              serverErrors={serverErrors}
            />
          )}
        </>
      )}
      {isFullScreenLoading && <BackdropLoading />}
    </View>
  );
};

export default AddOrEditLanguageSkillScreen;
