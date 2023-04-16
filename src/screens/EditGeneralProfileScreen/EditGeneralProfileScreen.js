import React from 'react';
import {useDispatch} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import {View} from 'native-base';

import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import EditGeneralProfileForm from '../components/forms/EditGeneralProfileForm';
import resumeService from '../../services/resumeService';
import {reloadGeneralProfile} from '../../redux/reloadSlice';

const EditGeneralProfileScreen = ({route, navigation}) => {
  const {resumeId} = route.params;
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({title: 'Cập nhật thông tin chung'});
  }, []);

  React.useEffect(() => {
    const getResumeDetail = async resumeId => {
      try {
        const resData = await resumeService.getResumeOwner(resumeId);

        setEditData(resData.data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };

    getResumeDetail(resumeId);
  }, [resumeId]);

  const handleUpdate = data => {
    const updateResume = async (resumeId, data) => {
      setIsFullScreenLoading(true);
      try {
        await resumeService.updateResume(resumeId, data);

        dispatch(reloadGeneralProfile());
        navigation.goBack();
        toastMessages.success('Cập nhật thành công.');
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    updateResume(resumeId, data);
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
          {isLoading ? (
            <EditGeneralProfileForm.Loading />
          ) : (
            <EditGeneralProfileForm
              handleUpdate={handleUpdate}
              editData={editData}
            />
          )}
        </>
      )}
      {isFullScreenLoading && <BackdropLoading />}
    </View>
  );
};

export default EditGeneralProfileScreen;
