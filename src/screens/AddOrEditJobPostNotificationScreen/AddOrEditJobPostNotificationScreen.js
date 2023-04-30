import React from 'react';
import {useDispatch} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import {View} from 'native-base';

import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import errorHandling from '../../utils/errorHandling';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import AddOrEditJobPostNotificationForm from '../components/forms/AddOrEditJobPostNotificationForm';
import jobPostNotificationService from '../../services/jobPostNotificationService';
import {reloadJobPostNotification} from '../../redux/reloadSlice';
import {SheetManager} from 'react-native-actions-sheet';

const AddOrEditJobPostNotificationScreen = ({route, navigation}) => {
  const {id} = route.params;
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  React.useLayoutEffect(() => {
    if (id) {
      navigation.setOptions({title: 'Cập nhật thông báo việc làm'});
    } else {
      navigation.setOptions({title: 'Thêm thông báo việc làm'});
    }
  }, []);

  React.useEffect(() => {
    const loadJobPostNotificationDetailById = async id => {
      setIsLoading(true);
      try {
        const resData =
          await jobPostNotificationService.getJobPostNotificationDetailById(id);
        var data = resData.data;
        setEditData(data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      loadJobPostNotificationDetailById(id);
    }
  }, [id]);

  const handleAddOrUpdate = data => {
    setIsFullScreenLoading(true);

    const create = async data => {
      try {
        await jobPostNotificationService.addJobPostNotification(data);

        dispatch(reloadJobPostNotification());
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
        await jobPostNotificationService.updateJobPostNotificationById(
          data.id,
          data,
        );

        dispatch(reloadJobPostNotification());
        navigation.goBack();
        toastMessages.success('Cập nhật thành công.');
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    if (id) {
      update(data);
    } else {
      create(data);
    }
  };

  const handleDeleteJobPostNotification = async id => {
    const del = async id => {
      setIsFullScreenLoading(true);

      try {
        await jobPostNotificationService.deleteJobPostNotificationDetailById(
          id,
        );

        dispatch(reloadJobPostNotification());
        navigation.goBack();
        toastMessages.success('Xóa thành công.');
      } catch (error) {
        console.log(error)
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const isOk = await SheetManager.show('confirm-sheet', {
      payload: {
        title: 'Xóa thông báo việc làm',
        description: 'Bạn có chắc chắn muốn xóa thông báo việc làm này không?',
        yesText: 'Đồng ý',
        noText: 'Hủy bỏ',
      },
    });

    if (isOk) {
      del(id);
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
            <AddOrEditJobPostNotificationForm.Loading />
          ) : (
            <AddOrEditJobPostNotificationForm
              handleAddOrUpdate={handleAddOrUpdate}
              handleDelete={handleDeleteJobPostNotification}
              editData={editData}
            />
          )}
        </>
      )}
      {isFullScreenLoading && <BackdropLoading />}
    </View>
  );
};

export default AddOrEditJobPostNotificationScreen;
