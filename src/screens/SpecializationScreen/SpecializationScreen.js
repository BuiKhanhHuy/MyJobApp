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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width: screenWidth} = Dimensions.get('window');

const SpecializationScreen = ({navigation}) => {
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
          <Text style={styles.titleText}>Education</Text>
        </View>
        <View>
          <Text style={styles.subTitleText}>120 Jobs</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 9}}>
          {/* <TextInputSearch placeholder="Tìm kiếm" /> */}
        </View>
        <View style={{flex: 1.5, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => navigation.navigate('FilterScreen')}>
            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: '#ff9228',
                borderRadius: 10,
                padding: 8,
              }}>
              <Image
                source={require('../../assets/images/icons/filter-icon.png')}
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
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
            Specialization
          </Text>
        </View>
        <View style={{height: '100%', paddingTop: 20}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never">
            <View style={[styles.categories, {rowGap: 15, columnGap: 15}]}>
              {[
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4},
                {id: 5},
                {id: 6},
                {id: 7},
              ].map(value => categoryItem(value))}
            </View>
          </ScrollView>
        </View>
      </View>
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
    maxHeight: (screenWidth / 2) * 4 + 15 * 4,
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
