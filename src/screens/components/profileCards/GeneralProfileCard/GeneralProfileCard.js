import React from 'react';
import {Box, HStack, Icon, Text, View, VStack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ProfileCard from '../ProfileCard';

const GeneralProfileCard = () => {
  return (
    <ProfileCard
      titleIcon="info"
      title="Thông tin chung"
      isShowDivider={true}>
      <View>
         
      </View>
    </ProfileCard>
  );
};

export default GeneralProfileCard