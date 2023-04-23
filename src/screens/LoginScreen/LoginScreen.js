import React from 'react';
import {Alert, Box, ScrollView, Text, View, VStack} from 'native-base';
import {getUserInfo} from '../../redux/userSlice';
import {useDispatch} from 'react-redux';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  APP_NAME,
  AUTH_CONFIG,
  AUTH_PROVIDER,
  ROLES_NAME,
} from '../../configs/constants';
import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import LoginForm from '../components/forms/LoginForm';
import authService from '../../services/authService';
import tokenService from '../../services/tokenService';
import { updateVerifyEmail } from '../../redux/authSlice';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleLogin = data => {
    const getAccesToken = async (email, password, role_name) => {
      setIsFullScreenLoading(true);

      try {
        const resData = await authService.getToken(email, password, role_name);
        const {access_token: accessToken, refresh_token: refreshToken} =
          resData.data;

        console.log('token: ', accessToken);
        console.log('refresh token: ', refreshToken);

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
        // 400 bad request
        const res = error.response;
        if (res.status === 400) {
          const errors = res.data?.errors;
          if ('errorMessage' in errors) {
            setErrorMessage(errors.errorMessage.join(' '));
          } else {
            toastMessages.error('Đã xảy ra lỗi, vui lòng thử lại!');
          }
        }
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const checkCreds = async (email, password, roleName) => {
      setIsFullScreenLoading(true);

      try {
        const resData = await authService.checkCreds(email, roleName);

        const {exists, email: resEmail, email_verified} = resData.data;
        if (exists === true && email_verified === false) {
          dispatch(
            updateVerifyEmail({
              isAllowVerifyEmail: true,
              email: email,
              roleName: roleName,
            }),
          );

          navigation.navigate('CheckEmail');
          return;
        } else if (exists === false) {
          setErrorMessage(
            'Không tồn tại tài khoản ứng viên nào với email này!',
          );
          return;
        }

        getAccesToken(resEmail, password, roleName);
      } catch (error) {
        console.log(error)
        toastMessages.error('Đã xảy ra lỗi, vui lòng đăng nhập lại!');
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    checkCreds(data.email, data.password, ROLES_NAME.JOB_SEEKER);
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
      setIsFullScreenLoading(false);
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

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow: ', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(
          ' operation (e.g. sign in) is in progress already: ',
          error,
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated: ', error);
      } else {
        console.log('some other error happened: ', error);
      }
    }
  };

  return (
    <>
      <View flex={1} onLayout={handleLayout}>
        {isFullScreenLoading && <BackdropLoading />}

        {isLayoutLoading ? (
          <BackdropLoading />
        ) : (
          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View paddingX="7" paddingY="12" flex={1}>
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
                      Khi bạn đăng nhập bằng Facebook, Google, mặc định bạn đồng
                      ý với Điều khoản và Chính sách bảo mật của MyJob
                    </Text>
                    {errorMessage && (
                      <Alert
                        mt={5}
                        mb={2}
                        w="100%"
                        variant="left-accent"
                        status="error">
                        <Text fontFamily="dMSansRegular">{errorMessage}</Text>
                      </Alert>
                    )}
                  </VStack>
                </View>
                <View flex={10} justifyContent="flex-end">
                  {/* Start: Sign up form here */}
                  <LoginForm
                    handleLogin={handleLogin}
                    handleFacebookLogin={handleFacebookLogin}
                    handleGoogleLogin={handleGoogleLogin}
                  />
                  {/* End: Sign up form here */}
                </View>
                <View flex={1}>
                  <Box alignItems="center" paddingTop="6">
                    <Text
                      fontFamily="dMSansRegular"
                      fontSize="xs"
                      lineHeight="xs">
                      <Text>Bạn chưa có tài khoản?</Text>{' '}
                      <Text
                        color="myJobCustomColors.neonCarrot"
                        onPress={() => navigation.navigate('SignUp')}>
                        Đăng ký
                      </Text>
                    </Text>
                  </Box>
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </>
  );
};

export default LoginScreen;
