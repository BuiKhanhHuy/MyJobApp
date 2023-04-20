import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Center, FlatList, Spinner, Text, View} from 'native-base';

import errorHandling from '../../../utils/errorHandling';
import NoData from '../../../components/NoData/NoData';
import AroundJobPost from '../../../components/AroundJobPost';
import jobService from '../../../services/jobService';

const JobPostAroundCard = ({bodyData}) => {
  const {jobPostAroundFilter} = useSelector(state => state.filter);
  const {pageSize} = jobPostAroundFilter;
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
  }, [jobPostAroundFilter]);

  React.useEffect(() => {
    const getJobPostsAround = async (bodyData, params) => {
      try {
        const resData = await jobService.getJobPostsAround(bodyData, params);
        const data = resData.data;

        setCount(data.count);
        setJobPosts(data.results);
        console.log("AAA: ", data.results)
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoading(false);
        setIsLoadMoreLoading(false);
      }
    };

    const params = {
      ...jobPostAroundFilter,
      isPagination: 'OK',
    };

    getJobPostsAround(bodyData, params);
  }, [jobPostAroundFilter, page]);

  const handleLoadMore = () => {
    if (Math.ceil(count / pageSize) > page) {
      setPage(page + 1);
      setIsLoadMoreLoading(true);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        Array.from(Array(5).keys()).map(value => (
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
          data={jobPosts}
          renderItem={({item}) => (
            <Center mt={3}>
              {console.log(item)}
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
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default JobPostAroundCard;
