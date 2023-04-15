import React from 'react';
import {useDispatch} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import {View, Text} from 'native-base';

import {useLayout} from '../../hooks';
import {SheetManager} from 'react-native-actions-sheet';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import AddOrEditExperienceForm from '../components/forms/AddOrEditExperienceForm/AddOrEditExperienceForm';
import expericenDetailService from '../../services/expericenDetailService';
import {reloadExperience} from '../../redux/reloadSlice';

const AddOrEditExperienceScreen = ({route, navigation}) => {
  const {id, resumeId} = route.params;
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      const loadExperienceDetailById = async experienceId => {
        setIsLoading(true);

        try {
          const resData = await expericenDetailService.getExperienceDetailById(
            experienceId,
          );
          setEditData(resData.data);
        } catch (error) {
          toastMessages.error();
        } finally {
          setIsLoading(false);
        }
      };

      loadExperienceDetailById(id);
    }
  }, [id]);

  const handleAddOrUpdate = data => {
    setIsFullScreenLoading(true);

    const create = async data => {
      try {
        await expericenDetailService.addExperienceDetail(data);

        dispatch(reloadExperience());
        navigation.goBack();
        toastMessages.success('Thêm thành công.');
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const update = async data => {
      try {
        await expericenDetailService.updateExperienceDetailById(data.id, data);

        toastMessages.success('Cập nhật thành công.');
        dispatch(reloadExperience());
        navigation.goBack();
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

  const handleUndo = async (title, description, yesText, noText) => {
    const isOk = await SheetManager.show('confirm-sheet', {
      payload: {
        title: title,
        description: description,
        yesText: yesText,
        noText: noText,
      },
    });

    if (isOk) {
      console.log('>>> OK');
    } else {
      console.log('>>> NOT OK');
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
            <AddOrEditExperienceForm.Loading />
          ) : (
            <AddOrEditExperienceForm
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

export default AddOrEditExperienceScreen;
{
  /* <ButtonCustom
              text="DEMO SHOW ACTION"
              textColor="myJobCustomColors.darkIndigo"
              bgColor="myJobCustomColors.moonrakerPurplyBlue"
              onPress={() =>
                handleUndo(
                  'Hoàn tác thay đổi?',
                  'Bạn có chắc chắn muốn thay đổi những gì bạn đã nhập?',
                  'Tiếp tục chỉnh sửa',
                  'Hoàn tác thay đổi',
                )
              }
              shadow={8}
            /> */
}