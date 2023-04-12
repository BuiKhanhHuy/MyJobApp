import React from 'react';
import {useSelector} from 'react-redux';
import {Center, FlatList, Spinner, Text, View} from 'native-base';

import Company from '../Company/Company';

import companyService from '../../services/companyService';

const MainCompanyCard = () => {
  const {companyFilter} = useSelector(state => state.filter);
  const {pageSize} = companyFilter;
  const [isFirstLoading, setIsFirstLoading] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getCompanies = async companyFilter => {
      setIsLoading(true);
      try {
        const resData = await companyService.getCompanies({
          ...companyFilter,
          page: page,
        });
        const data = resData.data;

        setCount(data.count);
        setCompanies(data.results);
      } catch (error) {
      } finally {
        setIsFirstLoading(false);
        setIsLoading(false);
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
      {isFirstLoading ? (
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
        <Text>Rong</Text>
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
            isLoading ? (
              <Center my="3">
                <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
              </Center>
            ) : null
          }
          onEndReachedThreshold={0.2}
        />
      )}
    </View>
  );
};

export default MainCompanyCard;
