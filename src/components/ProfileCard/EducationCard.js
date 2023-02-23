import React from 'react';
import {Box, HStack, Icon, Text, View, VStack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ProfileCard from './ProfileCard';

const EducationCard = () => {
  return (
    <ProfileCard titleIcon="graduation" title="Education" isShowDivider={true}>
      <View>
        <VStack space={5}>
          {[1, 2, 3, 4].map(val => (
            <View key={val}>
              <HStack justifyContent="space-between" paddingBottom={2}>
                <View justifyContent="center" alignItems="baseline">
                  <HStack>
                    <Box justifyContent="center">
                      <Text
                        fontFamily="dMSansBold"
                        lineHeight="sm"
                        fontSize="sm"
                        color="myJobCustomColors.haitiBluePurple">
                        Information Technology {val}
                      </Text>
                    </Box>
                  </HStack>
                </View>
                <View>
                  <Icon
                    size="lg"
                    marginRight={1.5}
                    as={AntDesign}
                    name="edit"
                    color="myJobCustomColors.deepSaffron"
                    _light={{
                      color: 'myJobCustomColors.deepSaffron',
                    }}
                  />
                </View>
              </HStack>
              <Box paddingBottom={1}>
                <Text
                  fontFamily="dMSansRegular"
                  fontSize="xs"
                  lineHeight="sm"
                  color="myJobCustomColors.mulledWine">
                  University of Oxford
                </Text>
              </Box>
              <Box>
                <Text
                  fontFamily="dMSansRegular"
                  fontSize="xs"
                  lineHeight="sm"
                  color="myJobCustomColors.mulledWine">
                  Sep 2010 - Aug 2013
                </Text>
              </Box>
            </View>
          ))}
        </VStack>
      </View>
    </ProfileCard>
  );
};

export default EducationCard;
