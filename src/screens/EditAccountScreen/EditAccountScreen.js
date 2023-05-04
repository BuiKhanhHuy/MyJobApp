import React from 'react';
import {useDispatch} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import {View} from 'native-base';

import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import errorHandling from '../../utils/errorHandling';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import EditAccountForm from '../components/forms/EditAccountForm';

import {updateUserInfo} from '../../redux/userSlice';

const EditAccountScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState(null);

  const handleUpdateAccount = data => {
    setIsFullScreenLoading(true);
    dispatch(updateUserInfo(data))
      .unwrap()
      .then(() => {
        setIsFullScreenLoading(false);
        navigation.goBack();
        toastMessages.success('Cập nhật thành công.');
      })
      .catch(error => {
        setIsFullScreenLoading(false);
        errorHandling(error, setServerErrors);
      });
  };

  return (
    <>
      <View
        flex={1}
        padding={6}
        onLayout={handleLayout}
        style={{marginTop: headerHeight}}>
        {isLayoutLoading ? (
          <BackdropLoading />
        ) : (
          <>
            <EditAccountForm
              serverErrors={serverErrors}
              handleUpdate={handleUpdateAccount}
            />
          </>
        )}
        {isFullScreenLoading && <BackdropLoading />}
      </View>
    </>
  );
};

export default EditAccountScreen;
