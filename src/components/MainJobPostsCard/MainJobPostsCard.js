import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Center, FlatList, Spinner, Text, View} from 'native-base';

import NoData from '../NoData/NoData';
import JobPost from '../JobPost/JobPost';
import jobService from '../../services/jobService';

const MainJobPostsCard = () => {
  const {jobPostSaved} = useSelector(state => state.reload);
  const {jobPostFilter} = useSelector(state => state.filter);
  const {pageSize} = jobPostFilter;
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
  }, [jobPostFilter]);

  React.useEffect(() => {
    const getJobPosts = async jobPostFilter => {
      try {
        const resData = await jobService.getJobPosts({
          ...jobPostFilter,
          page: page,
        });
        const data = resData.data;

        setCount(data.count);
        setJobPosts([...jobPosts, ...data.results]);
      } catch (error) {
      } finally {
        setIsLoading(false);
        setIsLoadMoreLoading(false);
      }
    };

    getJobPosts(jobPostFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobPostFilter, page]);

  React.useEffect(() => {
    let jobPostsNew = [];
    const jobPostChange = jobPosts.find(value => value.id === jobPostSaved.id);

    for (let i = 0; i < jobPosts.length && jobPostChange; i++) {
      if (jobPosts[i].id === jobPostSaved.id) {
        jobPostsNew.push({
          ...jobPostChange,
          isSaved: jobPostSaved.status,
        });
      } else {
        jobPostsNew.push(jobPosts[i]);
      }
    }

    setJobPosts(jobPostsNew);
  }, [jobPostSaved]);

  const handleLoadMore = () => {
    if (Math.ceil(count / pageSize) > page) {
      setPage(page + 1);
      setIsLoadMoreLoading(true);
    }
  };

  return (
    <>
      <View mt={3} mb={1}>
        <Text
          fontSize={18}
          fontFamily="DMSans-Bold"
          color="myJobCustomColors.haitiBluePurple">
          <Text color="myJobCustomColors.burningOrange">{count}</Text>{' '}
          việc làm
        </Text>
      </View>
      <View style={styles.container}>
        {isLoading ? (
          Array.from(Array(3).keys()).map(value => (
            <JobPost.Loading key={value} />
          ))
        ) : jobPosts.length === 0 ? (
          <Center marginTop={50}>
            <NoData
              title="Chúng tôi không tìm thấy công việc bạn đang tìm kiếm hiện tại"
              imgSize="3xs"
            />
          </Center>
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
                isSaved={item?.isSaved}
                cityId={item?.locationDict?.city}
                companyName={item?.companyDict?.companyName}
                companyImageUrl={item?.companyDict?.companyImageUrl}
                updateAt={item?.updateAt}
              />
            )}
            keyExtractor={item => item.id}
            ListFooterComponent={
              isLoadMoreLoading ? (
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default MainJobPostsCard;
