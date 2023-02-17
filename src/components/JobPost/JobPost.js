import React from 'react';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  Border,
  Color,
  FontFamily,
  FontSize,
  Margin,
  Padding,
} from '../../constants/globalStyles';

const JobPost = () => {
  const keyworkDescription = name => {
    return (
      <View
        style={{
          paddingVertical: 7,
          paddingHorizontal: 23,
          borderRadius: Border.br_8xs,
          backgroundColor: Color.lightgray_100,
          marginRight: Margin.m_10xs,
        }}>
        <Text
          style={{
            lineHeight: 13,
            fontSize: FontSize.size_10xs,
            color: Color.dimgray,
            fontFamily: FontFamily.dMSansMedium,
          }}>
          {name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image
            source={{uri: 'https://img.icons8.com/fluency/1x/google-logo.png'}}
            style={styles.logo}
          />
        </View>
        <View style={{justifyContent: 'flex-start'}}>
          <Feather
            name="bookmark"
            size={FontSize.size_10sm}
            color={Color.dimgray}
          />
        </View>
      </View>
      <View style={{paddingTop: Padding.p_10xs}}>
        <Text
          style={{
            fontFamily: FontFamily.dMSansBold,
            color: Color.gray_300,
            fontSize: FontSize.size_4sm,
            height: 18,
            lineHeight: 18,
          }}>
          UI/UX Designer
        </Text>
      </View>
      <View style={{paddingTop: Padding.p_4xs}}>
        <Text
          style={{
            height: 16,
            lineHeight: 16,
            fontSize: FontSize.size_2sm,
            color: Color.dimgray,
            fontFamily: FontFamily.dMSansMedium,
          }}>
          Google inc - California, USA
        </Text>
      </View>
      <View style={{paddingVertical: Padding.p_10sm}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {[
            keyworkDescription('Design'),
            keyworkDescription('Ho Chi Minh City'),
            keyworkDescription('Work from home'),
            keyworkDescription('Manager'),
          ]}
        </ScrollView>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text
            style={{
              fontSize: FontSize.size_10xs,
              lineHeight: 13,
              fontFamily: FontFamily.dMSansRegular,
              color: Color.darkgray_100,
            }}>
            25 minutes ago
          </Text>
        </View>
        <View>
          <Text>
            <Text
              style={{
                lineHeight: 18,
                fontSize: FontSize.size_4sm,
                fontFamily: FontFamily.dMSansBold,
                color: Color.black,
              }}>
              $14k
            </Text>
            <Text
              style={{
                lineHeight: 16,
                fontSize: FontSize.size_2sm,
                fontFamily: FontFamily.dMSansMedium,
                color: Color.darkgray_100,
              }}>
              /mon
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Color.white,
    borderRadius: Border.br_10sm,
    padding: Padding.p_10sm,
    shadowOpacity: 0.18,
    shadowColor: '#99ABC6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default JobPost;
