import React from 'react';
import {Icon, Input, View} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {SheetManager} from 'react-native-actions-sheet';

import {useLayout} from '../../hooks';
import FilterButton from '../../components/formControls/FilterButton';
import MainCompanyCard from '../../components/MainCompanyCard/MainCompanyCard';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';

const MainCompanyScreen = ({navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <Input
          width="97%"
          marginLeft={-12}
          backgroundColor="myJobCustomColors.whiteSmoke"
          borderColor="myJobCustomColors.ghostPurpleBlue"
          borderRadius="md"
          borderWidth="1"
          padding="2"
          height="10"
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
          placeholder="Tên công ty, lĩnh vực tìm kiếm"
          lineHeight="2xs"
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
