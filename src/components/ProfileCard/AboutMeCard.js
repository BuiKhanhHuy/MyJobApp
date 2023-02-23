import React from 'react';
import {View, Text} from 'native-base';

import ProfileCard from './ProfileCard';

const AboutMeCard = () => {
  return (
    <ProfileCard titleIcon="user" title="About me" isShowDivider={true}>
      <View>
        <Text
          fontFamily="dMSansRegular"
          fontSize="sm"
          lineHeight="sm"
          color="myJobCustomColors.mulledWine">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus id
          commodo egestas metus interdum dolor.
        </Text>
      </View>
    </ProfileCard>
  );
};

export default AboutMeCard;
