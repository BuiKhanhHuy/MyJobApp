import React from 'react';
import {Box, HStack, Icon, Text, View, VStack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ProfileCard from '../ProfileCard';

const PersonalProfileCard = () => {
  return (
    <ProfileCard
      titleIcon="user"
      title="Thông tin cá nhân"
      isShowDivider={true}>
      <View>
         
      </View>
    </ProfileCard>
  );
};

export default PersonalProfileCard