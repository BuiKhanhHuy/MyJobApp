import React from 'react';
import {Text, View, VStack, ScrollView} from 'native-base';

import {PLATFORM} from '../../configs/constants';
import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import ResetPasswordForm from '../components/forms/ResetPasswordForm/ResetPasswordForm';
import errorHandling from '../../utils/errorHandling';
import authService from '../../services/authService';

const ResetPasswordScreen = ({navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState({});

  const handleResetPassword = data => {
    setIsFullScreenLoading(true);

    const resetPass = async data => {
      try {
        await authService.resetPassword(data);

        navigation.navigate('Login');
        toastMessages.success('Cập nhật mật khẩu thành công.');
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    resetPass({
      ...data,
      platform: PLATFORM,
    });
  };

  return (
    <>
      <View flex={1} onLayout={handleLayout}>
        {isFullScreenLoading && <BackdropLoading />}

        {isLayoutLoading ? (
          <BackdropLoading />
        ) : (
          <>
            <ScrollView showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
              <View paddingX="4" paddingY="12" flex={1}>
                <View flex={1}>
                  <VStack alignItems="center">
                    <Text
                      textAlign="center"
                      fontFamily="dMSansBold"
                      fontSize="3xl"
                      lineHeight="md"
                      color="myJobCustomColors.purpleBlue">
                      Quên mật khẩu
                    </Text>
                  </VStack>
                </View>
                <View flex={10} justifyContent="flex-end" pt={10}>
                  {/* Start: ResetPasswordForm here */}
                  <ResetPasswordForm
                    handleResetPassword={handleResetPassword}
                    serverErrors={serverErrors}
                  />
                  {/* End: ResetPasswordForm here */}
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
};

export default ResetPasswordScreen;
