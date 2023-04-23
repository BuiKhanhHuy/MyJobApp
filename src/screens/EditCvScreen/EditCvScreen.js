import React from 'react';
import {useDispatch} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import {View} from 'native-base';

import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import resumeService from '../../services/resumeService';
import EditCvForm from '../components/forms/EditCvForm';
import {reloadAttachedProfile} from '../../redux/reloadSlice';

const EditCvScreen = ({route, navigation}) => {
  const {resumeId} = route.params;
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({title: 'Cập nhật tập tin'});
  }, []);

  const handleUpdate = data => {
    const updateCV = async (id, data) => {
      setIsFullScreenLoading(true);

      var formData = new FormData();
      formData.append('file', {
        uri: data.file.uri,
        type: data.file.type,
        name: data.file.name,
      });
      try {
        await resumeService.updateCV(id, formData);

        dispatch(reloadAttachedProfile());
        navigation.goBack();
        toastMessages.success('Upload File thành công.');
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    updateCV(resumeId, data);
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
          <EditCvForm handleUpdate={handleUpdate} />
        </>
      )}
      {isFullScreenLoading && <BackdropLoading />}
    </View>
  );
};

export default EditCvScreen;
