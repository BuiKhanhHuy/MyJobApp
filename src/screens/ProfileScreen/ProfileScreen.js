import React from 'react';
import {ImageBackground} from 'react-native';
import {
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
import {SheetManager} from 'react-native-actions-sheet';
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
import errorHandling from '../../utils/errorHandling';
import ChatIcon from '../../components/ChatIcon';
import SettingIcon from '../../components/SettingIcon';

const ProfileScreen = ({navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();

  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {currentUser, isAuthenticated} = useSelector(state => state.user);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleLogout = async () => {
    const logout = () => {
      dispatch(removeUserInfo())
        .unwrap()
        .then(() => {
          navigation.navigate('Login');
          setIsFullScreenLoading(false);
        })
        .catch(error => {
          console.log('ERROR: ', error);
          errorHandling(error);
          setIsFullScreenLoading(false);
        });
    };

    const isOk = await SheetManager.show('confirm-sheet', {
      payload: {
        title: 'Đăng xuất',
        description: 'Bạn có chắc chắn muốn đăng xuất?',
        yesText: 'Đồng ý',
        noText: 'Hủy bỏ',
      },
    });

    if (isOk) {
      setIsFullScreenLoading(true);
      logout();
    }
  };

  return (
    <>
      <View flex={1} onLayout={handleLayout}>
        {isFullScreenLoading && <BackdropLoading />}
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
                  paddingTop={1}
                  paddingBottom={6}
                  paddingX={6}
                  borderBottomLeftRadius="3xl"
                  borderBottomRightRadius="3xl">
                  <View flex={1}>
                    <View flex={4} justifyContent="center">
                      <HStack justifyContent="flex-end" alignItems="center">
                        {/* Start: ChatIcon */}
                        {isAuthenticated && (
                          <ChatIcon
                            color={colors.myJobCustomColors.white}
                            bg={'rgba(255, 255, 255, 0.05)'}
                          />
                        )}
                        {/* End: ChatIcon */}

                        {/* Start: SettingIcon */}
                        <SettingIcon
                          color={colors.myJobCustomColors.white}
                          bg={'rgba(255, 255, 255, 0.05)'}
                        />
                        {/* End: SettingIcon */}
                      </HStack>
                    </View>
                    <View flex={isAuthenticated ? 10 : 5.5}>
                      <VStack mt="-5">
                        <Box paddingBottom={1}>
                          {/* Start: EditAvatar */}
                          <EditAvatar />
                          {/* End: EditAvatar */}
                        </Box>
                        <Box>
                          {isAuthenticated ? (
                            <Text
                              mt={0.5}
                              fontFamily="dMSansBold"
                              fontSize="md"
                              color="myJobCustomColors.white">
                              {currentUser?.fullName}
                            </Text>
                          ) : (
                            <Text
                              mt={4}
                              fontFamily="dMSansBold"
                              fontSize="md"
                              color="myJobCustomColors.white">
                              Vui lòng đăng nhập!
                            </Text>
                          )}
                        </Box>
                        <Box>
                          <Text
                            fontFamily="dMSansRegular"
                            fontSize="sm"
                            color="myJobCustomColors.white">
                            {currentUser?.email}
                          </Text>
                          <Text
                            fontFamily="dMSansRegular"
                            fontSize="sm"
                            color="myJobCustomColors.white">
                            {currentUser?.jobSeekerProfile?.phone ||
                              (isAuthenticated && (
                                <Text fontFamily="dMSansItalic" fontSize={13}>
                                  SĐT chưa cập nhật
                                </Text>
                              ))}
                          </Text>
                        </Box>
                      </VStack>
                    </View>
                    <View flex={2.2}>
                      <HStack flex={1} alignItems="center">
                        <View flex={1}>
                          {isAuthenticated ? (
                            <Button
                              backgroundColor="rgba(255, 255, 255, 0.1)"
                              _pressed={{
                                bg: 'myJobCustomColors.white:alpha.50',
                              }}
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
                          ) : (
                            <HStack space={4}>
                              <Button
                                width="48%"
                                onPress={handleLogin}
                                rounded="lg"
                                variant={'outline'}>
                                <Text
                                  fontFamily="DMSansRegular"
                                  color="myJobCustomColors.white">
                                  Đăng nhập
                                </Text>
                              </Button>
                              <Button
                                width="48%"
                                onPress={() => navigation.navigate('SignUp')}
                                rounded="lg"
                                variant={'solid'}
                                bgColor="myJobCustomColors.deepSaffron">
                                <Text
                                  fontFamily="DMSansRegular"
                                  color="myJobCustomColors.white">
                                  Đăng ký
                                </Text>
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
            <View flex={5} padding={3}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <VStack space={12} paddingBottom={PADDING_BOTTOM}>
                  {isAuthenticated && (
                    <>
                      <View>
                        <Text
                          fontFamily="DMSans-Bold"
                          fontSize="lg"
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
                      color="myJobCustomColors.haitiBluePurple">
                      Cài đặt chung
                    </Text>
                    <View paddingTop={4}>
                      {/* Start: SettingOptionCard */}
                      <VStack space={2}>
                        <SettingOptionCard
                          leftIconName="cog-outline"
                          rightIconName="chevron-forward"
                          title="Cài đặt"
                          onPress={() => navigation.navigate('SettingScreen')}
                        />
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
                          onPress={() =>
                            navigation.navigate('TermsOfUseScreen')
                          }
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
                            onPress={handleLogout}
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
    </>
  );
};

export default ProfileScreen;
