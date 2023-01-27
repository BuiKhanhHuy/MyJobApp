import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from './style';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.logoName}>MyJob</Text>
      </View>
      <View style={styles.imageArea}></View>
      <View style={styles.titleArea}>
        <Text
          style={{
            fontFamily: 'DMSans-Bold',
            lineHeight: 38,
            fontSize: 40,
            color: '#000000',
          }}>
          Find Your
        </Text>
        <Text
          style={{
            fontFamily: 'DMSans-Bold',
            fontSize: 40,
            color: '#FCA34D',
            lineHeight: 38,
            textDecorationLine: 'underline',
          }}>
          Dream Job
        </Text>
        <Text
          style={{
            fontFamily: 'DMSans-Bold',
            lineHeight: 38,
            fontSize: 40,
            color: '#000000',
          }}>
          Here!
        </Text>
        <Text>
          Explore all the most exciting job roles based on your interest and
          study major.
        </Text>
      </View>
      <View style={styles.footerArea}></View>
    </View>
  );
};

export default SplashScreen;
