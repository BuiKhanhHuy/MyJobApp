import React from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import {useForm} from 'react-hook-form';
import COLORS from '../../constants/colors';
import TextInputCustom from '../../components/TextInputCustom';
import TouchableOpacityCustom from '../../components/TouchableOpacityCustom';

const {width: screenWidth} = Dimensions.get('window');
const ForgotPasswordScreen = ({navigation}) => {
  const {control, handleSubmit} = useForm();

  const handleForgotPassword = data => {
    console.log('Forgot password data: ', data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.areaText}>
        <Text style={styles.titleText}>Quên mật khẩu</Text>
        <Text style={styles.subTitleText}>
          Để đặt lại mật khẩu, bạn cần có email hoặc số điện thoại di động có
          thể được xác thực
        </Text>
      </View>
      <View style={styles.areaImage}>
        <View>
          <Image
            style={{width: screenWidth / 3, height: screenWidth / 3}}
            resizeMode="contain"
            source={require('../../assets/images/forgot-password.png')}
          />
        </View>
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
      </View>
      <View style={styles.areaButton}>
        <View style={styles.button}>
          <View>
            <TouchableOpacityCustom
              text="ĐẶT LẠI MẬT KHẨU"
              textColor={COLORS.white}
              bgColor={COLORS.primary}
              onPress={handleSubmit(handleForgotPassword)}
            />
          </View>
          <View style={{marginTop: 19}}>
            <TouchableOpacityCustom
              text="QUAY LẠI ĐĂNG NHẬP"
              textColor={COLORS.primary}
              bgColor={COLORS.gray1}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
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
    flex: 2,
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
  areaImage: {
    flex: 2.5,
    alignItems: 'center',
  },
  areaInput: {
    flex: 1.5,
    paddingTop: 11,
  },
  titleInput: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.bigTitle,
  },
  areaButton: {
    flex: 4,
  },
  button: {
    paddingHorizontal: 30,
  },
});
export default ForgotPasswordScreen;
