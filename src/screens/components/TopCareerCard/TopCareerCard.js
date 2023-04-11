import React from 'react';
import {HStack, ScrollView, Skeleton, Text, View} from 'native-base';

import commonService from '../../../services/commonService';

const Loading = (
  <HStack space={2}>
    {Array.from(Array(5).keys()).map(value => (
      <Skeleton key={value} h="10" w="20" rounded="lg" />
    ))}
  </HStack>
);

const TopCareerCard = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [careers, setCareers] = React.useState([]);

  React.useEffect(() => {
    const getTopCareers = async () => {
      setIsLoading(true);
      try {
        const resData = await commonService.getTop10Careers();

        setCareers(resData.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getTopCareers();
  }, []);

  return (
    <ScrollView
      style={{flexDirection: 'row'}}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {isLoading
        ? Loading
        : careers.map(value => (
            <View
              key={value.id}
              style={{
                height: 40,
                backgroundColor: '#cbc9d4',
                borderRadius: 10,
                padding: 13,
                marginRight: 15,
              }}>
              <Text
                style={{
                  lineHeight: 16,
                  fontSize: 12,
                  fontFamily: 'DMSans-Medium',
                  color: '#524b6b',
                }}>
                {value.name}
              </Text>
            </View>
          ))}
    </ScrollView>
  );
};

export default TopCareerCard;
