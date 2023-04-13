import React from 'react';
import {StyleSheet} from 'react-native';
import {Center, FlatList, Spinner, Text, View} from 'native-base';

import JobPost from '../JobPost';
import jobService from '../../services/jobService';

const SuggestedJobPostCard = ({
  pageSize = 10,
  isPagination = false,
  params,
}) => {
  const [isFirstLoading, setIsFirstLoading] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getJobPosts = async params => {
      try {
        const resData = await jobService.getSuggestedJobPosts({
          ...params,
          page: page,
          pageSize: pageSize
        });

        const data = resData.data;

        setCount(data.count);
        setJobPosts([...jobPosts, ...data.results]);
        console.log(jobPosts[0]);
      } catch (error) {
      } finally {
        setIsFirstLoading(false);
        setIsLoading(false);
      }
    };

    getJobPosts(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleLoadMore = () => {
    if (Math.ceil(count / pageSize) > page) {
      setPage(page + 1);
      setIsLoading(true);
    }
  };

  if (!isPagination) {
    return (
      <View style={styles.container}>
        {isFirstLoading ? (
          Array.from(Array(5).keys()).map(value => (
            <JobPost.Loading key={value} />
          ))
        ) : jobPosts.length === 0 ? (
          <Text>Rong</Text>
        ) : (
          jobPosts.map(value => (
            <JobPost
              key={value.id}
              id={value?.id}
              jobName={value?.jobName}
              careerId={value?.career}
              experienceId={value?.experience}
              academicLevelId={value?.academicLevel}
              positionId={value?.position}
              salaryMin={value?.salaryMin}
              salaryMax={value?.salaryMax}
              typeOfWorkplaceId={value?.typeOfWorkplace}
              jobTypeId={value?.jobType}
              deadline={value?.deadline}
              isHot={value?.isHot}
              isUrgent={value?.isUrgent}
              cityId={value?.locationDict?.city}
              companyName={value?.companyDict?.companyName}
              companyImageUrl={value?.companyDict?.companyImageUrl}
              updateAt={value?.updateAt}
            />
          ))
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFirstLoading ? (
        Array.from(Array(3).keys()).map(value => <JobPost.Loading key={value}/>)
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

export default React.memo(SuggestedJobPostCard);
