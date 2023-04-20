import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import {Skeleton} from 'native-base';

const JobTypePopular = ({id, imageUrl = null, title, subTitle, bgColor, handleClick}) => {
  return (
    <TouchableNativeFeedback onPress={() => handleClick(id)}>
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
              <Image source={imageUrl} style={{width: 34, height: 34}} alt="" />
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
    </TouchableNativeFeedback>
  );
};

const Loading = () => {
  return (
    <View style={styles.container}>
      <Skeleton rounded="md" height={'100%'} />
    </View>
  );
};

JobTypePopular.Loading = Loading;

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
