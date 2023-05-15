import React from 'react';
import {Center, FlatList, Spinner, View} from 'native-base';

import {useLayout} from '../../../hooks';
import toastMessages from '../../../utils/toastMessages';
import NoData from '../../../components/NoData/NoData';
import ViewedCompany from '../../../components/ViewedCompany';
import resumeViewedService from '../../../services/resumeViewedService';
import {RefreshControl} from 'react-native';

const pageSize = 16;

const CompanyViewedProfileCard = () => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isReload, setIsReload] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  const getResumeViewed = async params => {
    if (!isLoadMoreLoading) {
      setIsLoading(true);
    }

    try {
      const resData = await resumeViewedService.getResumeViewed(params);
      const data = resData.data;

      setCount(data.count);
      if (isLoadMoreLoading) {
        setCompanies([...companies, ...data.results]);
      } else {
        setCompanies(data.results);
      }
    } catch (error) {
      toastMessages.error();
    } finally {
      setIsLoading(false);
      setIsLoadMoreLoading(false);
    }
  };

  React.useEffect(() => {
    getResumeViewed({
      pageSize: pageSize,
      page: page,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isReload]);

  const onRefresh = () => {
    console.log('REFRESH...................');
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
        <View>
          {isLoading ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={Array.from(Array(6).keys())}
              renderItem={({item}) => (
                <Center paddingY="1" key={item}>
                  <ViewedCompany.Loading />
                </Center>
              )}
            />
          ) : companies.length === 0 ? (
            <Center marginTop={50}>
              <NoData
                title="Chưa có nhà tuyển dụng nào xem hồ sơ của bạn"
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
              data={companies}
              renderItem={({item}) => (
                <Center paddingY="1" key={item?.id}>
                  {/* Start: ViewedCompany */}
                  <ViewedCompany
                    companyId={item?.company?.id}
                    companyName={item?.company?.companyName}
                    companyImageUrl={item?.company?.companyImageUrl}
                    resumeTitle={item?.resume?.title}
                    views={item?.views}
                    isSavedResume={item?.isSavedResume}
                    createAt={item?.createAt}
                  />
                  {/* End: ViewedCompany */}
                </Center>
              )}
              keyExtractor={item => item?.id}
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
                const itemHeight = 120; // Chiều cao của mỗi mục trong danh sách
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

export default CompanyViewedProfileCard;
