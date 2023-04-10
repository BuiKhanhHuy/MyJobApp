import * as React from 'react';
import {useSelector} from 'react-redux';
import {Avatar, Fab, HStack, Icon, ScrollView, Text, View} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {HOME_FILTER_CAREER, ROLES_NAME} from '../../configs/constants';

import JobTypePopulars from '../../components/JobTypePopulars';
import FilterJobPostsCard from '../../components/FilterJobPostsCard';
import SuggestedJobPostCard from '../../components/SuggestedJobPostCard';

const HomeScreen = ({navigation}) => {
  const {isAuthenticated, currentUser} = useSelector(state => state.user);

  return (
    <>
      <View padding="6" flexDirection="column">
        <View
          flexDirection="row"
          justifyContent="space-between"
          paddingBottom={2}>
          <View>
            <Text
              fontFamily="dMSansBold"
              fontSize="2xl"
              lineHeight="sm"
              color="myJobCustomColors.purpleBlue">
              Hello,
            </Text>
            <Text
              fontFamily="dMSansBold"
              fontSize="2xl"
              lineHeight="sm"
              color="myJobCustomColors.purpleBlue">
              {currentUser?.fullName}
            </Text>
          </View>
          <View>
            <Avatar
              bg="green.500"
              source={{
                uri: currentUser?.avatarUrl,
              }}>
              KH
            </Avatar>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View height="48" marginTop={4} backgroundColor={'blue.100'}></View>
            <View height="56" marginTop={6}>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  lineHeight="sm"
                  color="myJobCustomColors.haitiBluePurple">
                  Find Your Job
                </Text>
              </View>
              <View height="100%" paddingTop={4}>
                <JobTypePopulars />
              </View>
            </View>

            {isAuthenticated &&
              currentUser?.roleName === ROLES_NAME.JOB_SEEKER && (
                <View marginTop={10}>
                  <View>
                    <HStack space={3} justifyContent="space-between">
                      <Text
                        fontFamily="DMSans-Bold"
                        fontSize="lg"
                        lineHeight="sm"
                        color="myJobCustomColors.haitiBluePurple">
                        Việc làm gợi ý
                      </Text>
                      <Text
                        fontFamily="DMSans-Regular"
                        onPress={() =>
                          navigation.navigate('SuggestedJobPostScreen', {
                            headerTitle: 'Việc làm gợi ý',
                            params: {pageSize: 20},
                          })
                        }>
                        Xem Thêm
                      </Text>
                    </HStack>
                  </View>
                  <View paddingTop={4}>
                    {/* Start: SuggestedJobPostCard */}
                    <SuggestedJobPostCard params={{pageSize: 10}} />
                    {/* End: SuggestedJobPostCard */}
                  </View>
                </View>
              )}

            <View marginTop={10}>
              <View>
                <HStack space={3} justifyContent="space-between">
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    lineHeight="sm"
                    color="myJobCustomColors.haitiBluePurple">
                    Việc làm tuyển gấp
                  </Text>
                  <Text
                    fontFamily="DMSans-Regular"
                    onPress={() =>
                      navigation.navigate('FilterJobPostScreen', {
                        headerTitle: 'Việc làm tuyển gấp',
                        params: {
                          pageSize: 20,
                          isUrgent: true,
                        },
                      })
                    }>
                    Xem Thêm
                  </Text>
                </HStack>
              </View>
              <View paddingTop={4}>
                {/* Start: FilterJobPostsCard */}
                <FilterJobPostsCard params={{isUrgent: true, pageSize: 10}} />
                {/* End: FilterJobPostsCard */}
              </View>
            </View>

            <View marginTop={10}>
              <View>
                <HStack space={3} justifyContent="space-between">
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    lineHeight="sm"
                    color="myJobCustomColors.haitiBluePurple">
                    {`Việc làm ngành ${HOME_FILTER_CAREER[0].name}`}
                  </Text>
                  <Text
                    fontFamily="DMSans-Regular"
                    onPress={() =>
                      navigation.navigate('FilterJobPostScreen', {
                        headerTitle: `Việc làm ngành ${HOME_FILTER_CAREER[0].name}`,
                        params: {
                          pageSize: 20,
                          careerId: HOME_FILTER_CAREER[0].id,
                        },
                      })
                    }>
                    Xem Thêm
                  </Text>
                </HStack>
              </View>
              <View paddingTop={4}>
                {/* Start: FilterJobPostsCard */}
                <FilterJobPostsCard
                  params={{
                    careerId: HOME_FILTER_CAREER[0].id,
                    pageSize: 10,
                  }}
                />
                {/* End: FilterJobPostsCard */}
              </View>
            </View>

            <View marginTop={10}>
              <View>
                <HStack space={3} justifyContent="space-between">
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    lineHeight="sm"
                    color="myJobCustomColors.haitiBluePurple">
                    {`Việc làm ngành ${HOME_FILTER_CAREER[1].name}`}
                  </Text>
                  <Text
                    fontFamily="DMSans-Regular"
                    onPress={() =>
                      navigation.navigate('FilterJobPostScreen', {
                        headerTitle: `Việc làm ngành ${HOME_FILTER_CAREER[1].name}`,
                        params: {
                          pageSize: 20,
                          careerId: HOME_FILTER_CAREER[1].id,
                        },
                      })
                    }>
                    Xem Thêm
                  </Text>
                </HStack>
              </View>
              <View paddingTop={4}>
                {/* Start: FilterJobPostsCard */}
                <FilterJobPostsCard
                  params={{
                    careerId: HOME_FILTER_CAREER[1].id,
                    pageSize: 10,
                  }}
                />
                {/* End: FilterJobPostsCard */}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Fab
        renderInPortal={false}
        size="md"
        backgroundColor="myJobCustomColors.neonCarrot"
        shadow={6}
        padding={3}
        right={5}
        bottom={24}
        icon={
          <Icon
            color="white"
            as={MaterialCommunityIcons}
            name="map-marker-radius"
            size="xl"
          />
        }
        onPress={() => navigation.navigate('MapScreen')}
      />
    </>
  );
};

export default HomeScreen;
