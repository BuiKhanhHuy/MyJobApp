import React from 'react';
import {useSelector} from 'react-redux';
import {View} from 'native-base';

import {SEARCH_TYPE_WITH_KEYWORD} from '../../configs/constants';
import {SheetManager} from 'react-native-actions-sheet';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import MainJobPostsCard from '../../components/MainJobPostsCard';
import FilterButton from '../../components/formControls/FilterButton';
import KeywordSearch from '../../components/KeywordSearch';

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
        if (jobPostFilter[key] !== '' && jobPostFilter[key] !== null) {
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
    <>
      <View onLayout={handleLayout} paddingBottom={'20'}>
        {isLayoutLoading ? (
          <BackdropLoading />
        ) : (
          <>
            <View padding={3} pt={0} mb={12}>
              {/* Start: MainJobPostsCard */}
              <MainJobPostsCard />
              {/* End: MainJobPostsCard */}
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default MainJobPostScreen;
