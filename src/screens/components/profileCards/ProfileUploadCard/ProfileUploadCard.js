import React from 'react';
import {HStack, ScrollView, Text, View} from 'native-base';

import CvUploadCard from '../../../../components/CvUploadCard/CvUploadCard';

const ProfileUploadCard = () => {
  return (
    <ScrollView horizontal>
      <HStack space={4}>
        {[1, 2, 3].map(value => (
          <View key={value} width={320}>
            <CvUploadCard />
          </View>
        ))}
      </HStack>
    </ScrollView>
  );
};

export default ProfileUploadCard;
