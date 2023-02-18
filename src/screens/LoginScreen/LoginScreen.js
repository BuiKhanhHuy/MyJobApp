import React from 'react';
import {Box, Text, View, VStack} from 'native-base';
import {useForm} from 'react-hook-form';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

import TextInputCustom from '../../components/TextInputCustom';
import ButtonCustom from '../../components/ButtonCustom';

const LoginScreen = ({navigation}) => {
  const {control, handleSubmit} = useForm();

  const handleLogin = data => {
    console.log('LOGIN DATA: ', data);
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
    <View paddingX="7" paddingTop="12">
      <View height="18%">
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Text>
        </VStack>
      </View>
      <View height="45%">
        <VStack space={2}>
          <Box>
            <TextInputCustom
              control={control}
              name="email"
              rules={{required: {value: true, message: 'Email là bắt buộc'}}}
              label="Email"
              placeholder="Nhập email"
            />
          </Box>
          <Box>
            <TextInputCustom
              control={control}
              name="password"
              rules={{required: {value: true, message: 'Mật khẩu là bắt buộc'}}}
              placeholder="Nhập mật khẩu"
              label="Mật khẩu"
              secureTextEntry={true}
            />
          </Box>
          <Box></Box>
        </VStack>
      </View>
      <View >
        <VStack space={4} paddingX="4">
          <Box>
            <ButtonCustom
              text="ĐĂNG NHẬP"
              textColor="myJobCustomColors.white"
              bgColor="myJobCustomColors.darkIndigo"
              onPress={handleSubmit(handleLogin)}
            />
          </Box>
          <Box>
            <ButtonCustom
              text="ĐĂNG VỚI FACEBOOK"
              textColor="myJobCustomColors.darkIndigo"
              bgColor="myJobCustomColors.moonrakerPurplyBlue"
              leftIcon={{
                iconName: 'facebook',
                iconColor: 'myJobCustomColors.darkIndigo',
              }}
              onPress={handleFacebookLogin}
            />
          </Box>
          <Box>
            <ButtonCustom
              text="ĐĂNG NHẬP VỚI GOOGLE"
              textColor="myJobCustomColors.darkIndigo"
              bgColor="myJobCustomColors.moonrakerPurplyBlue"
              leftIcon={{
                iconName: 'google',
                iconColor: 'myJobCustomColors.darkIndigo',
              }}
              onPress={handleGoogleLogin}
            />
          </Box>
          <Box alignItems="center" paddingTop="1.5">
            <Text fontFamily="dMSansRegular" fontSize="xs" lineHeight="xs">
              <Text>Bạn chưa có tài khoản?</Text>{' '}
              <Text color="myJobCustomColors.neonCarrot">Đăng ký</Text>
            </Text>
          </Box>
        </VStack>
      </View>
    </View>
  );
};

export default LoginScreen;
