import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Border, Color, FontFamily, Padding} from '../../constants/globalStyles';

const JobTypePopular = ({imageUrl = null, title, subTitle, bgColor}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: '100%',
          backgroundColor: bgColor,
          borderRadius: Border.br_6xs,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {imageUrl && (
          <View style={{paddingBottom: Padding.p_4md}}>
            <Image source={imageUrl} style={{width: 34, height: 34}} />
          </View>
        )}
        <Text
          style={[
            styles.text,
            {
              fontFamily: FontFamily.dMSansBold,
            },
          ]}>
          {title}
        </Text>
        <Text style={[styles.text, {fontFamily: FontFamily.dMSansMedium}]}>
          {subTitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: Color.midnightblue_200,
  },
});

export default JobTypePopular;
