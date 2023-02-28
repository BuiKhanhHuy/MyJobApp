import React from 'react';
import {Box, ScrollView, Text, View, VStack} from 'native-base';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';

import SignUpForm from '../components/forms/SignUpForm';


const SignUpScreen = ({navigation}) => {
  const handleSignUp = data => {
    console.log('SIGN UP DATA: ', data);
  };

  const handleFacebookSignUp = () => {
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

  const handleGoogleSignUp = () => {};

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View paddingX="7" paddingTop="12" flex={1}>
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
              Khi bạn đăng ký bằng Facebook, Google, mặc định bạn đồng ý với
              Điều khoản và Chính sách bảo mật của MyJob
            </Text>
          </VStack>
        </View>
        <View flex={10} justifyContent="flex-end">
          {/* Start: Sign up form here */}
          <SignUpForm
            handleSignUp={handleSignUp}
            handleFacebookSignUp={handleFacebookSignUp}
            handleGoogleSignUp={handleGoogleSignUp}
          />
          {/* End: Sign up form here */}
        </View>
        <View flex={1}>
          <Box alignItems="center" paddingTop="6">
            <Text fontFamily="dMSansRegular" fontSize="xs" lineHeight="xs">
              <Text>Bạn đã có tài khoản?</Text>{' '}
              <Text color="myJobCustomColors.neonCarrot">Đăng nhập</Text>
            </Text>
          </Box>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
