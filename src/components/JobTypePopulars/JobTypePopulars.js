import React from 'react';
import {useTheme} from 'native-base';
import {View, StyleSheet} from 'react-native';

import JobTypePopular from "../JobTypePopular";

const JobTypePopulars = () => {
  const {colors, } = useTheme();

  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginRight: 10}}>
        <JobTypePopular
          imageUrl={require('../../assets/images/job-type-popular-icon.png')}
          title="44.5K"
          subTitle="Remote Job"
          bgColor={colors.myJobCustomColors.frenchPass}
        />
      </View>
      <View style={{flex: 1, marginLeft: 10, flexDirection: 'column'}}>
        <View
          style={{
            flex: 1,
            marginBottom: 10,
          }}>
          <JobTypePopular
            title="66.8K"
            subTitle="Full time"
            bgColor={colors.myJobCustomColors.paleViolet}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 10,
          }}>
          <JobTypePopular
            title="11.5K"
            subTitle="Part time"
            bgColor={colors.myJobCustomColors.lightApricot}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 170,
  },
});

export default JobTypePopulars;
