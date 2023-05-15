import React from 'react';
import {Text, View, VStack, Image, Center} from 'native-base';

import {useLayout} from '../../hooks';
import {PLATFORM} from '../../configs/constants';
import toastMessages from '../../utils/toastMessages';
import errorHandling from '../../utils/errorHandling';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import authService from '../../services/authService';

const ForgotPasswordScreen = ({navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const handleRequestResetPassword = data => {
    const requestResetPassword = async data => {
      setIsFullScreenLoading(true);

      try {
        await authService.forgotPassword(data);

        navigation.navigate('ResetPasswordScreen');
        toastMessages.success(
          'Mã xác thực thay đổi mật khẩu đã được chuyển đến email của bạn, vui lòng kiểm tra hòm thư.',
        );
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    requestResetPassword({
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
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View paddingX="4" paddingTop="12" flex={1}>
              <View flex={0.5}>
                <VStack alignItems="center">
                  <Text
                    textAlign="center"
                    fontFamily="dMSansBold"
                    fontSize="3xl"
                    lineHeight="md"
                    color="myJobCustomColors.purpleBlue">
                    Quên mật khẩu
                  </Text>
                  <Text textAlign="center" paddingTop="1.5">
                    Để đặt lại mật khẩu, bạn cần có email có thể được xác thực
                  </Text>
                </VStack>
              </View>
              <View justifyContent="center" alignItems="center" flex={1.5}>
                <Center>
                  <Image
                    source={require('../../assets/images/forgot-password.png')}
                    alt="IMAGE"
                    size="xl"
                    resizeMode="contain"
                  />
                </Center>
              </View>
              <View flex={3}>
                <ForgotPasswordForm
                  handleRequestResetPassword={handleRequestResetPassword}
                />
              </View>
            </View>
            {/* </ScrollView> */}
          </>
        )}
      </View>
    </>
  );
};

export default ForgotPasswordScreen;
