import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import {Button, Skeleton} from 'native-base';

const JobTypePopular = ({
  id,
  imageUrl = null,
  title,
  subTitle,
  bgColor,
  handleClick,
}) => {
  return (
    <Button
      onPress={() => handleClick(id)}
      _pressed={{
        bg: `${bgColor}:alpha.50`,
      }}
      bg={bgColor}
      style={{
        height: '100%',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
      <View>
        {imageUrl && (
          <View style={{paddingBottom: 24, alignItems: 'center'}}>
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
    </Button>
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
    textAlign: 'center',
  },
});

export default JobTypePopular;
