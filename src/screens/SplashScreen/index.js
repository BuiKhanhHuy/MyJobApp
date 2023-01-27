import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './style';

const SplashScreen = () => {
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
        <Text style={[styles.titleText, styles.titleTextLine1]}>Find Your</Text>
        <Text style={[styles.titleText, styles.titleTextLine2]}>Dream Job</Text>
        <Text style={[styles.titleText, styles.titleTextLine3]}>Here!</Text>
        <Text style={styles.subText}>
          Explore all the most exciting job roles based on your interest and
          study major.
        </Text>
      </View>
      <View style={styles.footerArea}>
        <TouchableOpacity style={styles.nextButton}>
          <AntDesign name="arrowright" style={styles.arrowRightIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;
