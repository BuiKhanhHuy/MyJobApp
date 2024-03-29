import React from 'react';
import {useDispatch} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import {View} from 'native-base';

import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import EditPersonalProfileForm from '../components/forms/EditPersonalProfileForm';
import jobSeekerProfileService from '../../services/jobSeekerProfileService';
import {reloadPersonalProfile} from '../../redux/reloadSlice';

const EditPersonalProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({title: 'Cập nhật thông tin cá nhân'});
  }, []);

  React.useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);

      try {
        const resData = await jobSeekerProfileService.getProfile();

        setEditData(resData.data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, []);

  const handleUpdate = data => {
    const updateProfile = async data => {
      setIsFullScreenLoading(true);
      try {
        await jobSeekerProfileService.updateProfile(data);

        dispatch(reloadPersonalProfile());
        navigation.goBack();
        toastMessages.success('Cập nhật thành công.');
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    updateProfile(data);
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
              <EditPersonalProfileForm.Loading />
            ) : (
              <EditPersonalProfileForm
                handleUpdate={handleUpdate}
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

export default EditPersonalProfileScreen;
