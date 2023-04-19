import * as React from 'react';
import {useSelector} from 'react-redux';
import {
  Avatar,
  Button,
  Fab,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  View,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {HOME_FILTER_CAREER, ROLES_NAME} from '../../configs/constants';

import {PADDING_BOTTOM} from '../../configs/globalStyles';
import JobTypePopulars from '../../components/JobTypePopulars';
import TopCompanyCard from '../../components/TopCompanyCard';
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
              <Avatar
                bg="myJobCustomColors.neonCarrot"
                source={{
                  uri: currentUser?.avatarUrl,
                }}>
                {currentUser?.fullName}
              </Avatar>
            ) : (
              <Button
                onPress={() => navigation.navigate('Login')}
                rounded="md"
                bgColor="myJobCustomColors.darkIndigo"
                fontFamily="DMSans-Bold">
                Đăng nhập
              </Button>
            )}
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View paddingBottom={PADDING_BOTTOM}>
            <View height="48" marginTop={4}>
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/dtnpj540t/image/upload/v1676043960/tam_anh_myjob/a2we0s9as6hzkybn1tn5.png',
                }}
                alt="Alternate Text"
                width="100%"
                height="100%"
                resizeMode="cover"
              />
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
                    onPress={() => navigation.navigate('MainCompanyScreen')}>
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
                    {/* Start: SuggestedJobPostCard */}
                    <SuggestedJobPostCard pageSize={5} />
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
                <FilterJobPostsCard pageSize={5} params={{isUrgent: true}} />
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
