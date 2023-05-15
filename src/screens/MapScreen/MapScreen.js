import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Center,
  HStack,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import {Platform, PermissionsAndroid, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

import {
  JOB_MAP_OPTIONS,
  SEARCH_TYPE_WITH_KEYWORD,
} from '../../configs/constants';
import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import KeywordSearch from '../../components/KeywordSearch/KeywordSearch';
import FilterButton from '../../components/formControls/FilterButton';
import NoData from '../../components/NoData/NoData';
import AroundJobPost from '../../components/AroundJobPost/AroundJobPost';
import JobsAroundMap from '../../components/JobsAroundMap';
import jobService from '../../services/jobService';

const windowWidth = Dimensions.get('window').width;

const MapScreen = () => {
  console.log('MapScreen render');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {jobPostAroundFilter} = useSelector(state => state.filter);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [radius, setRadius] = React.useState(JOB_MAP_OPTIONS.o1.value);
  const [jobPosts, setJobPosts] = React.useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <KeywordSearch
          searchType={SEARCH_TYPE_WITH_KEYWORD.JOB_POST_AROUND_SEARCH}
        />
      ),
    });
  }, []);

  React.useEffect(() => {
    let count = 0;
    for (let key in jobPostAroundFilter) {
      if (!['kw', 'page', 'pageSize', 'isPagination'].includes(key)) {
        if (jobPostAroundFilter[key] !== '') {
          count += 1;
        }
      }
    }
    navigation.setOptions({
      headerRight: () => (
        <FilterButton
          onPress={() => navigation.navigate('SearchJobPostAroundScreen')}
          number={count}
        />
      ),
    });
  }, [jobPostAroundFilter]);

  React.useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          // do something if granted...
        }
      } else if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              console.log('VI TRI HIEN TAI: ', position);
              setCurrentLocation({
                ...currentLocation,
                latitude: position?.coords?.latitude,
                longitude: position?.coords?.longitude,
              });
            },
            error => {
              console.log(error.code, error.message);
            },
            {
              timeout: 50000,
            },
          );
        }
      }
    };

    requestPermissions();
  }, []);

  React.useEffect(() => {
    switch (radius) {
      case JOB_MAP_OPTIONS.o1.value:
        setCurrentLocation({
          ...currentLocation,
          latitudeDelta: JOB_MAP_OPTIONS.o1.latitudeDelta,
          longitudeDelta: JOB_MAP_OPTIONS.o1.longitudeDelta,
        });
        break;
      case JOB_MAP_OPTIONS.o2.value:
        setCurrentLocation({
          ...currentLocation,
          latitudeDelta: JOB_MAP_OPTIONS.o2.latitudeDelta,
          longitudeDelta: JOB_MAP_OPTIONS.o2.longitudeDelta,
        });
        break;
      case JOB_MAP_OPTIONS.o3.value:
        setCurrentLocation({
          ...currentLocation,
          latitudeDelta: JOB_MAP_OPTIONS.o3.latitudeDelta,
          longitudeDelta: JOB_MAP_OPTIONS.o3.longitudeDelta,
        });
        break;
      case JOB_MAP_OPTIONS.o4.value:
        setCurrentLocation({
          ...currentLocation,
          latitudeDelta: JOB_MAP_OPTIONS.o4.latitudeDelta,
          longitudeDelta: JOB_MAP_OPTIONS.o4.longitudeDelta,
        });
        break;
    }
  }, [radius]);

  React.useEffect(() => {
    const getJobPostsAround = async (data, params) => {
      setIsFullScreenLoading(true);

      try {
        const resData = await jobService.getJobPostsAround(data, params);

        setJobPosts(resData.data);
        console.log('CALL API VA RENDER - MapScreen: ');
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const dataFilter = {
      currentLatitude: currentLocation?.latitude,
      currentLongitude: currentLocation?.longitude,
      radius: radius / 1000,
    };

    if (currentLocation?.latitude && currentLocation?.longitude) {
      getJobPostsAround(dataFilter, jobPostAroundFilter);
    }
  }, [radius, jobPostAroundFilter, currentLocation]);

  return (
    <>
      {isFullScreenLoading && <BackdropLoading />}
      <View flex={1}>
        <View flex={10}>
          <JobsAroundMap
            currentLocation={currentLocation}
            jobPosts={jobPosts}
            radius={radius}
            setRadius={setRadius}
          />
        </View>
        <View flex={3} py={4} px={3}>
          <VStack>
            <HStack justifyContent="space-between">
              <Text
                fontFamily="DMSans-Bold"
                color="myJobCustomColors.haitiBluePurple">
                <Text color="myJobCustomColors.artyClickRed">
                  {jobPosts.length}
                </Text>{' '}
                Việc làm trong khu vực
              </Text>
              <Text
                fontFamily="DMSans-Bold"
                color="myJobCustomColors.neonCarrot"
                onPress={() =>
                  navigation.push('JobPostAroundScreen', {
                    headerTitle: `${jobPosts.length} việc trong khu vực`,
                    currentLatitude: currentLocation?.latitude,
                    currentLongitude: currentLocation?.longitude,
                    radius: radius / 1000,
                  })
                }>
                Xem tất cả
              </Text>
            </HStack>
            <View>
              {isFullScreenLoading ? (
                <Center my="3">
                  <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
                </Center>
              ) : jobPosts.length === 0 ? (
                <Center my="3">
                  <NoData title="Không có việc làm nào gần đây" />
                </Center>
              ) : (
                <ScrollView py={4} horizontal={true}>
                  {jobPosts.slice(0, 10).map(value => (
                    <View
                      maxWidth={320}
                      mr={3}
                      key={value.id}
                      width={windowWidth * 0.8}>
                      <AroundJobPost
                        id={value?.id}
                        jobName={value?.jobName}
                        salaryMin={value?.salaryMin}
                        salaryMax={value?.salaryMax}
                        deadline={value?.deadline}
                        latitude={value?.latitude}
                        longitude={value?.longitude}
                        companyName={value?.mobileCompanyDict?.companyName}
                        companyImageUrl={
                          value?.mobileCompanyDict?.companyImageUrl
                        }
                        cityId={value?.locationDict?.city}
                      />
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
          </VStack>
        </View>
      </View>
    </>
  );
};

export default MapScreen;
