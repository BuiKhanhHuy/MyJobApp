import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, Input} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {SEARCH_TYPE_WITH_KEYWORD} from '../../configs/constants';

import {searchJobPost} from '../../redux/filterSlice';
import {searchCompany} from '../../redux/filterSlice';

const KeywordSearch = props => {
  const dispatch = useDispatch();
  const {placeholder = '', searchType} = props;
  const {
    companyFilter: {kw: companyKw},
    jobPostFilter: {kw: jobPostKw},
  } = useSelector(state => state.filter);
  const [value, setValue] = React.useState(
    searchType === SEARCH_TYPE_WITH_KEYWORD.COMPANY_SEARCH
      ? companyKw
      : searchType === SEARCH_TYPE_WITH_KEYWORD.JOB_POST_SEARCH
      ? jobPostKw
      : '',
  );

  const handleSubmit = () => {
    switch (searchType) {
      case SEARCH_TYPE_WITH_KEYWORD.JOB_POST_SEARCH:
        dispatch(searchJobPost({kw: value}));
        break;
      case SEARCH_TYPE_WITH_KEYWORD.COMPANY_SEARCH:
        dispatch(searchCompany({kw: value}));
        break;
      default:
        break;
    }
  };

  return (
    <Input
      width="97%"
      marginLeft={-12}
      backgroundColor="myJobCustomColors.whiteSmoke"
      borderColor="myJobCustomColors.ghostPurpleBlue"
      borderRadius="md"
      borderWidth={0}
      padding="2"
      height="10"
      returnKeyType="search"
      InputLeftElement={
        <Icon
          as={<Fontisto name="search" />}
          size={5}
          ml="2"
          color="muted.400"
        />
      }
      fontFamily="dMSansRegular"
      fontSize="xs"
      color="myJobCustomColors.darkIndigo"
      placeholder={placeholder}
      value={value}
      onChangeText={value => setValue(value)}
      onSubmitEditing={handleSubmit}
      lineHeight="2xs"
      {...props}
    />
  );
};

export default KeywordSearch;
