import React from 'react';
import {useDispatch} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/elements';
import {View} from 'native-base';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading';

import {
  resetSearchJobPostAround,
  searchJobPostAround,
} from '../../redux/filterSlice';
import SearchJobPostAroundForm from '../components/forms/SearchJobPostAroundForm/SearchJobPostAroundForm';

const SearchJobPostAroundScreen = ({ navigation}) => {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();

  const handleFilter = data => {
    console.log(data);
    dispatch(searchJobPostAround(data));
    navigation.goBack();
  };

  const handleResetFilter = () => {
    dispatch(resetSearchJobPostAround());
    navigation.goBack();
  };

  return (
    <View
      flex={1}
      padding={6}
      onLayout={handleLayout}
      style={{marginTop: headerHeight}}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <>
          <SearchJobPostAroundForm
            handleFilter={handleFilter}
            handleResetFilter={handleResetFilter}
          />
        </>
      )}
    </View>
  );
};

export default SearchJobPostAroundScreen;
