import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const JobTypePopular = ({imageUrl = null, title, subTitle, bgColor}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: '100%',
          backgroundColor: bgColor,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {imageUrl && (
          <View style={{paddingBottom: 24}}>
            <Image source={imageUrl} style={{width: 34, height: 34}} />
          </View>
        )}
        <Text
          style={[
            styles.text,
            {
              fontFamily: 'DMSans-Bold',
            },
          ]}>
          {title}
        </Text>
        <Text style={[styles.text, {fontFamily: 'DMSans-Medium'}]}>
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
    color: '#0d0140',
  },
});

export default JobTypePopular;
