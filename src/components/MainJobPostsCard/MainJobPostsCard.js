import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Center, FlatList, Spinner, Text, View} from 'native-base';

import NoData from '../NoData/NoData';
import JobPost from '../JobPost/JobPost';
import jobService from '../../services/jobService';
import {RefreshControl} from 'react-native';

const MainJobPostsCard = () => {
  const {jobPostSaved} = useSelector(state => state.reload);
  const {jobPostFilter} = useSelector(state => state.filter);
  const {pageSize} = jobPostFilter;
  const [isReload, setIsReload] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(false);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  const getJobPosts = async jobPostFilter => {
    if (!isLoadMoreLoading) {
      setIsLoading(true);
    }

    try {
      const resData = await jobService.getJobPosts({
        ...jobPostFilter,
        page: page,
      });
      const data = resData.data;

      setCount(data.count);
      if (isLoadMoreLoading) {
        setJobPosts([...jobPosts, ...data.results]);
      } else {
        setJobPosts(data.results);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
      setIsLoadMoreLoading(false);
    }
  };

  React.useEffect(() => {
    getJobPosts(jobPostFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isReload]);

  React.useEffect(() => {
    if (!isLoading) {
      setIsReload(!isReload);
      setPage(1);
    }
  }, [jobPostFilter]);

  React.useEffect(() => {
    if (!isLoading) {
      const jobPostChange = jobPosts.find(
        value => value.id === jobPostSaved.id,
      );

      // co phan tu thay doi moi thuc hien
      if (jobPostChange) {
        let jobPostsNew = [];

        for (let i = 0; i < jobPosts.length; i++) {
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
      }
    }
  }, [jobPostSaved]);

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
    <>
      <View mt={3} mb={1}>
        <Text
          fontSize={18}
          fontFamily="DMSans-Bold"
          color="myJobCustomColors.haitiBluePurple">
          <Text color="myJobCustomColors.burningOrange">{count}</Text> việc làm
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
