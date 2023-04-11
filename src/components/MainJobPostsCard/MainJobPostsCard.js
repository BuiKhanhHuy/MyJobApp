import React from 'react';
import {useSelector} from 'react-redux';
import {Center, FlatList, Spinner, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';

import JobPost from '../JobPost/JobPost';
import jobService from '../../services/jobService';

const MainJobPostsCard = () => {
  const {jobPostFilter} = useSelector(state => state.filter);
  const {pageSize} = jobPostFilter;
  const [isFirstLoading, setIsFirstLoading] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getJobPosts = async jobPostFilter => {
      setIsLoading(true);
      try {
        const resData = await jobService.getJobPosts({
          ...jobPostFilter,
          page: page,
        });
        const data = resData.data;

        setCount(data.count);
        setJobPosts(data.results);
      } catch (error) {
      } finally {
        setIsFirstLoading(false);
        setIsLoading(false);
      }
    };

    getJobPosts(jobPostFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobPostFilter, page]);

  const handleLoadMore = () => {
    if (Math.ceil(count / pageSize) > page) {
      setPage(page + 1);
      setIsLoading(true);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>1 việc làm</Text>
      </View>
      {isFirstLoading ? (
        Array.from(Array(5).keys()).map(value => (
          <JobPost.Loading key={value} />
        ))
      ) : jobPosts.length === 0 ? (
        <Text>Rong</Text>
      ) : (
        <FlatList
          data={jobPosts}
          renderItem={({item}) => (
            <JobPost
              id={item?.id}
              jobName={item?.jobName}
              careerId={item?.career}
              experienceId={item?.experience}
              academicLevelId={item?.academicLevel}
              positionId={item?.position}
              salaryMin={item?.salaryMin}
              salaryMax={item?.salaryMax}
              typeOfWorkplaceId={item?.typeOfWorkplace}
              jobTypeId={item?.jobType}
              deadline={item?.deadline}
              isHot={item?.isHot}
              isUrgent={item?.isUrgent}
              cityId={item?.locationDict?.city}
              companyName={item?.companyDict?.companyName}
              companyImageUrl={item?.companyDict?.companyImageUrl}
              updateAt={item?.updateAt}
            />
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={
            isLoading ? (
              <Center my="3">
                <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
              </Center>
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

export default MainJobPostsCard;
