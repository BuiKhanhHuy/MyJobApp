import React from 'react';
import {
  Box,
  Text,
  View,
  VStack,
  ScrollView,
  Alert,
  HStack,
  CloseIcon,
  IconButton,
} from 'native-base';
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
  PLATFORM,
  ROLES_NAME,
} from '../../configs/constants';
import {useLayout} from '../../hooks';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import SignUpForm from '../components/forms/SignUpForm';
import authService from '../../services/authService';
import tokenService from '../../services/tokenService';
import {getUserInfo} from '../../redux/userSlice';
import errorHandling from '../../utils/errorHandling';
import {updateVerifyEmail} from '../../redux/authSlice';

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState({});

  const handleRegister = data => {
    setIsFullScreenLoading(true);
    setErrorMessage('');

    const register = async (data, roleName) => {
      try {
        await authService.jobSeekerRegister(data);

        dispatch(
          updateVerifyEmail({
            isAllowVerifyEmail: true,
            email: data?.email,
            roleName: roleName,
          }),
        );

        navigation.navigate('CheckEmail');
      } catch (error) {
        // 400 bad request
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    register(
      {
        ...data,
        platform: PLATFORM,
      },
      ROLES_NAME.JOB_SEEKER,
    );
  };

  const handleSocialRegister = async (
    clientId,
    clientSecrect,
    provider,
    token,
  ) => {
    setIsFullScreenLoading(true);
    setErrorMessage('');

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
      console.log('LOGIN MXH: ', error.response.data);
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

  const handleFacebookRegister = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken().then(data => {
            const facebookAccessToken = data.accessToken.toString();

            handleSocialRegister(
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

  const handleGoogleRegister = async () => {
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
                      Đăng ký tài khoản
                    </Text>
                    <Text textAlign="center" paddingTop="1.5">
                      Khi bạn đăng ký bằng Facebook, Google, mặc định bạn đồng ý
                      với Điều khoản và Chính sách bảo mật của MyJob
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
                  <SignUpForm
                    handleRegister={handleRegister}
                    handleFacebookRegister={handleFacebookRegister}
                    handleGoogleRegister={handleGoogleRegister}
                    serverErrors={serverErrors}
                  />
                  {/* End: Sign up form here */}
                </View>
                <View flex={1}>
                  <Box alignItems="center" paddingTop="6">
                    <Text
                      fontFamily="dMSansRegular"
                      fontSize="xs"
                      lineHeight="xs">
                      <Text>Bạn đã có tài khoản?</Text>{' '}
                      <Text
                        color="myJobCustomColors.neonCarrot"
                        onPress={() => navigation.navigate('Login')}>
                        Đăng nhập
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

export default SignUpScreen;
