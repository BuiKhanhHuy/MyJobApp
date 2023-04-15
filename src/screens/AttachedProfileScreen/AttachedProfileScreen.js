import React from 'react';
import {ScrollView, VStack, View} from 'native-base';
import {useHeaderHeight} from '@react-navigation/elements';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import PersonalProfileCard from '../components/profileCards/PersonalProfileCard';
import GeneralProfileCard from '../components/profileCards/GeneralProfileCard';

const AttachedProfileScreen = ({route, navigation}) => {
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const {headerTitle, resumeId} = route.params;

  return (
    <View padding={6} onLayout={handleLayout} style={{marginTop: headerHeight}}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <ScrollView>
          <VStack space={4}>
            {/* Start: PersonalProfileCard */}
            <PersonalProfileCard />
            {/* End: PersonalProfileCard */}

            {/* Start: GeneralProfileCard */}
            <GeneralProfileCard resumeId={resumeId} />
            {/* End: GeneralProfileCard */}
          </VStack>
        </ScrollView>
      )}
    </View>
  );
};

export default AttachedProfileScreen;
