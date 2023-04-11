import React from 'react';
import {Icon, Input, Text, View} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import MainJobPostsCard from '../../components/MainJobPostsCard/MainJobPostsCard';
import FilterJobPostForm from '../components/forms/FilterJobPostForm/FilterJobPostForm';

const MainJobPostScreen = ({navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

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
          placeholder="Từ khóa tìm kiếm"
          lineHeight="2xs"
          onPressIn={() => navigation.navigate('MainJobPostScreen')}
        />
      ),
      headerRight: () => <FilterJobPostForm />,
    });
  }, []);

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
