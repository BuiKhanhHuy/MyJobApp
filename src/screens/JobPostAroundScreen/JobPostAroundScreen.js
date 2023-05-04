import React from 'react';
import {Text, View} from 'native-base';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import JobPostAroundCard from '../components/JobPostAroundCard';

const JobPostAroundScreen = ({route, navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const {headerTitle, currentLatitude, currentLongitude, radius} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({title: headerTitle});
  }, []);

  return (
    <>
      <View paddingX="4" onLayout={handleLayout}>
        {isLayoutLoading ? (
          <BackdropLoading />
        ) : (
          <JobPostAroundCard
            bodyData={{
              currentLatitude,
              currentLongitude,
              radius,
            }}
          />
        )}
      </View>
    </>
  );
};

export default JobPostAroundScreen;
