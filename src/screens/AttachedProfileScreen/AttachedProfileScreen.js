import React from 'react';
import {ScrollView, VStack, View} from 'native-base';

import PersonalProfileCard from '../components/profileCards/PersonalProfileCard';
import GeneralProfileCard from '../components/profileCards/GeneralProfileCard';

const AttachedProfileScreen = () => {
  return (
    <View padding={6}>
      <ScrollView>
        <VStack space={4}>
          {/* Start: PersonalProfileCard */}
          <PersonalProfileCard />
          {/* End: PersonalProfileCard */}

          {/* Start: GeneralProfileCard */}
          <GeneralProfileCard />
          {/* End: GeneralProfileCard */}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default AttachedProfileScreen;
