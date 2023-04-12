import React from 'react';
import {
  Center,
  FlatList,
  HStack,
  ScrollView,
  Spinner,
  Text,
  View,
} from 'native-base';

import Company from '../Company/Company';

const FilterCompanyCard = () => {
  return (
    <View>
     
      <ScrollView horizontal={true}>
        <HStack space={4}>
          {[1, 2, 3, 4, 5].map(value => (
            <Center key={value} width="200">
              <Company />
            </Center>
          ))}
        </HStack>
      </ScrollView>
      {/* <FlatList
        numColumns={2}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={({item}) => <Company />}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <Center my="3">
            <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
          </Center>
        }
        onEndReachedThreshold={0.2}
      /> */}
    </View>
  );
};

export default FilterCompanyCard;
