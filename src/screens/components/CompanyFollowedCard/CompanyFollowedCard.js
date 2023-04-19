import React from 'react';
import {useSelector} from 'react-redux';
import {Center, FlatList, Spinner, View} from 'native-base';

import toastMessages from '../../../utils/toastMessages';
import NoData from '../../../components/NoData/NoData';
import Company from '../../../components/Company/Company';
import companyFollowedService from '../../../services/companyFollowedService';
import {useLayout} from '../../../hooks';

const pageSize = 10;

const CompanyFollowedCard = () => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const {companyFollowed} = useSelector(state => state.reload);
  const [isReload, setIsReload] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setIsReload(!isReload)
    setPage(1);
  }, [companyFollowed]);

  React.useEffect(() => {
    const getCompaniesFollowed = async params => {
      setIsLoading(true);
      try {
        const resData = await companyFollowedService.getCompaniesFollowed(
          params,
        );
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

    getCompaniesFollowed({
      pageSize: pageSize,
      page: page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isReload]);

  const handleLoadMore = () => {
    if (Math.ceil(count / pageSize) > page) {
      setPage(page + 1);
      setIsLoading(true);
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
            />
          )}
        </View>
      )}
    </View>
  );
};

export default CompanyFollowedCard;
