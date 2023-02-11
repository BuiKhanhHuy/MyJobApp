import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.logoName}>MyJob</Text>
      </View>
      <View style={styles.imageArea}>
        <Image
          style={styles.splashImage}
          source={require('../../assets/images/splash.png')}
        />
      </View>
      <View style={styles.titleArea}>
        <Text style={[styles.titleText, styles.titleTextLine1]}>Tìm kiếm</Text>
        <Text style={[styles.titleText, styles.titleTextLine2]}>Công việc </Text>
        <Text style={[styles.titleText, styles.titleTextLine3]}>Tại đây!</Text>
        <Text style={styles.subText}>
          Explore all the most exciting job roles based on your interest and
          study major.
        </Text>
      </View>
      <View style={styles.footerArea}>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("Login")}>
          <AntDesign name="arrowright" style={styles.arrowRightIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.background,
    paddingHorizontal: 32,
    flexDirection: 'column',
    flex: 1,
  },
  headerArea: {
    flex: 1,
  },
  logoName: {
    textAlign: 'right',
    marginTop: 45,
    fontFamily: 'DMSans-Bold',
    fontSize: 22,
    lineHeight: 23,
    color: COLORS.black,
  },
  imageArea: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  splashImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  titleArea: {
    flex: 2,
    marginBottom: 40,
  },
  titleText: {
    fontFamily: 'DMSans-Bold',
    lineHeight: 42,
    fontSize: 40,
  },
  titleTextLine1: {
    color: COLORS.black,
  },
  titleTextLine2: {
    textDecorationLine: 'underline',
    color: COLORS.secondary,
  },
  titleTextLine3: {
    color: COLORS.black,
  },
  subText: {
    fontFamily: 'DMSans-Regular',
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 18,
    marginTop: 15,
  },
  footerArea: {
    flex: 2,
    alignItems: 'flex-end',
  },
nextButton: {
  backgroundColor: COLORS.primary,
  width: 60,
  height: 60,
  borderRadius: 100,
  padding: 18,
  alignItems: 'center',
  justifyContent: 'center',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  elevation: 6,
  shadowColor: COLORS.black,
},
arrowRightIcon: {color: COLORS.white, fontSize: 27},
});

export default SplashScreen;
