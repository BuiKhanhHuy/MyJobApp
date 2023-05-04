import React from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {useDispatch} from 'react-redux';
import {View} from 'native-base';

import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import UploadProfileForm from '../components/forms/UploadProfileForm';
import resumeService from '../../services/resumeService';
import {reloadAttachedProfile} from '../../redux/reloadSlice';

const UploadProfileScreen = ({navigation}) => {
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const handleAdd = data => {
    const addResumeUpload = async formData => {
      setIsFullScreenLoading(true);
      try {
        await resumeService.addResume(formData);

        dispatch(reloadAttachedProfile());
        navigation.goBack();
        toastMessages.success('Thêm thành công.');
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    var formData = new FormData();
    for (var key in data) {
      if (key === 'file') {
        formData.append('file', {
          uri: data[key].uri,
          type: data[key].type,
          name: data[key].name,
        });
      } else {
        formData.append(key, data[key]);
      }
    }
    addResumeUpload(formData);
  };
  return (
    <>
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
            <UploadProfileForm handleAdd={handleAdd} />
          </>
        )}
        {isFullScreenLoading && <BackdropLoading />}
      </View>
    </>
  );
};

export default UploadProfileScreen;
