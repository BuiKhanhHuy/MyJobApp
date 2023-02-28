import React from 'react';
import {Box, Text, View, VStack} from 'native-base';
import {getUserInfo} from '../../redux/userSlice';
import {useDispatch} from 'react-redux';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

import authService from '../../services/authService';
import tokenService from '../../services/tokenService';
import LoginForm from '../components/forms/LoginForm';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const handleLogin = data => {
    const getAccesToken = async (email, password, role_name) => {
      try {
        const resData = await authService.getToken(email, password, role_name);
        const {access_token: accessToken, refresh_token: refreshToken} =
          resData.data;
        console.log('LOGIN: ', accessToken);

        // save store
        const isSaveToken =
          await tokenService.updateLocalAccessTokenAndRefreshToken(
            'MyJob',
            accessToken,
            refreshToken,
          );
        if (isSaveToken) {
          dispatch(getUserInfo())
            .unwrap()
            .then(res => {
              console.log('LOGIN THANH CONG');
              navigation.navigate('MainTab');
            })
            .catch(err => {
              console.error('LOGIN THAT BAI: ', err.message);
            });
        } else {
          console.log('SAVE ACCESS TOKEN THAT BAI');
        }
      } catch (error) {
        console.log('LỖI KHI GỌI API LẤY ACCESS TOKEN: ', error);
      } finally {
      }
    };

    getAccesToken(data.email, data.password, 'JOB_SEEKER');
  };

  const handleFacebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('==> Login cancelled');
        } else {
          console.log(
            '==> Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(data => {
            console.log('data: ', data);
            console.log(data.accessToken.toString());
          });
        }
      },
      function (error) {
        console.log('==> Login fail with error: ' + error);
      },
    );
  };

  const handleGoogleLogin = () => {};

  return (
    <View paddingX="7" paddingTop="12" flex={1}>
      <View flex={1}>
        <VStack alignItems="center">
          <Text
            textAlign="center"
            fontFamily="dMSansBold"
            fontSize="3xl"
            lineHeight="md"
            color="myJobCustomColors.purpleBlue">
            Chào mừng trở lại
          </Text>
          <Text textAlign="center" paddingTop="1.5">
            Khi bạn đăng nhập bằng Facebook, Google, mặc định bạn đồng ý với
            Điều khoản và Chính sách bảo mật của MyJob
          </Text>
        </VStack>
      </View>
      <View flex={5} justifyContent="flex-end">
        {/* Start: Login form here */}
        <LoginForm
          handleLogin={handleLogin}
          handleFacebookLogin={handleFacebookLogin}
          handleGoogleLogin={handleGoogleLogin}
        />
        {/* End: Login form here */}
      </View>
      <View flex={2}>
        <Box alignItems="center" paddingTop="6">
          <Text fontFamily="dMSansRegular" fontSize="xs" lineHeight="xs">
            <Text>Bạn chưa có tài khoản?</Text>{' '}
            <Text color="myJobCustomColors.neonCarrot">Đăng ký</Text>
          </Text>
        </Box>
      </View>
    </View>
  );
};

export default LoginScreen;
