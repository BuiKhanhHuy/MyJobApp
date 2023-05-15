import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Center, FlatList, Spinner, Text, View} from 'native-base';

import errorHandling from '../../../utils/errorHandling';
import NoData from '../../../components/NoData/NoData';
import AroundJobPost from '../../../components/AroundJobPost';
import jobService from '../../../services/jobService';
import {RefreshControl} from 'react-native';

const JobPostAroundCard = ({bodyData}) => {
  const {jobPostAroundFilter} = useSelector(state => state.filter);
  const {pageSize} = jobPostAroundFilter;
  const [isReload, setIsReload] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  const getJobPostsAround = async (bodyData, params) => {
    if (!isLoadMoreLoading) {
      setIsLoading(true);
    }

    try {
      const resData = await jobService.getJobPostsAround(bodyData, params);
      const data = resData.data;

      setCount(data.count);
      if (isLoadMoreLoading) {
        setJobPosts([...jobPosts, ...data.results]);
      } else {
        setJobPosts(data.results);
      }
    } catch (error) {
      errorHandling(error);
    } finally {
      setIsLoading(false);
      setIsLoadMoreLoading(false);
    }
  };

  React.useEffect(() => {
    const params = {
      ...jobPostAroundFilter,
      page: page,
      isPagination: 'OK',
    };

    getJobPostsAround(bodyData, params);
  }, [page, isReload]);

  React.useEffect(() => {
    if (!isLoading) {
      setIsReload(!isReload);
      setPage(1);
    }
  }, [jobPostAroundFilter]);

  const onRefresh = () => {
    console.log('GỌI REFRESH...................');
    setIsReload(!isReload);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (Math.ceil(count / pageSize) > page && !isLoadMoreLoading) {
      setPage(page + 1);
      setIsLoadMoreLoading(true);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        Array.from(Array(6).keys()).map(value => (
          <Center mt={3} key={value}>
            <AroundJobPost.Loading />
          </Center>
        ))
      ) : jobPosts.length === 0 ? (
        <Center marginTop={50}>
          <NoData title="Không tìm thấy việc làm nào gần đây" imgSize="3xs" />
        </Center>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              colors={['#FF9228']}
            />
          }
          data={jobPosts}
          renderItem={({item}) => (
            <Center mt={3}>
              <AroundJobPost
                id={item?.id}
                jobName={item?.jobName}
                salaryMin={item?.salaryMin}
                salaryMax={item?.salaryMax}
                deadline={item?.deadline}
                latitude={item?.latitude}
                longitude={item?.longitude}
                companyName={item?.mobileCompanyDict?.companyName}
                companyImageUrl={item?.mobileCompanyDict?.companyImageUrl}
                cityId={item?.locationDict?.city}
              />
            </Center>
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={
            isLoadMoreLoading ? (
              <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
            ) : null
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          getItemLayout={(data, index) => {
            const itemHeight = 125; // Chiều cao của mỗi mục trong danh sách
            const offset = itemHeight * index; // Vị trí của mục trong danh sách
            return {length: itemHeight, offset, index};
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 10
  },
});

export default JobPostAroundCard;
