import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {View} from 'native-base';
import {StatusBar} from 'react-native';

import {useLayout} from '../../hooks';
import {APP_NAME} from '../../configs/constants';
import toastMessages from '../../utils/toastMessages';
import errorHandling from '../../utils/errorHandling';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import ChangePasswordForm from '../components/forms/ChangePasswordForm';
import tokenService from '../../services/tokenService';
import authService from '../../services/authService';
import {removeUserInfo} from '../../redux/userSlice';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState(null);

  const handleUpdate = data => {
    const update = async data => {
      setIsFullScreenLoading(true);
      try {
        await authService.changePassword(data);

        const accessToken = await tokenService.getLocalAccessToken(APP_NAME);
        dispatch(removeUserInfo(accessToken))
          .then(() => {
            setIsFullScreenLoading(false);
            navigation.navigate('Login');
            toastMessages.success('Đổi mật khẩu thành công.');
          })
          .catch(err => {
            toastMessages.error('Đã xảy ra lỗi!');
            setIsFullScreenLoading(false);
          });
      } catch (error) {
        errorHandling(error, setServerErrors);
        setIsFullScreenLoading(false);
      }
    };

    update(data);
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
            <ChangePasswordForm
              handleUpdate={handleUpdate}
              serverErrors={serverErrors}
            />
          </>
        )}
        {isFullScreenLoading && <BackdropLoading />}
      </View>
    </>
  );
};

export default ChangePasswordScreen;
