import React from 'react';
import {ScrollView, VStack, View} from 'native-base';

import PersonalProfileCard from '../components/profileCards/PersonalProfileCard';
import GeneralProfileCard from '../components/profileCards/GeneralProfileCard';
import WorkExperienceCard from '../components/profileCards/WorkExperienceCard';
import EducationCard from '../components/profileCards/EducationCard';
import CertificateCard from '../components/profileCards/CertificateCard';
import LanguageSkillCard from '../components/profileCards/LanguageSkillCard';
import AdvancedSkillCard from '../components/profileCards/AdvancedSkillCard';

const OnlineProfileScreen = ({route, navigation}) => {
  const {headerTitle} = route.params;

  React.useState(() => {
    navigation.setOptions({title: headerTitle});
  }, []);

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

          {/* Start: WorkExperienceCard */}
          <WorkExperienceCard />
          {/* End: WorkExperienceCard */}

          {/* Start: EducationCard */}
          <EducationCard />
          {/* End: EducationCard */}

          {/* Start: CertificateCard */}
          <CertificateCard />
          {/* End: CertificateCard */}

          {/* Start: LanguageSkillCard */}
          <LanguageSkillCard />
          {/* End: LanguageSkillCard */}

          {/* Start: AdvancedSkillCard */}
          <AdvancedSkillCard />
          {/* End: AdvancedSkillCard */}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default OnlineProfileScreen;
