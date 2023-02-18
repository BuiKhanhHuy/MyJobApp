import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Input, Icon} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';

import JobPosts from '../../components/JobPosts';

const SearchScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{height: '75%'}}>
          <ImageBackground
            source={require('../../assets/images/backgrounds/search-bg.png')}
            resizeMode="cover"
            imageStyle={{
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}>
            <View
              style={{
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                paddingHorizontal: 20,
                paddingVertical: 20,
                height: '100%',
                justifyContent: 'flex-end',
              }}>
              <View style={{paddingHorizontal: 10}}>
                <View style={{paddingBottom: 17}}>
                  <Input
                    backgroundColor="myJobCustomColors.white"
                    borderRadius="md"
                    borderWidth="0"
                    padding="2"
                    height="10"
                    InputLeftElement={
                      <Icon
                        as={<Fontisto name="search" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                      />
                    }
                    fontFamily="dMSansRegular"
                    fontSize="xs"
                    color="myJobCustomColors.darkIndigo"
                    placeholder="Từ khóa tìm kiếm"
                    lineHeight="2xs"
                  />
                </View>
                <View style={{paddingBottom: 17}}>
                  {/* <TextInputSearch placeholder="Từ khóa bạn đang tìm kiếm" /> */}
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            height: '25%',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: '#130160',
                borderRadius: 10,
                padding: 8,
                marginRight: 15,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SpecializationScreen')}>
                <Image
                  source={require('../../assets/images/icons/filter-icon.png')}
                  resizeMode="contain"
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{flexDirection: 'row'}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {[
                {
                  id: 1,
                  name: 'UX/UI',
                },
                {
                  id: 2,
                  name: 'Lập trình viên',
                },
                {
                  id: 3,
                  name: 'Quản trị kinh doanh',
                },
                {
                  id: 4,
                  name: 'Tài chính ngân hàng',
                },
              ].map(value => (
                <View
                  key={value.id}
                  style={{
                    height: 40,
                    backgroundColor: '#cbc9d4',
                    borderRadius: 10,
                    padding: 13,
                    marginRight: 15,
                  }}>
                  <Text style={styles.categoryText}>{value.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={styles.popularJobs}>
        {/* Start: Job list */}
        <JobPosts />
        {/* End: Job list */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },
  header: {
    flex: 3,
  },
  categoryText: {
    lineHeight: 16,
    fontSize: 12,
    fontFamily: 'DMSans-Medium',
    color: '#524b6b',
  },
  popularJobs: {
    flex: 6,
    paddingHorizontal: 20,
  },
});

export default SearchScreen;
