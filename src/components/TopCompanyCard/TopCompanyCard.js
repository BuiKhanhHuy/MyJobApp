import React from 'react';
import {useSelector} from 'react-redux';
import {Center, HStack, ScrollView, View, Text} from 'native-base';

import NoData from '../NoData/NoData';
import Company from '../Company/Company';
import companyService from '../../services/companyService';

const TopCompanyCard = () => {
  const {companyFollowed} = useSelector(state => state.reload);
  const [isLoading, setIsLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);

  React.useEffect(() => {
    const getTopCompanies = async () => {
      try {
        const resData = await companyService.getTopCompanies();
        const data = resData.data;

        setCompanies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getTopCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <View>
      {isLoading ? (
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <HStack space={4}>
            {Array.from(Array(3).keys()).map(value => (
              <Center key={value} width="200">
                <Company.Loading />
              </Center>
            ))}
          </HStack>
        </ScrollView>
      ) : companies.length === 0 ? (
        <View mt={5}>
          <NoData title="Không có dữ liệu" imgSize="xl" />
        </View>
      ) : (
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <HStack space={4}>
            {companies.map(value => (
              <Center key={value.id} width="200">
                <Company
                  id={value.id}
                  companyName={value?.companyName}
                  companyImageUrl={value?.companyImageUrl}
                  followNumber={value?.followNumber}
                  jobPostNumber={value?.jobPostNumber}
                  isFollowed={value?.isFollowed}
                />
              </Center>
            ))}
          </HStack>
        </ScrollView>
      )}
    </View>
  );
};

export default React.memo(TopCompanyCard);
