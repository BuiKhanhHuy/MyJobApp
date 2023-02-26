import React from 'react';
import {View, StyleSheet} from 'react-native';

import JobPost from '../JobPost';

const data = [1, 2, 3, 4, 5];

const RecentJobPosts = () => {
  return (
    <View style={styles.container}>
      {data.map(value => (
        <View key={value} style={styles.item}>
          <JobPost />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    marginVertical: 8,
  },
});

export default RecentJobPosts;
