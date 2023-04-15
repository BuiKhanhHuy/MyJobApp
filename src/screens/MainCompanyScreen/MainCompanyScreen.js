import React from 'react';
import {View} from 'native-base';
import {SheetManager} from 'react-native-actions-sheet';

import {SEARCH_TYPE_WITH_KEYWORD} from '../../configs/constants';

import {useLayout} from '../../hooks';
import FilterButton from '../../components/formControls/FilterButton';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import MainCompanyCard from '../../components/MainCompanyCard/MainCompanyCard';
import KeywordSearch from '../../components/KeywordSearch/KeywordSearch';

const MainCompanyScreen = ({navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <KeywordSearch
          searchType={SEARCH_TYPE_WITH_KEYWORD.COMPANY_SEARCH}
          placeholder="Tên công ty hoặc lĩnh vực tìm kiếm"
        />
      ),
      headerRight: () => <FilterButton onPress={handleFilter} />,
    });
  }, []);

  const handleFilter = () => {
    SheetManager.show('filter-company-sheet');
  };

  return (
    <View style={{padding: 16}} onLayout={handleLayout}>
      {isLayoutLoading ? <BackdropLoading /> : <MainCompanyCard />}
    </View>
  );
};

export default MainCompanyScreen;
