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
import {
  Border,
  Color,
  Padding,
  FontSize,
  FontFamily,
  Margin,
} from '../../constants/globalStyles';
import JobPosts from '../../components/JobPosts';
import {TextInputSearch} from '../../components/TextInputCustom';

const SearchScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{height: '75%'}}>
          <ImageBackground
            source={require('../../assets/images/backgrounds/search-bg.png')}
            resizeMode="cover"
            imageStyle={{
              borderBottomLeftRadius: Border.br_10md,
              borderBottomRightRadius: Border.br_10md,
            }}>
            <View
              style={{
                borderBottomLeftRadius: Border.br_10md,
                borderBottomRightRadius: Border.br_10md,
                paddingHorizontal: Padding.p_10sm,
                paddingVertical: Padding.p_10md,
                height: '100%',
                justifyContent: 'flex-end',
              }}>
              <View style={{paddingHorizontal: Padding.p_10xs}}>
                <View style={{paddingBottom: Padding.p_7sm}}>
                  <TextInputSearch placeholder="Từ khóa bạn đang tìm kiếm" />
                </View>
                <View style={{paddingBottom: Padding.p_7sm}}>
                  <TextInputSearch placeholder="Từ khóa bạn đang tìm kiếm" />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            height: '25%',
            paddingHorizontal: Padding.p_10sm,
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
                borderRadius: Border.br_10xs,
                padding: Padding.p_8xs,
                marginRight: Margin.m_5sm,
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
                    backgroundColor: Color.lightgray_100,
                    borderRadius: Border.br_10xs,
                    padding: Padding.p_3sm,
                    marginRight: Margin.m_5sm,
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
    fontSize: FontSize.size_2sm,
    fontFamily: FontFamily.dMSansMedium,
    color: Color.dimgray,
  },
  popularJobs: {
    flex: 6,
    paddingHorizontal: Padding.p_10sm,
  },
});

export default SearchScreen;
