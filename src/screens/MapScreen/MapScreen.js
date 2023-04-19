import React from 'react';
import {View} from 'native-base';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import JobsAroundMap from '../../components/JobsAroundMap';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import jobService from '../../services/jobService';
import toastMessages from '../../utils/toastMessages';

const MapScreen = () => {
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState({
    latitude: null,
    longitude: null,
  });
  const [radius, setRadius] = React.useState(3000);
  const [jobPosts, setJobPosts] = React.useState([]);

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
              console.log(position);
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
    const getJobPostsAround = async data => {
      setIsFullScreenLoading(true);

      try {
        const resData = await jobService.getJobPostsAround(data);

        console.log("Job Posts: ", resData.data)
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const dataFilter = {
      currentLatitude: currentLocation?.latitude,
      currentLongitude: currentLocation?.longitude,
      radius: radius,
    };

    if (currentLocation?.latitude && currentLocation?.longitude) {
      getJobPostsAround(dataFilter);
    }
  }, [radius]);

  return (
    <View>
      {isFullScreenLoading && <BackdropLoading />}
      <JobsAroundMap
        currentLocation={currentLocation}
        jobPosts={jobPosts}
        radius={radius}
        setRadius={setRadius}
      />
    </View>
  );
};

export default MapScreen;
