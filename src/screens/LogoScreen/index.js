import React from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';

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

export default LogoScreen;
