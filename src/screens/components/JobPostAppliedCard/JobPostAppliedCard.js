import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Button, Center, FlatList, Spinner, View} from 'native-base';

import {IMAGES} from '../../../configs/globalStyles';
import jobPostActivityService from '../../../services/jobPostActivityService';
import toastMessages from '../../../utils/toastMessages';
import NoData from '../../../components/NoData/NoData';
import AppliedJobPost from '../../../components/AppliedJobPost';

import {useLayout} from '../../../hooks';
import { RefreshControl } from 'react-native';

const pageSize = 10;

const JobPostAppliedCard = () => {
  const navigation = useNavigation();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isReload, setIsReload] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  const getJobPosts = async params => {
    if (!isLoadMoreLoading) {
      setIsLoading(true);
    }

    try {
      const resData = await jobPostActivityService.getJobPostActivity(params);
      const data = resData.data;

      setCount(data.count);
      if (isLoadMoreLoading) {
        setJobPosts([...jobPosts, ...data.results]);
      } else {
        setJobPosts(data.results);
      }
    } catch (error) {
      toastMessages.error();
    } finally {
      setIsLoading(false);
      setIsLoadMoreLoading(false);
    }
  };

  React.useEffect(() => {
    getJobPosts({
      pageSize: pageSize,
      page: page,
    });
  }, [page, isReload]);

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
    <View onLayout={handleLayout}>
      {isLayoutLoading ? (
        <Center mt="5">
          <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
        </Center>
      ) : (
        <View style={styles.container}>
          {isLoading ? (
            Array.from(Array(3).keys()).map(value => (
              <AppliedJobPost.Loading key={value} />
            ))
          ) : jobPosts.length === 0 ? (
            <Center marginTop={50}>
              <NoData
                title="Bạn chưa ứng tuyển công việc nào"
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
                <AppliedJobPost
                  id={item?.mobileJobPostDict?.id}
                  jobName={item?.mobileJobPostDict?.jobName}
                  careerId={item?.mobileJobPostDict?.career}
                  experienceId={item?.mobileJobPostDict?.experience}
                  academicLevelId={item?.mobileJobPostDict?.academicLevel}
                  positionId={item?.mobileJobPostDict?.position}
                  salaryMin={item?.mobileJobPostDict?.salaryMin}
                  salaryMax={item?.mobileJobPostDict?.salaryMax}
                  typeOfWorkplaceId={item?.mobileJobPostDict?.typeOfWorkplace}
                  jobTypeId={item?.mobileJobPostDict?.jobType}
                  deadline={item?.mobileJobPostDict?.deadline}
                  cityId={item?.mobileJobPostDict?.locationDict?.city}
                  userId={item?.mobileJobPostDict?.companyDict?.mobileUserDict?.id}
                  userFullName={item?.mobileJobPostDict?.companyDict?.mobileUserDict?.fullName}
                  userEmail={item?.mobileJobPostDict?.companyDict?.mobileUserDict?.email}
                  companyId={item?.mobileJobPostDict?.companyDict?.id}
                  companySlug={item?.mobileJobPostDict?.companyDict?.slug}
                  companyName={
                    item?.mobileJobPostDict?.companyDict?.companyName
                  }
                  companyImageUrl={
                    item?.mobileJobPostDict?.companyDict?.companyImageUrl
                  }
                  updateAt={item?.mobileJobPostDict?.updateAt}
                  appliedAt={item?.createAt}
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
              getItemLayout={(data, index) => {
                const itemHeight = 260; // Chiều cao của mỗi mục trong danh sách
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

export default JobPostAppliedCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
