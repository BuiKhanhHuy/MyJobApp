import React from 'react';
import {useSelector} from 'react-redux';
import {Center, FlatList, Spinner, View} from 'native-base';

import toastMessages from '../../utils/toastMessages';
import NoData from '../NoData/NoData';
import Company from '../Company/Company';
import companyService from '../../services/companyService';

const MainCompanyCard = () => {
  const {companyFilter} = useSelector(state => state.filter);
  const {pageSize} = companyFilter;
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
  }, [companyFilter]);

  React.useEffect(() => {
    const getCompanies = async companyFilter => {
      try {
        const resData = await companyService.getCompanies({
          ...companyFilter,
          page: page,
        });
        const data = resData.data;

        setCount(data.count);
        setCompanies(data.results);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
        setIsLoadMoreLoading(false);
      }
    };

    getCompanies(companyFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyFilter, page]);

  const handleLoadMore = () => {
    if (Math.ceil(count / pageSize) > page) {
      setPage(page + 1);
      setIsLoading(true);
    }
  };

  return (
    <View>
      {isLoading ? (
        <FlatList
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
          numColumns={2}
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
        />
      )}
    </View>
  );
};

export default React.memo(MainCompanyCard);
