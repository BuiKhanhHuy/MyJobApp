import * as React from 'react';
import {useSelector} from 'react-redux';
import {
  Avatar,
  Button,
  Fab,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
  View,
  useTheme,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {HOME_FILTER_CAREER, ROLES_NAME} from '../../configs/constants';
import {useLayout} from '../../hooks';

import JobTypePopulars from '../../components/JobTypePopulars';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import TopCompanyCard from '../../components/TopCompanyCard';
import SuggestedJobPostsCard from '../../components/SuggestedJobPostsCard';
import FilterJobPostsCard from '../../components/FilterJobPostsCard';
import BannerCarousel from '../../components/BannerCarousel';
import ChatIcon from '../../components/ChatIcon/ChatIcon';
import MapIcon from '../../components/MapIcon/MapIcon';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();
  const {isAuthenticated, currentUser} = useSelector(state => state.user);
  const [layout, isLayoutLoading, handleLayout] = useLayout();

  return (
    <>
      <View onLayout={handleLayout}>
        {isLayoutLoading ? (
          <BackdropLoading />
        ) : (
          <>
            <View padding="3" flexDirection="column">
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
                    Xin chào,
                  </Text>
                  <Text
                    fontFamily="dMSansBold"
                    fontSize="2xl"
                    lineHeight="sm"
                    color="myJobCustomColors.purpleBlue">
                    {isAuthenticated ? currentUser?.fullName : 'Bạn'}
                  </Text>
                </View>
                <View>
                  {isAuthenticated ? (
                    <HStack justifyContent="flex-end" alignItems="center">
                      {/* Start: ChatIcon */}
                      <ChatIcon
                        color={colors.myJobCustomColors.santaGrey}
                        bg={colors.myJobCustomColors.mercury}
                      />
                      {/* End: ChatIcon */}
                      <IconButton
                        onPress={() => navigation.navigate('ProfileTab')}
                        _pressed={{
                          bg: 'myJobCustomColors.neonCarrot',
                        }}
                        icon={
                          <Avatar
                            style={{
                              width: 45,
                              height: 45,
                            }}
                            bg="myJobCustomColors.neonCarrot"
                            source={{
                              uri: currentUser?.avatarUrl,
                            }}>
                            {currentUser?.fullName}
                          </Avatar>
                        }
                        style={{
                          marginLeft: 12,
                          width: 48,
                          height: 48,
                        }}
                        borderRadius="full"
                      />
                    </HStack>
                  ) : (
                    <Button
                      onPress={() => navigation.navigate('Login')}
                      rounded="md"
                      variant={'outline'}
                      borderColor="myJobCustomColors.darkIndigo">
                      <Text
                        fontFamily="DMSans-Regular"
                        color="myJobCustomColors.darkIndigo">
                        {' '}
                        Đăng nhập
                      </Text>
                    </Button>
                  )}
                </View>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View paddingBottom={220}>
                  <View height="48" marginTop={4}>
                    {/* Start: BannerCarousel */}
                    <BannerCarousel />
                    {/* End: BannerCarousel */}
                  </View>
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
                      {/* Start: JobTypePopulars */}
                      <JobTypePopulars />
                      {/* End: JobTypePopulars */}
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
                          Công ty nổi bậc
                        </Text>
                        <Text
                          fontFamily="DMSans-Bold"
                          color="myJobCustomColors.neonCarrot"
                          onPress={() =>
                            navigation.navigate('MainCompanyScreen')
                          }>
                          Xem Thêm
                        </Text>
                      </HStack>
                    </View>
                    <View paddingTop={4}>
                      {/* Start: TopCompanyCard */}
                      <TopCompanyCard />
                      {/* End: TopCompanyCard */}
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
                              fontFamily="DMSans-Bold"
                              color="myJobCustomColors.neonCarrot"
                              onPress={() =>
                                navigation.navigate('SuggestedJobPostScreen', {
                                  headerTitle: 'Việc làm gợi ý',
                                  pageSize: 20,
                                  params: {},
                                })
                              }>
                              Xem Thêm
                            </Text>
                          </HStack>
                        </View>
                        <View paddingTop={4}>
                          {/* Start: SuggestedJobPostsCard */}
                          <SuggestedJobPostsCard />
                          {/* End: SuggestedJobPostsCard */}
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
                          fontFamily="DMSans-Bold"
                          color="myJobCustomColors.neonCarrot"
                          onPress={() =>
                            navigation.navigate('FilterJobPostScreen', {
                              headerTitle: 'Việc làm tuyển gấp',
                              pageSize: 20,
                              params: {
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
                      <FilterJobPostsCard
                        pageSize={5}
                        params={{isUrgent: true}}
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
                          {`Việc làm ngành ${HOME_FILTER_CAREER[0].name}`}
                        </Text>
                        <Text
                          fontFamily="DMSans-Bold"
                          color="myJobCustomColors.neonCarrot"
                          onPress={() =>
                            navigation.navigate('FilterJobPostScreen', {
                              headerTitle: `Việc làm ngành ${HOME_FILTER_CAREER[0].name}`,
                              pageSize: 20,
                              params: {
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
                        pageSize={5}
                        params={{
                          careerId: HOME_FILTER_CAREER[0].id,
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
                          fontFamily="DMSans-Bold"
                          color="myJobCustomColors.neonCarrot"
                          onPress={() =>
                            navigation.navigate('FilterJobPostScreen', {
                              headerTitle: `Việc làm ngành ${HOME_FILTER_CAREER[1].name}`,
                              pageSize: 20,
                              params: {
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
                        pageSize={5}
                        params={{
                          careerId: HOME_FILTER_CAREER[1].id,
                        }}
                      />
                      {/* End: FilterJobPostsCard */}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>

            {/* Start: MapIcon */}
            <MapIcon />
            {/* End: MapIcon */}
          </>
        )}
      </View>
    </>
  );
};

export default HomeScreen;
