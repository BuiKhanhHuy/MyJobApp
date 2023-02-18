import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import JobPost from '../JobPost';

const RecentJobPosts = () => {
  return (
    <View style={styles.container}>
      {[{id: 1}, {id: 2}, {id: 3}, {id: 4}].map(value => (
        <View key={value.id} style={styles.item}>
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
