import React from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import COLORS from '../../constants/colors';
import TouchableOpacityCustom from '../../components/TouchableOpacityCustom';

const {width: screenWidth} = Dimensions.get('window');
const SuccessfullyScreen = ({navigation}) => {
  const handleContinue = () => {
    console.log('on open email.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.areaText}>
        <Text style={styles.titleText}>Thành công</Text>
        <Text style={styles.subTitleText}>
          Mật khẩu của bạn đã được cập nhật, vui lòng thay đổi mật khẩu thường
          xuyên để tránh điều này xảy ra
        </Text>
      </View>
      <View style={styles.areaImage}>
        <View>
          <Image
            style={{width: screenWidth / 3, height: screenWidth / 3}}
            resizeMode="contain"
            source={require('../../assets/images/successfully.png')}
          />
        </View>
      </View>
      <View style={styles.areaButton}>
        <View style={styles.button}>
          <View>
            <TouchableOpacityCustom
              text="TIẾP TỤC"
              textColor={COLORS.white}
              bgColor={COLORS.primary}
              onPress={handleContinue}
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
  areaButton: {
    flex: 4,
  },
  button: {
    paddingHorizontal: 30,
  },
});

export default SuccessfullyScreen;
