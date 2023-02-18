import React from 'react';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const JobPost = () => {
  const keyworkDescription = name => {
    return (
      <View
        style={{
          paddingVertical: 7,
          paddingHorizontal: 23,
          borderRadius: 8,
          backgroundColor: '#cbc9d4',
          marginRight: 10,
        }}>
        <Text
          style={{
            lineHeight: 13,
            fontSize: 10,
            color: '#524b6b',
            fontFamily: 'DMSans-Medium',
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
          <Feather name="bookmark" size={20} color={'#524b6b'} />
        </View>
      </View>
      <View style={{paddingTop: 10}}>
        <Text
          style={{
            fontFamily: 'DMSans-Bold',
            color: '#150a33',
            fontSize: 14,
            height: 18,
            lineHeight: 18,
          }}>
          UI/UX Designer
        </Text>
      </View>
      <View style={{paddingTop: 4}}>
        <Text
          style={{
            height: 16,
            lineHeight: 16,
            fontSize: 12,
            color: '#524b6b',
            fontFamily: 'DMSans-Medium',
          }}>
          Google inc - California, USA
        </Text>
      </View>
      <View style={{paddingVertical: 20}}>
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
              fontSize: 10,
              lineHeight: 13,
              fontFamily: 'DMSans-Regular',
              color: '#aaa6b9',
            }}>
            25 minutes ago
          </Text>
        </View>
        <View>
          <Text>
            <Text
              style={{
                lineHeight: 18,
                fontSize: 14,
                fontFamily: 'DMSans-Bold',
                color: '#000',
              }}>
              $14k
            </Text>
            <Text
              style={{
                lineHeight: 16,
                fontSize: 12,
                fontFamily: 'DMSans-Medium',
                color: '#aaa6b9',
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
    height: 210,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
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
