import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Button, Center, FlatList, Spinner, View} from 'native-base';

import {IMAGES} from '../../../configs/globalStyles';
import jobService from '../../../services/jobService';
import toastMessages from '../../../utils/toastMessages';
import NoData from '../../../components/NoData/NoData';
import JobPost from '../../../components/JobPost/JobPost';

import { useLayout } from '../../../hooks';

const pageSize = 10;

const JobPostSavedCard = () => {
  const navigation = useNavigation();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const {jobPostSaved} = useSelector(state => state.reload);
  const [isReload, setIsReload] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setIsReload(!isReload)
    setPage(1);
  }, [jobPostSaved]);

  React.useEffect(() => {
    const getJobPosts = async params => {
      setIsLoading(true);
      try {
        const resData = await jobService.getJobPostsSaved(params);
        const data = resData.data;

        setCount(data.count);
        setJobPosts(data.results);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
        setIsLoadMoreLoading(false);
      }
    };

    getJobPosts({
      pageSize: pageSize,
      page: page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isReload]);

  const handleLoadMore = () => {
    if (Math.ceil(count / pageSize) > page) {
      setPage(page + 1);
      setIsLoadMoreLoading(true);
    }
  };

  return (
    <View onLayout={handleLayout}>
      {isLayoutLoading ? (
        <Center mt="5">
          <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
        </Center>
      ) : (
        <View style={styles.container}>
          {isLoading ? (
            Array.from(Array(3).keys()).map(value => (
              <JobPost.Loading key={value} />
            ))
          ) : jobPosts.length === 0 ? (
            <Center marginTop={50}>
              <NoData
                title="Bạn chưa lưu công việc nào"
                imgSize="3xs"
                img={IMAGES.img3}>
                <Button
                  onPress={() => navigation.navigate('MainJobPostScreen')}
                  mt={10}
                  size="md"
                  rounded="lg"
                  bgColor="myJobCustomColors.darkIndigo"
                  fontFamily="DMSans-Bold"
                  fontSize={14}
                  lineHeight={18}>
                  TÌM VIỆC LÀM
                </Button>
              </NoData>
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
              onEndReachedThreshold={0}
              getItemLayout={(data, index) => {
                const itemHeight = 180; // Chiều cao của mỗi mục trong danh sách
                const offset = itemHeight * index; // Vị trí của mục trong danh sách
                return {length: itemHeight, offset, index};
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default JobPostSavedCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
