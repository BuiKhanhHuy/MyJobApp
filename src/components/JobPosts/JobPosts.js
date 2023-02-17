import React from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {Color, Padding} from '../../constants/globalStyles';
import JobPost from '../JobPost/JobPost';

const JobPosts = () => {
  const [jobPosts, setJobPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [limit, setLimit] = React.useState(2);
  React.useEffect(() => {
    const loadJobPost = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/posts?limit=${limit}&skip=${
            limit * (currentPage - 1)
          }`,
        );
        console.log(
          `https://dummyjson.com/posts?limit=${limit}&skip=${
            limit * (currentPage - 1)
          }`,
        );
        if (res.status !== 200)
          Promise.reject(`Co loi xay ra, status = ${res.status}`);

        const data = await res.json();
        const posts = data.posts;

        setJobPosts([...jobPosts, ...posts]);
        setLimit(data.limit);
      } catch (err) {
        console.error(`ERROR: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobPost();
  }, [currentPage]);

  const JobItem = ({item}) => (
    <View key={item.id} style={styles.item}>
      <JobPost />
    </View>
  );

  const renderFooter = () =>
    isLoading ? (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    ) : null;

  const handleLoadMore = () => {
    try {
      let newPage = currentPage + 1;
      setCurrentPage(newPage);
    } catch (err) {
      console.error(`ERROR: ${err}`);
    } finally {
        setIsLoading(false);
      }
    console.log('render')
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={jobPosts}
        keyExtractor={item => item.id}
        renderItem={item => JobItem(item)}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0}
        onEndReached={handleLoadMore}
      />
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
  loadingFooter: {
    paddingVertical: Padding.p_5xs,
  },
});

export default JobPosts;
