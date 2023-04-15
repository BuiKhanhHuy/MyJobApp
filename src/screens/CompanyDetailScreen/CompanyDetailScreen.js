import React from 'react';
import {useSelector} from 'react-redux';
import 'moment/locale/vi';
import {StyleSheet} from 'react-native';
import {
  ScrollView,
  Avatar,
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import toastMessages from '../../utils/toastMessages';
import CompanyDetail from '../../components/CompanyDetail/CompanyDetail';

import companyService from '../../services/companyService';
import FilterJobPostsCard from '../../components/FilterJobPostsCard/FilterJobPostsCard';

const ActionButtonComponent = ({companyId}) => {
  return (
    <HStack space={3}>
      <Button
        flex={1}
        size="lg"
        rounded="lg"
        bgColor="myJobCustomColors.sundownRed"
        onPress={() => alert(companyId + ' theo dõi')}>
        <Text fontFamily="DMSans-Regular" color="myJobCustomColors.lightRed">
          <Ionicons name="add-outline" size={16} /> Theo dõi
        </Text>
      </Button>
      <Button
        flex={1}
        size="lg"
        rounded="lg"
        bgColor="myJobCustomColors.sundownRed"
        onPress={() => alert(companyId + ' open website')}>
        <Text fontFamily="DMSans-Regular" color="myJobCustomColors.lightRed">
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
  const {allConfig} = useSelector(state => state.config);
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(true);
  const [tab, setTab] = React.useState(0);
  const [companyDetail, setCompanyDetail] = React.useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => (
        <IconButton
          icon={<Icon as={MaterialIcons} name="more-vert" />}
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

  return (
    <View onLayout={handleLayout} flex={1}>
      <View flex={9}>
        <ScrollView>
          {isLayoutLoading ? (
            <BackdropLoading />
          ) : (
            <View flex={1}>
              <View flex={1} bgColor="#F9F9F9" zIndex={1}>
                <Center bottom={-20}>
                  <Avatar
                    size={84}
                    bg="myJobCustomColors.neonCarrot"
                    source={{
                      uri: companyDetail?.companyImageUrl,
                    }}>
                    LOGO
                  </Avatar>
                </Center>
              </View>
              <View flex={1} paddingX={6} bgColor="myJobCustomColors.porcelain">
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
                            allConfig?.cityDict[companyDetail?.location?.city],
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
              <View flex={6} paddingX={6} paddingY={2} bgColor="#F9F9F9">
                {/* Start: ActionButtonComponent */}
                <ActionButtonComponent companyId={companyDetail?.id} />
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
                    <View>
                      {/* Start: FilterJobPostsCard */}
                      <FilterJobPostsCard
                        params={{companyId: companyDetail?.id}}
                      />
                      {/* End: FilterJobPostsCard */}
                      <Text
                        mt="3"
                        textAlign="center"
                        fontFamily="DMSans-Bold"
                        color="myJobCustomColors.neonCarrot"
                        onPress={() =>
                          navigation.navigate('FilterJobPostScreen', {
                            headerTitle: `Việc làm đang tuyển tại ${companyDetail?.companyName}`,
                            pageSize: 20,
                            params: {
                              companyId: companyDetail?.id,
                            },
                          })
                        }>
                        Xem Thêm
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
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
