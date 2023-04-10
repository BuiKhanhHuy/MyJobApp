import React from 'react';
import {Box, Text, View, VStack} from 'native-base';
import {getUserInfo} from '../../redux/userSlice';
import {useDispatch} from 'react-redux';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

import {
  APP_NAME,
  AUTH_CONFIG,
  AUTH_PROVIDER,
  ROLES_NAME,
} from '../../configs/constants';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import LoginForm from '../components/forms/LoginForm';
import authService from '../../services/authService';
import tokenService from '../../services/tokenService';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleLogin = data => {
    const getAccesToken = async (email, password, role_name) => {
      setIsFullScreenLoading(true);

      try {
        const resData = await authService.getToken(email, password, role_name);
        const {access_token: accessToken, refresh_token: refreshToken} =
          resData.data;

        // save store
        const isSaveToken =
          await tokenService.updateLocalAccessTokenAndRefreshToken(
            APP_NAME,
            accessToken,
            refreshToken,
          );
        if (isSaveToken) {
          dispatch(getUserInfo())
            .unwrap()
            .then(res => {
              navigation.navigate('MainTab');
            })
            .catch(err => {
              toastMessages.error();
            });
        } else {
          toastMessages.error();
        }
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(true);
      }
    };

    getAccesToken(data.email, data.password, ROLES_NAME.JOB_SEEKER);
  };

  const handleSocialLogin = async (
    clientId,
    clientSecrect,
    provider,
    token,
  ) => {
    setIsFullScreenLoading(true);

    try {
      const resData = await authService.convertToken(
        clientId,
        clientSecrect,
        provider,
        token,
      );
      const {access_token: accessToken, refresh_token: refreshToken} =
        resData.data;

      // save store
      const isSaveToken =
        await tokenService.updateLocalAccessTokenAndRefreshToken(
          APP_NAME,
          accessToken,
          refreshToken,
        );
      if (isSaveToken) {
        dispatch(getUserInfo())
          .unwrap()
          .then(() => {
            navigation.navigate('MainTab');
          })
          .catch(() => {
            toastMessages.error();
          });
      } else {
        toastMessages.error();
      }
    } catch (error) {
      // 400 bad request
      const res = error.response;
      if (res.status === 400) {
        const errors = res.data?.errors;
        if ('errorMessage' in errors) {
          setErrorMessage(errors.errorMessage.join(' '));
        } else {
          toastMessages.error();
        }
      }
    } finally {
      setIsFullScreenLoading(true);
    }
  };

  const handleFacebookLogin = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken().then(data => {
            const facebookAccessToken = data.accessToken.toString();

            handleSocialLogin(
              AUTH_CONFIG.CLIENT_ID,
              AUTH_CONFIG.CLIENT_SECRECT,
              AUTH_PROVIDER.FACEBOOK,
              facebookAccessToken,
            );
          });
        }
      },
      function (error) {
        toastMessages.error();
      },
    );
  };

  const handleGoogleLogin = () => {};

  return (
    <>
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

      {/* Start: Full Screen Loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: Full Screen Loading */}
    </>
  );
};

export default LoginScreen;
