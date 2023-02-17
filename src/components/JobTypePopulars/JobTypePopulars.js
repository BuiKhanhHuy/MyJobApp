import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Color, Margin, Padding} from '../../constants/globalStyles';
import JobTypePopular from '../JobTypePopular/JobTypePopular';

const JobTypePopulars = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginRight: Margin.m_10xs}}>
        <JobTypePopular
          imageUrl={require('../../assets/images/job-type-popular-icon.png')}
          title="44.5K"
          subTitle="Remote Job"
          bgColor={Color.powderblue}
        />
      </View>
      <View
        style={{flex: 1, marginLeft: Margin.m_10xs, flexDirection: 'column'}}>
        <View
          style={{
            flex: 1,
            marginBottom: Margin.m_10xs,
          }}>
          <JobTypePopular
            title="66.8K"
            subTitle="Full time"
            bgColor={Color.plum}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginTop: Margin.m_10xs,
          }}>
          <JobTypePopular
            title="11.5K"
            subTitle="Part time"
            bgColor={Color.peachpuff}
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
    paddingBottom: Padding.p_9sm,
  },
});

export default JobTypePopulars;
