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
import {
  Border,
  Color,
  FontFamily,
  FontSize,
  Padding,
} from '../../constants/globalStyles';
import {TextInputSearch} from '../../components/TextInputCustom';

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
                fontSize: FontSize.size_5md,
                color: Color.darkorange,
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
          <TextInputSearch placeholder="Tìm kiếm" />
        </View>
        <View style={{flex: 1.5, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => navigation.navigate('FilterScreen')}>
            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: Color.darkorange,
                borderRadius: Border.br_10xs,
                padding: Padding.p_8xs,
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
              fontSize: FontSize.size_6sm,
              fontFamily: FontFamily.dMSansBold,
              color: Color.gray_300,
            }}>
            Specialization
          </Text>
        </View>
        <View style={{height: '100%', paddingTop: Padding.p_10sm}}>
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
    padding: Padding.p_10sm,
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
    padding: Padding.p_5md,
    backgroundColor: Color.white,
    borderRadius: Border.br_10sm,
    elevation: 5,
    shadowOffset: {width: 0, height: 4},
    shadowColor: Color.shadow_color,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    width: 80,
    height: 80,
    padding: Padding.p_7sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.orange_100,
    borderRadius: Border.br_10xl,
  },
  titleText: {
    fontFamily: FontFamily.dMSansBold,
    lineHeight: 18,
    fontSize: FontSize.size_4sm,
    color: Color.midnightblue_100,
  },
  subTitleText: {
    fontFamily: FontFamily.dMSansMedium,
    lineHeight: 16,
    fontSize: FontSize.size_2sm,
    color: Color.darkgray_100,
  },
});

export default SpecializationScreen;
