import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

const LogoScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContent}>
        <Image
          style={styles.logoImage}
          source={require('../../assets/images/logo/icon.png')}
        />
        <Text style={styles.logoName}>MyJob</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#130160',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContent: {
    alignItems: 'center',
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  logoName: {
    marginTop: 1,
    fontFamily: 'DMSans-Bold',
    fontSize: 26,
    lineHeight: 34,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default LogoScreen;
