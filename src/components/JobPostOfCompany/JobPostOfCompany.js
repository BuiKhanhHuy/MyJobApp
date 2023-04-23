import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Center, Spinner, Text, View} from 'native-base';

import {useLayout} from '../../hooks';
import FilterJobPostsCard from '../FilterJobPostsCard';

const JobPostOfCompany = ({params, companyId, companyName}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const navigation = useNavigation();

  return (
    <View onLayout={handleLayout}>
      {isLayoutLoading ? (
        <Center mt="5">
          <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
        </Center>
      ) : (
        <>
          <FilterJobPostsCard params={params} />
          <Text
            mt="3"
            textAlign="center"
            fontFamily="DMSans-Bold"
            color="myJobCustomColors.neonCarrot"
            onPress={() =>
              navigation.navigate('FilterJobPostScreen', {
                headerTitle: `Việc làm đang tuyển tại ${companyName}`,
                pageSize: 20,
                params: {
                  companyId: companyId,
                },
              })
            }>
            Xem Thêm
          </Text>
        </>
      )}
    </View>
  );
};

export default JobPostOfCompany;
