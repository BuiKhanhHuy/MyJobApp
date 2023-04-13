import React from 'react';
import {Box, HStack, Icon, Text, View, VStack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Rating} from 'react-native-ratings';
import ProfileCard from '../ProfileCard';

const LanguageSkillCard = () => {
  return (
    <ProfileCard
      titleIcon="book-open"
      title="Kỹ năng ngôn ngữ"
      isShowDivider={true}>
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
                <HStack space={2}>
                  <Icon
                    size="md"
                    marginRight={1}
                    as={AntDesign}
                    name="delete"
                    color="myJobCustomColors.roseMadder"
                  />
                  <Icon
                    size="md"
                    marginRight={1.5}
                    as={AntDesign}
                    name="edit"
                    color="myJobCustomColors.deepSaffron"
                    _light={{
                      color: 'myJobCustomColors.deepSaffron',
                    }}
                  />
                </HStack>
              </HStack>
              <HStack justifyContent="flex-start">
                <Rating
                  defaultRating={10}
                  imageSize={22}
                  readonly
                />
              </HStack>
            </View>
          ))}
        </VStack>
      </View>
    </ProfileCard>
  );
};

export default LanguageSkillCard;
