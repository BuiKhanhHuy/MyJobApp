import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Icon, Input, Skeleton} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';

import commonService from '../../services/commonService';

const {width: screenWidth} = Dimensions.get('window');

const Loading = key => (
  <View
    key={key}
    style={{
      width: screenWidth / 2 - 40 + 12,
      height: screenWidth / 2,
      padding: 25,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'space-around',
    }}>
    <View>
      <Skeleton w={16} height={16} rounded={'full'} />
    </View>
    <Skeleton h={5} rounded="md" />
    <Skeleton h={3} rounded="md" />
  </View>
);

const categoryItem = value => {
  return (
    <View key={value.id} style={styles.box}>
      <View>
        <View style={styles.icon}>
          <FontAwesome5
            name="hand-holding-heart"
            style={{
              fontSize: 25,
              color: '#ff9228',
            }}
          />
        </View>
      </View>
      <View>
        <Text style={styles.titleText}>{value.name}</Text>
      </View>
      <View>
        <Text style={styles.subTitleText}>120 Jobs</Text>
      </View>
    </View>
  );
};

const SpecializationScreen = ({navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(true);
  const [careers, setCareers] = React.useState([]);

  React.useEffect(() => {
    const getAllCareers = async () => {
      setIsLoading(true);
      try {
        const resData = await commonService.getAllCareers();

        setCareers(resData.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getAllCareers();
  }, []);

  return (
    <View onLayout={handleLayout} style={[styles.container]}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <>
          <View style={styles.header}>
            <View style={{flex: 9}}>
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
            <View style={{flex: 1.5, alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: '#ff9228',
                    borderRadius: 10,
                    padding: 8,
                  }}>
                  <Icon
                    as={<Fontisto name="search" />}
                    color="myJobCustomColors.white"
                    ml={0.5}
                    size={5}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.specialization}>
            <View>
              <Text
                style={{
                  lineHeight: 21,
                  fontSize: 16,
                  fontFamily: 'DMSans-Bold',
                  color: '#150a33',
                }}>
                Tất cả ngành nghề
              </Text>
            </View>
            <View style={{height: '100%', paddingTop: 20}}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode="never">
                <View style={[styles.categories, {rowGap: 15, columnGap: 15}]}>
                  {isLoading
                    ? Array.from(Array(5).keys()).map(value => Loading(value))
                    : careers.map(value => categoryItem(value))}
                </View>
              </ScrollView>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    height: '100%',
    flex: 1,
    padding: 20,
  },
  back: {
    flex: 1,
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  specialization: {
    flex: 15,
  },
  categories: {
    flex: 1,
    maxHeight: (screenWidth / 2) * 49 + 15 * 49,
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  box: {
    width: screenWidth / 2 - 40 + 12,
    height: screenWidth / 2,
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 5,
    shadowOffset: {width: 0, height: 4},
    shadowColor: '#99ABC6',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    width: 80,
    height: 80,
    padding: 17,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f3',
    borderRadius: 50,
  },
  titleText: {
    fontFamily: 'DMSans-Bold',
    lineHeight: 18,
    fontSize: 14,
    color: '#150b3d',
  },
  subTitleText: {
    fontFamily: 'DMSans-Medium',
    lineHeight: 16,
    fontSize: 12,
    color: '#aaa6b9',
  },
});

export default SpecializationScreen;
