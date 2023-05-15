import React from 'react';
import {useSelector} from 'react-redux';
import {Center, FlatList, Spinner, View} from 'native-base';

import toastMessages from '../../utils/toastMessages';
import NoData from '../NoData/NoData';
import Company from '../Company/Company';
import companyService from '../../services/companyService';
import { RefreshControl } from 'react-native';

const MainCompanyCard = () => {
  const {companyFollowed} = useSelector(state => state.reload);
  const {companyFilter} = useSelector(state => state.filter);
  const {pageSize} = companyFilter;
  const [isReload, setIsReload] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  const getCompanies = async companyFilter => {
    if (!isLoadMoreLoading) {
      setIsLoading(true);
    }

    try {
      const resData = await companyService.getCompanies({
        ...companyFilter,
        page: page,
      });
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
    getCompanies(companyFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isReload]);

  React.useEffect(() => {
    if (!isLoading) {
      setIsReload(!isReload);
      setPage(1);
    }
  }, [companyFilter]);

  React.useEffect(() => {
    if (!isLoading) {
      const companyChange = companies.find(
        value => value.id === companyFollowed.id,
      );

      if (companyChange) {
        let companyNew = [];
        for (let i = 0; i < companies.length; i++) {
          if (companies[i].id === companyFollowed.id) {
            companyNew.push({
              ...companyChange,
              isFollowed: companyFollowed.status,
            });
          } else {
            companyNew.push(companies[i]);
          }
        }
        setCompanies(companyNew);
      }
    }
  }, [companyFollowed]);

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
            title="Chúng tôi không tìm thấy công ty bạn đang tìm kiếm hiện tại"
            imgSize="3xs"
          />
        </Center>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              colors={['#FF9228']}
            />
          }
          data={companies}
          renderItem={({item}) => (
            <Center width="50%" paddingY="1" paddingX="1" key={item.id}>
              <Company
                id={item.id}
                companyName={item?.companyName}
                companyImageUrl={item?.companyImageUrl}
                followNumber={item?.followNumber}
                jobPostNumber={item?.jobPostNumber}
                isFollowed={item?.isFollowed}
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
  );
};

export default React.memo(MainCompanyCard);
