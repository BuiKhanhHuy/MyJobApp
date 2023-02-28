import React from 'react';
import {Center, Image, Text, View, VStack} from 'native-base';

import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import tokenService from '../../services/tokenService';

const ForgotPasswordScreen = ({navigation}) => {
  const handleResetPassword = async () => {
    await tokenService.removeLocalAccessTokenAndRefreshToken('MyJob');
    console.log('>> RESET PASSWORD.');
  };

  return (
    <View paddingX="7" paddingTop="12" flex={1}>
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
        <ForgotPasswordForm handleResetPassword={handleResetPassword} />
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
