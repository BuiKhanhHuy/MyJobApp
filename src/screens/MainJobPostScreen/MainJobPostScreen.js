import React from 'react';
import {useSelector} from 'react-redux';
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
  const {jobPostFilter} = useSelector(state => state.filter);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <KeywordSearch searchType={SEARCH_TYPE_WITH_KEYWORD.JOB_POST_SEARCH} />
      ),
    });
  }, []);

  React.useEffect(() => {
    let count = 0;
    for (let key in jobPostFilter) {
      if (!['kw', 'page', 'pageSize'].includes(key)) {
        if (jobPostFilter[key] !== '') {
          count += 1;
        }
      }
    }
    navigation.setOptions({
      headerRight: () => <FilterButton onPress={handleFilter} number={count} />,
    });
  }, [jobPostFilter]);

  const handleFilter = () => {
    SheetManager.show('filter-job-post-sheet');
  };

  return (
    <View onLayout={handleLayout}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <>
          <View p={6} pt={0} mb={12}>
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
