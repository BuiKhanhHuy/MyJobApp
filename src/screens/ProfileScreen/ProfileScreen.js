import React from 'react';
import {ImageBackground} from 'react-native';
import {
  Avatar,
  Box,
  Button,
  HStack,
  ScrollView,
  Text,
  useTheme,
  View,
  VStack,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';

import {removeUserInfo} from '../../redux/userSlice';
import BoxProfileCard from '../components/profileCards/BoxProfileCard/BoxProfileCard';
import ProfileUploadCard from '../components/profileCards/ProfileUploadCard/ProfileUploadCard';
import MyCareerCenterCard from '../components/profileCards/MyCareerCenterCard/MyCareerCenterCard';

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
                        <Avatar
                          bg="orange.600"
                          mr="1"
                          size="lg"
                          source={{
                            uri: currentUser?.avatarUrl,
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
                          {currentUser?.fullName}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontFamily="dMSansRegular"
                          lineHeight="sm"
                          fontSize="sm"
                          color="myJobCustomColors.white">
                          {currentUser?.email}
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
                        {/* <Button
                      backgroundColor="rgba(255, 255, 255, 0.1)"
                      _text={{
                        fontFamily: 'dMSansRegular',
                        fontSize: 'xs',
                        lineHeight: 'sm',
                      }}
                      endIcon={<Icon as={AntDesign} name="edit" size="md" />}>
                      Edit profile
                    </Button> */}
                        {isAuthenticated ? (
                          <Button onPress={handleLogout} colorScheme={'error'}>
                            Đăng xuất
                          </Button>
                        ) : (
                          <Button onPress={handleLogin} colorScheme={'success'}>
                            Đăng nhập
                          </Button>
                        )}
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
              </VStack>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;
