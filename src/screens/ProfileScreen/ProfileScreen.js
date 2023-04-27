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
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {PADDING_BOTTOM} from '../../configs/globalStyles';
import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading';

import {removeUserInfo} from '../../redux/userSlice';
import BoxProfileCard from '../components/profileCards/BoxProfileCard';
import ProfileUploadCard from '../components/profileCards/ProfileUploadCard';
import MyCareerCenterCard from '../components/profileCards/MyCareerCenterCard';
import SettingOptionCard from '../../components/SettingOptionCard';
import FeedbackCard from '../components/profileCards/FeedbackCard';
import EditAvatar from '../../components/EditAvatar';

const ProfileScreen = ({navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {currentUser, isAuthenticated} = useSelector(state => state.user);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleLogout = () => {
    dispatch(removeUserInfo());
  };

  return (
    <View flex={1} onLayout={handleLayout}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <>
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
                        {/* Start: EditAvatar */}
                        <EditAvatar />
                        {/* End: EditAvatar */}
                      </Box>
                      <Box>
                        <Text
                          fontFamily="dMSansBold"
                          lineHeight="2xl"
                          fontSize="md"
                          color="myJobCustomColors.white">
                          {currentUser?.fullName || '---'}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontFamily="dMSansRegular"
                          lineHeight="sm"
                          fontSize="sm"
                          color="myJobCustomColors.white">
                          {currentUser?.email || '---'}
                        </Text>
                      </Box>
                    </VStack>
                  </View>
                  <View flex={2}>
                    <HStack flex={1} alignItems="center">
                      {isAuthenticated && (
                        <>
                          <View flex={1}>
                            <Text color="myJobCustomColors.white">
                              <Text fontFamily="dMSansBold" fontSize="sm">
                                120K
                              </Text>{' '}
                              <Text fontFamily="dMSansRegular" fontSize="xs">
                                Follower
                              </Text>
                            </Text>
                          </View>
                          <View flex={1}>
                            <Text color="myJobCustomColors.white">
                              <Text fontFamily="dMSansBold" fontSize="sm">
                                20K
                              </Text>
                              <Text fontFamily="dMSansRegular" fontSize="xs">
                                Following
                              </Text>
                            </Text>
                          </View>
                        </>
                      )}
                      <View flex={1}>
                        {isAuthenticated ? (
                          <HStack space={3}>
                            <Button
                              backgroundColor="rgba(255, 255, 255, 0.1)"
                              _text={{
                                fontFamily: 'dMSansRegular',
                                fontSize: 'xs',
                              }}
                              endIcon={
                                <Icon as={AntDesign} name="edit" size="md" />
                              }
                              onPress={() =>
                                navigation.navigate('EditAccountScreen')
                              }>
                              Tài khoản
                            </Button>
                          </HStack>
                        ) : (
                          <HStack space={4}>
                            <Button
                              onPress={handleLogin}
                              rounded="lg"
                              bgColor="myJobCustomColors.darkIndigo"
                              fontFamily="DMSans-Bold">
                              Đăng nhập
                            </Button>
                            <Button
                              onPress={() => navigation.navigate('SignUp')}
                              rounded="lg"
                              bgColor="myJobCustomColors.neonCarrot"
                              fontFamily="DMSans-Bold">
                              Đăng ký
                            </Button>
                          </HStack>
                        )}
                      </View>
                    </HStack>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View flex={5} padding={6}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <VStack space={12} paddingBottom={PADDING_BOTTOM}>
                {isAuthenticated && (
                  <>
                    <View>
                      <Text
                        fontFamily="DMSans-Bold"
                        fontSize="lg"
                        lineHeight="sm"
                        color="myJobCustomColors.haitiBluePurple">
                        MyJob profile
                      </Text>
                      <View paddingTop={4}>
                        {/* Start: BoxProfileCard */}
                        <BoxProfileCard />
                        {/* End: BoxProfileCard */}
                      </View>
                    </View>
                    <View>
                      <Text
                        fontFamily="DMSans-Bold"
                        fontSize="lg"
                        lineHeight="sm"
                        color="myJobCustomColors.haitiBluePurple">
                        CV đã tải lên MyJob
                      </Text>
                      <View paddingTop={4}>
                        {/* Start: ProfileUploadCard */}
                        <ProfileUploadCard />
                        {/* End: ProfileUploadCard */}
                      </View>
                    </View>
                    <View>
                      <Text
                        fontFamily="DMSans-Bold"
                        fontSize="lg"
                        lineHeight="sm"
                        color="myJobCustomColors.haitiBluePurple">
                        Trung tâm nghề nghiệp của tôi
                      </Text>
                      <View paddingTop={4}>
                        {/* Start: MyCareerCenterCard */}
                        <MyCareerCenterCard />
                        {/* End: MyCareerCenterCard */}
                      </View>
                    </View>
                  </>
                )}
                <View>
                  <Text
                    fontFamily="DMSans-Bold"
                    fontSize="lg"
                    lineHeight="sm"
                    color="myJobCustomColors.haitiBluePurple">
                    Cài đặt chung
                  </Text>
                  <View paddingTop={4}>
                    {/* Start: SettingOptionCard */}
                    <VStack space={2}>
                      <SettingOptionCard
                        leftIconName="notifications-outline"
                        rightIconName="chevron-forward"
                        title="Thông báo"
                        onPress={() => alert('Chức năng đang phát triển.')}
                      />
                      <SettingOptionCard
                        leftIconName="moon-outline"
                        rightIconName="chevron-forward"
                        title="Giao diện"
                        onPress={() => alert('Chức năng đang phát triển.')}
                      />
                      {isAuthenticated && (
                        <SettingOptionCard
                          leftIconName="ios-key-outline"
                          rightIconName="chevron-forward"
                          title="Đổi mật khẩu"
                          onPress={() =>
                            navigation.navigate('ChangePasswordScreen')
                          }
                        />
                      )}
                      <SettingOptionCard
                        leftIconName="ios-alert-circle-outline"
                        rightIconName="chevron-forward"
                        title="Về MyJob"
                        onPress={() => navigation.navigate('ContactUsScreen')}
                      />
                      <SettingOptionCard
                        leftIconName="list-circle-outline"
                        rightIconName="chevron-forward"
                        title="Điều khoản dịch vụ"
                        onPress={() => navigation.navigate('TermsOfUseScreen')}
                      />
                      <SettingOptionCard
                        leftIconName="shield-checkmark-outline"
                        rightIconName="chevron-forward"
                        title="Chính sách bảo mật"
                        onPress={() =>
                          navigation.navigate('PrivacyPolicyScreen')
                        }
                      />
                      {isAuthenticated && (
                        <>
                          {/* Start: FeedbackCard */}
                          <FeedbackCard />
                          {/* End: Start: FeedbackCard */}
                        </>
                      )}
                      {/* End: SettingOptionCard */}
                    </VStack>
                    <View py={5}>
                      <Text
                        textAlign="center"
                        fontFamily="DMSansBold"
                        color="myJobCustomColors.mulledWineBluePurple">
                        Phiên bản ứng dụng: 1.0
                      </Text>
                    </View>
                    {isAuthenticated && (
                      <View>
                        <Button
                          shadow={'myJobCustomShadows.0'}
                          size="lg"
                          rounded="md"
                          backgroundColor="myJobCustomColors.white">
                          <HStack alignItems="center" space={2}>
                            <Text
                              fontFamily="DMSansBold"
                              color="myJobCustomColors.artyClickRed">
                              Đăng xuất
                            </Text>
                            <Ionicons
                              name="ios-exit-outline"
                              size={25}
                              color="#FF0000"
                            />
                          </HStack>
                        </Button>
                      </View>
                    )}
                  </View>
                </View>
              </VStack>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;
