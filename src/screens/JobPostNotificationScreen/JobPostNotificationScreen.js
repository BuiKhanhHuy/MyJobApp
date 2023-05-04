import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {
  Center,
  FlatList,
  Icon,
  IconButton,
  Spinner,
  Text,
  View,
} from 'native-base';

import {useLayout} from '../../hooks';
import NoData from '../../components/NoData/NoData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import JobPostNotification from '../../components/JobPostNotification';
import jobPostNotificationService from '../../services/jobPostNotificationService';

const pageSize = 12;
const JobPostNotificationScreen = () => {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const {isReloadNotification} = useSelector(state => state.reload);
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);
  const [jobPostNotifications, setJobPostNotifications] = React.useState([1]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Thông báo việc làm',
      headerRight: () => (
        <IconButton
          onPress={() =>
            navigation.navigate('AddOrEditJobPostNotificationScreen', {
              id: null,
            })
          }
          icon={<Icon as={MaterialIcons} name="add" />}
          borderRadius="full"
          _icon={{
            color: 'myJobCustomColors.deepSaffron',
            size: 'xl',
          }}
        />
      ),
    });
  }, []);

  React.useEffect(() => {
    const getJobPostNotifications = async params => {
      try {
        const resData =
          await jobPostNotificationService.getJobPostNotifications(params);
        const data = resData.data;

        setCount(data.count);
        setJobPostNotifications(data.results);
      } catch (error) {
      } finally {
        setIsLoading(false);
        setIsLoadMoreLoading(false);
      }
    };

    getJobPostNotifications({
      page: page,
      pageSize: pageSize,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isReloadNotification]);

  const handleLoadMore = () => {
    if (Math.ceil(count / pageSize) > page) {
      setPage(page + 1);
      setIsLoadMoreLoading(true);
    }
  };

  return (
    <>
      <View onLayout={handleLayout} style={{marginTop: headerHeight}}>
        {isLayoutLoading ? (
          <Center mt="5">
            <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
          </Center>
        ) : (
          <View>
            {isLoading ? (
              <FlatList
                data={Array.from(Array(6).keys())}
                renderItem={({item}) => (
                  <Center paddingX="6" paddingY="2" key={item}>
                    <JobPostNotification.Loading />
                  </Center>
                )}
              />
            ) : jobPostNotifications.length === 0 ? (
              <Center marginTop={50}>
                <NoData
                  title="Bạn chưa tạo thông báo việc làm nào"
                  imgSize="3xs"
                />
              </Center>
            ) : (
              <FlatList
                data={jobPostNotifications}
                renderItem={({item}) => (
                  <Center paddingX="6" paddingY="2" key={item.id}>
                    {/* Start: JobPostNotification */}
                    <JobPostNotification
                      id={item.id}
                      jobName={item.jobName}
                      positionId={item.position}
                      experienceId={item.experience}
                      salary={item.salary}
                      frequency={item.frequency}
                      isActive={item.isActive}
                      careerId={item.career}
                      cityId={item.city}
                    />
                    {/* End: JobPostNotification */}
                  </Center>
                )}
                keyExtractor={item => item.id}
                ListFooterComponent={
                  isLoadMoreLoading ? (
                    <Center my="3">
                      <Spinner
                        size="lg"
                        color="myJobCustomColors.deepSaffron"
                      />
                    </Center>
                  ) : null
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0}
                getItemLayout={(data, index) => {
                  const itemHeight = 120; // Chiều cao của mỗi mục trong danh sách
                  const offset = itemHeight * index; // Vị trí của mục trong danh sách
                  return {length: itemHeight, offset, index};
                }}
              />
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default JobPostNotificationScreen;
