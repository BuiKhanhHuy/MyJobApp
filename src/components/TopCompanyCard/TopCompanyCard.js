import React from 'react';
import {Center, HStack, ScrollView, View, Text} from 'native-base';

import Company from '../Company/Company';
import companyService from '../../services/companyService';

const TopCompanyCard = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);

  React.useEffect(() => {
    const getTopCompanies = async () => {
      try {
        const resData = await companyService.getTopCompanies();
        const data = resData.data;

        setCompanies(data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };

    getTopCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      {isLoading ? (
        <ScrollView horizontal={true}>
          <HStack space={4}>
            {Array.from(Array(3).keys()).map(value => (
              <Center key={value} width="200">
                <Company.Loading />
              </Center>
            ))}
          </HStack>
        </ScrollView>
      ) : companies.length === 0 ? (
        <Text>Rong</Text>
      ) : (
        <ScrollView horizontal={true}>
          <HStack space={4}>
            {companies.map(value => (
              <Center key={value} width="200">
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

export default TopCompanyCard;
