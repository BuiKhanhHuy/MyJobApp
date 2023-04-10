import React from 'react';
import {Text, View} from 'native-base';

import FilterJobPostsCard from '../../components/FilterJobPostsCard/FilterJobPostsCard';

const FilterJobPostScreen = ({route, navigation}) => {
  const {headerTitle, params} = route.params;

  React.useState(() => {
    navigation.setOptions({title: headerTitle});
  }, []);

  return (
    <View paddingX="4">
      <FilterJobPostsCard isPagination={true} params={params} />
    </View>
  );
};

export default FilterJobPostScreen;
