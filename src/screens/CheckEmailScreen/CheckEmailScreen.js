import React from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../constants/colors';
import TouchableOpacityCustom from '../../components/TouchableOpacityCustom';

const {width: screenWidth} = Dimensions.get('window');
const CheckEmailScreen = ({navigation}) => {
  const handleOpenEmail = () => {
    console.log('on open email.');
  };

  const handleResendEmail = () => {
    console.log('on resend email.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.areaText}>
        <Text style={styles.titleText}>Kiểm tra email của bạn</Text>
        <Text style={styles.subTitleText}>
          Chúng tôi đã gửi mật khẩu đặt lại đến địa chỉ email khuy220@gmail.com
        </Text>
      </View>
      <View style={styles.areaImage}>
        <View>
          <Image
            style={{width: screenWidth / 3, height: screenWidth / 3}}
            resizeMode="contain"
            source={require('../../assets/images/check-your-email.png')}
          />
        </View>
      </View>
      <View style={styles.areaButton}>
        <View style={styles.button}>
          <View>
            <TouchableOpacityCustom
              text="MỞ EMAIL CỦA BẠN"
              textColor={COLORS.white}
              bgColor={COLORS.primary}
              onPress={handleOpenEmail}
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
        <View style={styles.question}>
          <Text style={styles.resendText}>
            Bạn chưa nhận được email?{' '}
            <Text
              style={{
                color: COLORS.secondary,
                textDecorationLine: 'underline',
              }}
              onPress={handleResendEmail}>
              Gửi lại
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
  areaButton: {
    flex: 4,
  },
  button: {
    paddingHorizontal: 30,
  },
  question: {paddingTop: 16},
  resendText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.text,
    textAlign: 'center',
  },
});

export default CheckEmailScreen;
