import * as React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {FontFamily, Color, FontSize} from '../../constants/globalStyles';

const LogoScreen = () => {
  return (
    <View style={styles.logo}>
      <View style={styles.logoChild}>
        <Image
          style={styles.logoImage}
          resizeMode="cover"
          source={require('../../assets/images/logo/icon.png')}
        />
        <Text style={styles.myJobText}>MyJob</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    backgroundColor: Color.primary,
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  logoChild: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: 60,
    width: 60,
  },
  myJobText: {
    fontSize: FontSize.size_xxxl,
    lineHeight: 34,
    fontFamily: FontFamily.dMSansBold,
    color: Color.white,
  },
});

export default LogoScreen;
