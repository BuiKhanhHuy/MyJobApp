import React from 'react';
import {ScrollView, VStack, View} from 'native-base';
import {useHeaderHeight} from '@react-navigation/elements';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import PersonalProfileCard from '../components/profileCards/PersonalProfileCard';
import GeneralProfileCard from '../components/profileCards/GeneralProfileCard';
import WorkExperienceCard from '../components/profileCards/WorkExperienceCard';
import EducationCard from '../components/profileCards/EducationCard';
import CertificateCard from '../components/profileCards/CertificateCard';
import LanguageSkillCard from '../components/profileCards/LanguageSkillCard';
import AdvancedSkillCard from '../components/profileCards/AdvancedSkillCard';

const OnlineProfileScreen = ({route, navigation}) => {
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const {headerTitle, resumeId} = route.params;

  return (
    <View
      paddingX={6}
      paddingBottom={6}
      onLayout={handleLayout}
      style={{marginTop: headerHeight}}>
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

            {/* Start: WorkExperienceCard */}
            <WorkExperienceCard resumeId={resumeId} />
            {/* End: WorkExperienceCard */}

            {/* Start: EducationCard */}
            <EducationCard resumeId={resumeId} />
            {/* End: EducationCard */}

            {/* Start: CertificateCard */}
            <CertificateCard resumeId={resumeId} />
            {/* End: CertificateCard */}

            {/* Start: LanguageSkillCard */}
            <LanguageSkillCard resumeId={resumeId} />
            {/* End: LanguageSkillCard */}

            {/* Start: AdvancedSkillCard */}
            <AdvancedSkillCard resumeId={resumeId} />
            {/* End: AdvancedSkillCard */}
          </VStack>
        </ScrollView>
      )}
    </View>
  );
};

export default OnlineProfileScreen;
