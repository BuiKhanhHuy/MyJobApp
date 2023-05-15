import React from 'react';
import {useSelector} from 'react-redux';
import {Center, FlatList, Spinner, Text, View} from 'native-base';

import toastMessages from '../../../utils/toastMessages';
import NoData from '../../../components/NoData/NoData';
import Company from '../../../components/Company/Company';
import companyFollowedService from '../../../services/companyFollowedService';
import {useLayout} from '../../../hooks';
import {RefreshControl} from 'react-native';

const pageSize = 14;

const CompanyFollowedCard = () => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const {companyFollowed} = useSelector(state => state.reload);
  const [isReload, setIsReload] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  const getCompaniesFollowed = async params => {
    if (!isLoadMoreLoading) {
      setIsLoading(true);
    }

    try {
      const resData = await companyFollowedService.getCompaniesFollowed(params);
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
    getCompaniesFollowed({
      pageSize: pageSize,
      page: page,
    });
  }, [page, isReload]);

  React.useEffect(() => {
    if (!isLoading) {
      console.log('SAVED DANG THAY ĐỔI!!!; status: ');
      setIsReload(!isReload);
      setPage(1);
    }
  }, [companyFollowed]);

  const onRefresh = () => {
    console.log('GỌI REFRESH...................');
    setIsReload(!isReload);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (Math.ceil(count / pageSize) > page && !isLoadMoreLoading) {
      console.log('LOAD MORE.....................');
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
              numColumns={2}
              data={Array.from(Array(6).keys())}
              renderItem={({item}) => (
                <Center width="50%" paddingY="1" paddingX="1" key={item}>
                  <Company.Loading />
                </Center>
              )}
            />
          ) : companies.length === 0 ? (
            <Center marginTop={50}>
              <NoData
                title="Bạn chưa theo dõi bất kỳ nhà tuyển dụng nào"
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
              numColumns={2}
              data={companies}
              renderItem={({item}) => (
                <Center width="50%" paddingY="1" paddingX="1" key={item.id}>
                  <Company
                    id={item.company?.id}
                    companyName={item?.company?.companyName}
                    companyImageUrl={item?.company?.companyImageUrl}
                    followNumber={item?.company?.followNumber}
                    jobPostNumber={item?.company?.jobPostNumber}
                    isFollowed={item?.company?.isFollowed}
                  />
                </Center>
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
                const itemHeight = 220; // Chiều cao của mỗi mục trong danh sách
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

export default CompanyFollowedCard;
