import React from 'react';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import 'moment/locale/vi';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';
import {
  ScrollView,
  View,
  Text,
  VStack,
  Center,
  HStack,
  Button,
  Icon,
  IconButton,
} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import toastMessages from '../../utils/toastMessages';
import CompanyDetail from '../../components/CompanyDetail/CompanyDetail';

import {WEBSITE_DOMAIN} from '../../configs/constants';
import companyService from '../../services/companyService';
import JobPostOfCompany from '../../components/JobPostOfCompany/JobPostOfCompany';
import {reloadFollowCompany} from '../../redux/reloadSlice';

const ActionButtonComponent = ({
  companyId,
  isFollowed,
  websiteUrl,
  handleFollow,
}) => {
  const navigation = useNavigation();
  const {isAuthenticated} = useSelector(state => state.user);

  const handleOpenUrl = async websiteUrl => {
    const supported = await Linking.canOpenURL(websiteUrl);
    if (supported) {
      await Linking.openURL(websiteUrl);
    } else {
      Alert.alert(`Don't know how to open this URL: ${websiteUrl}`);
    }
  };

  return (
    <HStack space={3}>
      <Button
        flex={1}
        size="lg"
        rounded="lg"
        bgColor="myJobCustomColors.sundownRed"
        onPress={() =>
          isAuthenticated
            ? handleFollow(companyId)
            : navigation.navigate('Login')
        }>
        <Text fontFamily="DMSans-Regular" color="myJobCustomColors.lightRed">
          <Ionicons name="add-outline" size={16} />
          {isFollowed ? 'Đang theo dõi' : 'Theo dõi'}
        </Text>
      </Button>
      <Button
        disabled={!websiteUrl}
        flex={1}
        size="lg"
        rounded="lg"
        bgColor={
          !websiteUrl
            ? 'myJobCustomColors.platinum'
            : 'myJobCustomColors.sundownRed'
        }
        onPress={() => handleOpenUrl(websiteUrl)}>
        <Text
          fontFamily="DMSans-Regular"
          color={
            !websiteUrl
              ? 'myJobCustomColors.greyChateauBluePurple'
              : 'myJobCustomColors.lightRed'
          }>
          <Ionicons name="open-outline" size={16} /> Truy cập website
        </Text>
      </Button>
    </HStack>
  );
};

const MenuButtonComponent = ({tab, setTab}) => {
  return (
    <HStack
      space={2}
      p="2"
      bgColor="myJobCustomColors.white"
      rounded="lg"
      justifyContent="space-between">
      <Button
        flex={1}
        onPress={() => setTab(0)}
        disabled={tab === 0 ? true : false}
        size="lg"
        rounded="lg"
        bgColor={
          tab === 0 ? 'myJobCustomColors.neonCarrot' : 'myJobCustomColors.white'
        }>
        <Text
          fontFamily="DMSans-Bold"
          color={
            tab === 0
              ? 'myJobCustomColors.white'
              : 'myJobCustomColors.darkIndigo'
          }>
          Chi tiết công việc
        </Text>
      </Button>
      <Button
        flex={1}
        onPress={() => setTab(1)}
        disabled={tab === 1 ? true : false}
        size="lg"
        rounded="lg"
        bgColor={
          tab === 1 ? 'myJobCustomColors.neonCarrot' : 'myJobCustomColors.white'
        }>
        <Text
          fontFamily="DMSans-Bold"
          color={
            tab === 1
              ? 'myJobCustomColors.white'
              : 'myJobCustomColors.darkIndigo'
          }>
          Việc làm đang tuyển
        </Text>
      </Button>
    </HStack>
  );
};

const textItem = value => (
  <>
    {value ? (
      <Text style={styles.text} color="myJobCustomColors.mulledWine">
        {value}
      </Text>
    ) : (
      <Text style={styles.textEmpty} color="myJobCustomColors.mulledWine">
        Chưa cập nhật
      </Text>
    )}
  </>
);

const CompanyDetailScreen = ({route, navigation}) => {
  const {id} = route.params;
  const dispath = useDispatch();
  const {allConfig} = useSelector(state => state.config);
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [tab, setTab] = React.useState(0);
  const [companyDetail, setCompanyDetail] = React.useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chi tiết công ty',
      headerRight: () => (
        <IconButton
          onPress={() => handleShareCompany()}
          icon={<Icon as={Ionicons} name="md-share-social-outline" />}
          borderRadius="full"
          _icon={{
            color: 'myJobCustomColors.mulledWineBluePurple',
            size: 'lg',
          }}
        />
      ),
    });
  }, []);

  React.useEffect(() => {
    const getCompanyDetail = async id => {
      setIsLoading(true);

      try {
        const resData = await companyService.getCompanyDetailById(id);

        setCompanyDetail(resData.data);
        setIsLoading(true);
      } catch (error) {
        toastMessages.error();
      }
    };

    getCompanyDetail(id);

  }, [id]);

  const handleFollow = id => {
    const followCompany = async companyId => {
      setIsFullScreenLoading(true);

      try {
        const resData = await companyService.followCompany(companyId);
        const followStatus = resData?.data?.isFollowed;

        dispath(
          reloadFollowCompany({
            id: companyId,
            status: followStatus,
          }),
        );
        setCompanyDetail({...companyDetail, isFollowed: followStatus});
        toastMessages.success(
          followStatus ? 'Đã theo dõi.' : 'Đã hủy theo dõi.',
        );
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    followCompany(id);
  };

  const handleShareCompany = () => {
    if (companyDetail !== null) {
      try {
        Share.open({
          message: companyDetail?.companyName || '',
          title: companyDetail?.companyName || '',
          url: WEBSITE_DOMAIN.local + 'cong-ty/' + companyDetail?.slug,
        })
          .then(res => {
            console.log('Shared');
          })
          .catch(err => {
            err && console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <View onLayout={handleLayout} flex={1}>
        <View flex={9}>
          <ScrollView>
            {isLayoutLoading ? (
              <BackdropLoading />
            ) : (
              <View flex={1}>
                <View flex={1} bgColor="#F9F9F9" zIndex={1}>
                  <Center bottom={-20}>
                    <FastImage
                      style={{
                        width: 84,
                        height: 84,
                        borderRadius: 50,
                        backgroundColor: '#A9A5B8',
                      }}
                      source={{
                        uri: companyDetail?.companyImageUrl,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </Center>
                </View>
                <View
                  flex={1}
                  paddingX={4}
                  bgColor="myJobCustomColors.porcelain">
                  <VStack pt={8} pb={4} space={3}>
                    <Center>
                      <Text
                        fontFamily="DMSans-Bold"
                        fontSize={20}
                        lineHeight={21}
                        textAlign="center"
                        color="myJobCustomColors.haitiBluePurple">
                        {companyDetail?.companyName}
                      </Text>
                    </Center>
                    <View>
                      <Center>
                        <Text
                          textAlign="center"
                          fontSize={16}
                          fontFamily="DMSans-Bold"
                          color="myJobCustomColors.mulledWine">
                          {companyDetail?.fieldOperation}
                        </Text>
                      </Center>
                      <HStack justifyContent="space-between" mt={1.5}>
                        <Center>
                          <Octicons name="dot-fill" color="black" />
                        </Center>
                        <Center>
                          {textItem(
                            allConfig?.employeeSizeDict[
                              companyDetail?.employeeSize
                            ],
                          )}
                        </Center>
                        <Center>
                          <Octicons name="dot-fill" color="black" />
                        </Center>
                        <Center>
                          <Text
                            style={styles.text}
                            color="myJobCustomColors.mulledWine">
                            {textItem(
                              allConfig?.cityDict[
                                companyDetail?.location?.city
                              ],
                            )}
                          </Text>
                        </Center>
                        <Center>
                          <Octicons name="dot-fill" color="black" />
                        </Center>
                        <Center>
                          <Text
                            style={styles.text}
                            color="myJobCustomColors.mulledWine">
                            {textItem(
                              `${companyDetail?.followNumber} lượt theo dõi`,
                            )}
                          </Text>
                        </Center>
                      </HStack>
                    </View>
                  </VStack>
                </View>
                <View flex={6} paddingX={4} paddingY={2} bgColor="#F9F9F9">
                  {/* Start: ActionButtonComponent */}
                  <ActionButtonComponent
                    companyId={companyDetail?.id}
                    isFollowed={companyDetail?.isFollowed}
                    websiteUrl={companyDetail?.websiteUrl}
                    handleFollow={handleFollow}
                  />
                  {/* End: ActionButtonComponent */}

                  <View mt="8">
                    {/* Start: MenuButtonComponent */}
                    <MenuButtonComponent tab={tab} setTab={setTab} />
                    {/* End: MenuButtonComponent */}
                  </View>
                  <View mt={10} mb={5}>
                    {tab === 0 ? (
                      <CompanyDetail
                        companyName={companyDetail?.companyName}
                        employeeSizeId={companyDetail?.employeeSize}
                        fieldOperation={companyDetail?.fieldOperation}
                        taxCode={companyDetail?.taxCode}
                        since={companyDetail?.since}
                        companyEmail={companyDetail?.companyEmail}
                        companyPhone={companyDetail?.companyPhone}
                        websiteUrl={companyDetail?.websiteUrl}
                        facebookUrl={companyDetail?.facebookUrl}
                        youtubeUrl={companyDetail?.youtubeUrl}
                        linkedinUrl={companyDetail?.linkedinUrl}
                        description={companyDetail?.description}
                        cityId={companyDetail?.location?.city}
                        address={companyDetail?.location?.address}
                        lat={companyDetail?.location?.lat}
                        lng={companyDetail?.location?.lng}
                        companyImages={companyDetail?.companyImages}
                      />
                    ) : (
                      <View onLayout={handleLayout}>
                        {/* Start: JobPostOfCompany */}
                        <JobPostOfCompany
                          params={{companyId: companyDetail?.id}}
                          companyId={companyDetail?.id}
                          companyName={companyDetail?.companyName}
                        />
                        {/* End: JobPostOfCompany */}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      {isFullScreenLoading && <BackdropLoading />}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'DMSans-Regular',
    textAlign: 'justify',
  },
  textEmpty: {
    fontFamily: 'DMSans-Italic',
    textAlign: 'justify',
  },
});

export default CompanyDetailScreen;
