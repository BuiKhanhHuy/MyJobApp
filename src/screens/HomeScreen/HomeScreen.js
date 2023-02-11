import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  FontFamily,
  FontSize,
  Color,
  Border,
  Margin,
} from '../../constants/globalStyles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1}}>
          <View>
            <Text style={styles.welcomeTitle}>Hello</Text>
          </View>
          <View>
            <Text style={styles.welcomeTitle}>Khanh Huy.</Text>
          </View>
        </View>
        <View>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://snack-web-player.s3.us-west-1.amazonaws.com/v2/46/static/media/react-native-logo.79778b9e.png',
            }}
          />
        </View>
      </View>
      <View style={styles.banner}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{
            uri: 'https://res.cloudinary.com/dtnpj540t/image/upload/v1676043960/tam_anh_myjob/a2we0s9as6hzkybn1tn5.png',
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.category}>
        <View>
          <Text>Find Your Job</Text>
        </View>
        <View>
          
        </View>
      </View>
      <View style={styles.jobList}>
        <Text>c</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcomeTitle: {
    fontFamily: FontFamily.dMSansBold,
    color: Color.midnightblue_200,
    fontSize: FontSize.size_xxl,
    lineHeight: 27,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  banner: {
    flex: 4,
  },
  category: {
    flex: 6,
    backgroundColor: 'red',
  },
  jobList: {flex: 4, backgroundColor: 'pink'},
});

export default HomeScreen;
