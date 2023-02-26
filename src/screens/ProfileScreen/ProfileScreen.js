import React from 'react';
import {ImageBackground} from 'react-native';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  ScrollView,
  Text,
  useTheme,
  View,
  VStack,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AboutMeCard from '../components/profileCards/AboutMeCard';
import WorkExperienceCard from '../components/profileCards/WorkExperienceCard';
import EducationCard from '../components/profileCards/EducationCard';

const ProfileScreen = () => {
  const {colors} = useTheme();

  return (
    <View flex={1}>
      <View flex={2} backgroundColor="red.100">
        <ImageBackground
          borderBottomLeftRadius={30}
          borderBottomRightRadius={30}
          style={{
            height: '100%',
          }}
          source={require('../../assets/images/backgrounds/search-bg.png')}
          resizeMode="cover">
          <View
            height="100%"
            padding={6}
            borderBottomLeftRadius="3xl"
            borderBottomRightRadius="3xl">
            <View flex={1}>
              <View flex={2} justifyContent="center">
                <HStack justifyContent="flex-end" alignItems="center">
                  <Ionicons
                    name="share-social-outline"
                    color={colors.myJobCustomColors.white}
                    size={24}
                    style={{
                      marginRight: 8,
                    }}
                  />
                  <AntDesign
                    name="setting"
                    color={colors.myJobCustomColors.white}
                    size={24}
                    style={{
                      marginLeft: 8,
                    }}
                  />
                </HStack>
              </View>
              <View flex={6}>
                <VStack mt="-5">
                  <Box paddingBottom={1}>
                    <Avatar
                      bg="green.500"
                      mr="1"
                      size="lg"
                      source={{
                        uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
                      }}>
                      H
                    </Avatar>
                  </Box>
                  <Box>
                    <Text
                      fontFamily="dMSansBold"
                      lineHeight="2xl"
                      fontSize="md"
                      color="myJobCustomColors.white">
                      Bùi Khánh Huy
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontFamily="dMSansRegular"
                      lineHeight="sm"
                      fontSize="sm"
                      color="myJobCustomColors.white">
                      Tp. Hồ Chí Minh
                    </Text>
                  </Box>
                </VStack>
              </View>
              <View flex={2}>
                <HStack flex={1} alignItems="center">
                  <View flex={1}>
                    <Text color="myJobCustomColors.white" lineHeight="sm">
                      <Text fontFamily="dMSansBold" fontSize="sm">
                        120K
                      </Text>{' '}
                      <Text fontFamily="dMSansRegular" fontSize="xs">
                        Follower
                      </Text>
                    </Text>
                  </View>
                  <View flex={1}>
                    <Text color="myJobCustomColors.white" lineHeight="sm">
                      <Text fontFamily="dMSansBold" fontSize="sm">
                        20K
                      </Text>{' '}
                      <Text fontFamily="dMSansRegular" fontSize="xs">
                        Following
                      </Text>
                    </Text>
                  </View>
                  <View flex={1}>
                    <Button
                      backgroundColor="rgba(255, 255, 255, 0.1)"
                      _text={{
                        fontFamily: 'dMSansRegular',
                        fontSize: 'xs',
                        lineHeight: 'sm',
                      }}
                      endIcon={<Icon as={AntDesign} name="edit" size="md" />}>
                      Edit profile
                    </Button>
                  </View>
                </HStack>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View flex={5} padding={6}>
        <ScrollView height="100%" showsVerticalScrollIndicator={false}>
          <VStack space={4}>
            <AboutMeCard />
            <WorkExperienceCard />
            <EducationCard />
          </VStack>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;
