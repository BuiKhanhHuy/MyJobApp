import React from 'react';
import {useDispatch} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import {View} from 'native-base';

import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import AddOrEditEducationForm from '../components/forms/AddOrEditEducationForm';
import educationDetailService from '../../services/educationDetailService';
import {reloadEducation} from '../../redux/reloadSlice';

const AddOrEditEducationScreen = ({route, navigation}) => {
  const {id, resumeId} = route.params;
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  React.useLayoutEffect(() => {
    if (id) {
      navigation.setOptions({title: 'Cập nhật học vấn'});
    } else {
      navigation.setOptions({title: 'Thêm học vấn'});
    }
  }, []);

  React.useEffect(() => {
    if (id) {
      const loadEducationDetailById = async educationId => {
        setIsLoading(true);

        try {
          const resData = await educationDetailService.getEducationDetailById(
            educationId,
          );
          setEditData(resData.data);
        } catch (error) {
          toastMessages.error();
        } finally {
          setIsLoading(false);
        }
      };

      loadEducationDetailById(id);
    }
  }, [id]);

  const handleAddOrUpdate = data => {
    setIsFullScreenLoading(true);

    const create = async data => {
      try {
        await educationDetailService.addEducationsDetail(data);

        dispatch(reloadEducation());
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
        await educationDetailService.updateEducationDetailById(data.id, data);

        toastMessages.success('Cập nhật thành công.');
        dispatch(reloadEducation());
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
        resumeId: resumeId,
      });
    }
  };

  return (
    <>
      <View
        flex={1}
        paddingX={4}
        paddingBottom={6}
        onLayout={handleLayout}
        style={{marginTop: headerHeight}}>
        {isLayoutLoading ? (
          <BackdropLoading />
        ) : (
          <>
            {isLoading ? (
              <AddOrEditEducationForm.Loading />
            ) : (
              <AddOrEditEducationForm
                handleAddOrUpdate={handleAddOrUpdate}
                editData={editData}
              />
            )}
          </>
        )}
        {isFullScreenLoading && <BackdropLoading />}
      </View>
    </>
  );
};

export default AddOrEditEducationScreen;
