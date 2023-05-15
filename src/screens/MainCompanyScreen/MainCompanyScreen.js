import React from 'react';
import {View} from 'native-base';
import {useSelector} from 'react-redux';
import {SheetManager} from 'react-native-actions-sheet';

import {SEARCH_TYPE_WITH_KEYWORD} from '../../configs/constants';

import {useLayout} from '../../hooks';
import FilterButton from '../../components/formControls/FilterButton';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import MainCompanyCard from '../../components/MainCompanyCard';
import KeywordSearch from '../../components/KeywordSearch';

const MainCompanyScreen = ({navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const {companyFilter} = useSelector(state => state.filter);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <KeywordSearch
          searchType={SEARCH_TYPE_WITH_KEYWORD.COMPANY_SEARCH}
          placeholder="Tên công ty hoặc lĩnh vực tìm kiếm"
        />
      ),
    });
  }, []);

  React.useEffect(() => {
    let count = 0;
    for (let key in companyFilter) {
      if (!['kw', 'page', 'pageSize'].includes(key)) {
        if (companyFilter[key] !== '' && companyFilter[key] !== null) {
          count += 1;
        }
      }
    }
    navigation.setOptions({
      headerRight: () => <FilterButton onPress={handleFilter} number={count} />,
    });
  }, [companyFilter]);

  const handleFilter = () => {
    SheetManager.show('filter-company-sheet');
  };

  return (
    <>
      <View style={{padding: 16}} paddingX={4} onLayout={handleLayout}>
        {isLayoutLoading ? <BackdropLoading /> : <MainCompanyCard />}
      </View>
    </>
  );
};

export default MainCompanyScreen;
