import React from 'react';
import {View} from 'native-base';

import {SEARCH_TYPE_WITH_KEYWORD} from '../../configs/constants';
import {SheetManager} from 'react-native-actions-sheet';
import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import MainJobPostsCard from '../../components/MainJobPostsCard/MainJobPostsCard';
import FilterButton from '../../components/formControls/FilterButton';
import KeywordSearch from '../../components/KeywordSearch/KeywordSearch';

const MainJobPostScreen = ({navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <KeywordSearch searchType={SEARCH_TYPE_WITH_KEYWORD.JOB_POST_SEARCH} />
      ),
      headerRight: () => <FilterButton onPress={handleFilter} />,
    });
  }, []);

  const handleFilter = () => {
    SheetManager.show('filter-job-post-sheet');
  };

  return (
    <View onLayout={handleLayout}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <>
          <View px="5">
            {/* Start: MainJobPostsCard */}
            <MainJobPostsCard />
            {/* End: MainJobPostsCard */}
          </View>
        </>
      )}
    </View>
  );
};

export default MainJobPostScreen;
