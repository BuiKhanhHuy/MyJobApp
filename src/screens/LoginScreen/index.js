import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import TextInputCustom from '../../components/TextInputCustom';
import TouchableOpacityCustom from '../../components/TouchableOpacityCustom.js';
import COLORS from '../../assets/colors/colors';

const LoginScreen = () => {
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
            <TextInputCustom />
          </View>
        </View>
        <View style={[{marginTop: 14}]}>
          <Text style={styles.titleInput}>Mật khẩu</Text>
          <View style={{paddingTop: 10}}>
            <TextInputCustom />
          </View>
        </View>
        <View style={styles.options}></View>
      </View>
      <View style={styles.areaButton}>
        <View style={styles.button}>
          <View>
            <TouchableOpacityCustom
              text="ĐĂNG NHẬP"
              textColor={COLORS.white}
              bgColor={COLORS.primary}
            />
          </View>
          <View style={{marginTop: 19}}>
            <TouchableOpacityCustom
              text="ĐĂNG NHẬP VỚI GOOGLE"
              textColor={COLORS.primary}
              bgColor={COLORS.gray1}
            />
          </View>
        </View>
        <View style={styles.question}>
          <Text style={styles.signUpText}>
            You don't have an account yet?{' '}
            <Text
              style={{
                color: COLORS.secondary,
                textDecorationLine: 'underline',
              }}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
