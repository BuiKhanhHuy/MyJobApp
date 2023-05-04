import React from 'react';
import {Text, View} from 'native-base';

import {useLayout} from '../../hooks';
import FilterJobPostsCard from '../../components/FilterJobPostsCard';
import BackdropLoading from '../../components/loadings/BackdropLoading';

const FilterJobPostScreen = ({route, navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const {headerTitle, pageSize, params} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({title: headerTitle});
  }, []);

  return (
    <>
      <View paddingX="4" onLayout={handleLayout}>
        {isLayoutLoading ? (
          <BackdropLoading />
        ) : (
          <FilterJobPostsCard
            pageSize={pageSize}
            isPagination={true}
            params={params}
          />
        )}
      </View>
    </>
  );
};

export default FilterJobPostScreen;
