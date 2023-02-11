import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckBox} from '@rneui/themed';
import {useForm} from 'react-hook-form';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import COLORS from '../../constants/colors';
import TextInputCustom from '../../components/TextInputCustom';
import TouchableOpacityCustom from '../../components/TouchableOpacityCustom';

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
    <View style={styles.container}>
      <View style={styles.areaText}>
        <Text style={styles.titleText}>Chào mừng trở lại</Text>
        <Text style={styles.subTitleText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </Text>
      </View>
      <View style={styles.areaInput}>
        <View>
          <Text style={styles.titleInput}>Email</Text>
          <View style={{paddingTop: 10}}>
            <TextInputCustom
              control={control}
              name="email"
              rules={{required: {value: true, message: 'Email là bắt buộc'}}}
              placeholder="Nhập email"
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={[{marginTop: 14}]}>
          <Text style={styles.titleInput}>Mật khẩu</Text>
          <View style={{paddingTop: 10}}>
            <TextInputCustom
              control={control}
              name="password"
              rules={{required: {value: true, message: 'Mật khẩu là bắt buộc'}}}
              placeholder="Nhập mật khẩu"
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={{paddingTop: 20, flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <CheckBox
              size={24}
              title="Nhớ thông tin đăng nhập"
              fontFamily="DMSans-Medium"
              textStyle={{fontSize: 12}}
              containerStyle={{
                backgroundColor: 'transparent',
                margin: 0,
                marginLeft: 0,
                padding: 0,
              }}
            />
          </View>
          <View
            style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            <Text
              style={[styles.titleInput, {textAlignVertical: 'center'}]}
              onPress={() => navigation.navigate('ForgotPassword')}>
              Quên mật khẩu?
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.areaButton}>
        <View style={styles.button}>
          <View>
            <TouchableOpacityCustom
              text="ĐĂNG NHẬP"
              textColor={COLORS.white}
              bgColor={COLORS.primary}
              onPress={handleSubmit(handleLogin)}
            />
          </View>
          <View style={{marginTop: 19}}>
            <TouchableOpacityCustom
              text="ĐĂNG NHẬP VỚI FACEBOOK"
              textColor={COLORS.white}
              bgColor={'#1a77f2'}
              onPress={handleFacebookLogin}
            />
          </View>
          <View style={{marginTop: 19}}>
            <TouchableOpacityCustom
              text="ĐĂNG NHẬP VỚI GOOGLE"
              textColor={COLORS.white}
              bgColor={'#dc4e41'}
              onPress={handleGoogleLogin}
            />
          </View>
        </View>
        <View style={styles.question}>
          <Text style={styles.signUpText}>
            Bạn chưa có tài khoản?{' '}
            <Text
              style={{
                color: COLORS.secondary,
                textDecorationLine: 'underline',
              }}
              onPress={() => navigation.navigate('SignUp')}>
              Đăng ký
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 29,
    height: '100%',
    backgroundColor: COLORS.background,
    flex: 1,
    flexDirection: 'column',
  },
  areaText: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'DMSans-Bold',
    fontSize: 30,
    lineHeight: 39,
    textAlign: 'center',
    paddingTop: 11,
    color: COLORS.bigTitle,
  },
  subTitleText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    color: COLORS.text,
  },
  areaInput: {
    flex: 4,
    paddingTop: 11,
  },
  titleInput: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.bigTitle,
  },
  areaButton: {
    flex: 5,
  },
  button: {
    paddingHorizontal: 30,
  },
  question: {
    flex: 6,
  },
  signUpText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.text,
    paddingTop: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
