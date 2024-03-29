import React from 'react';
import {Image, ImageBackground, TouchableOpacity} from 'react-native';
import {Input, Icon, View, Button} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {useLayout} from '../../hooks';
import FilterJobPostCard from '../../components/FilterJobPostsCard';
import TopCareerCard from '../components/TopCareerCard';
import BackdropLoading from '../../components/loadings/BackdropLoading';

const SearchScreen = ({navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();

  return (
    <>
      <View onLayout={handleLayout} style={{flex: 1}}>
        {isLayoutLoading ? (
          <BackdropLoading />
        ) : (
          <>
            <View
              style={{
                flex: 3,
              }}>
              <View style={{height: '65%'}}>
                <ImageBackground
                  source={require('../../assets/images/backgrounds/search-bg.png')}
                  resizeMode="cover"
                  imageStyle={{
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                  }}>
                  <View
                    paddingX={3}
                    style={{
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 30,
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
                          onPressIn={() =>
                            navigation.navigate('MainJobPostScreen')
                          }
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
                paddingX={3}
                style={{
                  height: '35%',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      backgroundColor: '#130160',
                      borderRadius: 10,
                      padding: 8,
                      marginRight: 15,
                    }}
                    onPress={() => navigation.navigate('SpecializationScreen')}>
                    <Image
                      source={require('../../assets/images/icons/filter-icon.png')}
                      resizeMode="contain"
                      alt=""
                      style={{width: '100%', height: '100%'}}
                    />
                  </TouchableOpacity>

                  {/* Start: TopCareerCard */}
                  <TopCareerCard />
                  {/* End: TopCareerCard */}
                </View>
              </View>
            </View>

            <View
              padding={3}
              style={{
                flex: 6,
              }}>
              {/* Start: FilterJobPostsCard */}
              <FilterJobPostCard pageSize={10} isPagination={true} />
              {/* End: FilterJobPostsCard */}
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default SearchScreen;
