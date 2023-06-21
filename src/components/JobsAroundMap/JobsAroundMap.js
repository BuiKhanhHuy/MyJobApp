import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  AlertDialog,
  Box,
  Button,
  Center,
  IconButton,
  Text,
  VStack,
  View,
  Radio,
  HStack,
  Spinner,
} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import MapView from 'react-native-map-clustering';
import {PROVIDER_GOOGLE, Marker, Circle, Callout} from 'react-native-maps';
import _ from 'lodash';

import {ICONS} from '../../configs/globalStyles';
import {JOB_MAP_OPTIONS} from '../../configs/constants';
import {useLayout} from '../../hooks';
import AroundJobPost from '../AroundJobPost/AroundJobPost';

const RadioComponent = ({value, setValue}) => {
  return (
    <Radio.Group
      name="optionMapGroup"
      defaultValue={JOB_MAP_OPTIONS.o1.value}
      value={value}
      onChange={value => setValue(value)}
      accessibilityLabel="pick a size">
      <HStack justifyContent="space-between" space={4}>
        <Radio
          value={JOB_MAP_OPTIONS.o1.value}
          colorScheme="warning"
          size="md"
          my={1}>
          <Text fontFamily="dMSansRegular" color="#524B6B">
            3 Km
          </Text>
        </Radio>
        <Radio
          value={JOB_MAP_OPTIONS.o2.value}
          colorScheme="warning"
          size="md"
          my={1}>
          <Text fontFamily="dMSansRegular" color="#524B6B">
            5 Km
          </Text>
        </Radio>
        <Radio
          value={JOB_MAP_OPTIONS.o3.value}
          colorScheme="warning"
          size="md"
          my={1}>
          <Text fontFamily="dMSansRegular" color="#524B6B">
            10 Km
          </Text>
        </Radio>
      </HStack>
    </Radio.Group>
  );
};

const SettingPopup = ({setRadius}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [value, setValue] = React.useState(JOB_MAP_OPTIONS.o1.value);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  const handleChangeValue = () => {
    onClose();
    setRadius(value);
  };

  return (
    <View>
      <Center>
        <IconButton
          onPress={() => setIsOpen(!isOpen)}
          size="md"
          rounded="full"
          variant="solid"
          borderWidth={0.5}
          borderColor="myJobCustomColors.greyChateauBluePurple"
          bg="myJobCustomColors.white"
          _pressed={{
            bg: 'myJobCustomColors.seashell',
          }}
          _icon={{
            as: Octicons,
            name: 'gear',
            color: 'myJobCustomColors.deepSaffron',
          }}
        />
        <AlertDialog
          size="lg"
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}>
          <AlertDialog.Content onLayout={handleLayout}>
            {isLayoutLoading ? (
              <Center my="1/4">
                <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
              </Center>
            ) : (
              <>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>
                  <Text
                    fontFamily="dMSansBold"
                    fontSize={18}
                    color="myJobCustomColors.purpleBlue">
                    Thiết Lập Bản Đồ
                  </Text>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <VStack>
                    <View>
                      <Text
                        fontFamily="dMSansBold"
                        fontSize={16}
                        color="myJobCustomColors.purpleBlue">
                        Chọn khoảng cách tìm
                      </Text>
                      <Center py={3}>
                        {/* Start: RadioComponent */}
                        <RadioComponent value={value} setValue={setValue} />
                        {/* End: RadioComponent */}
                      </Center>
                    </View>
                  </VStack>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="unstyled"
                      bg="myJobCustomColors.porcelain"
                      _pressed={{
                        bg: 'myJobCustomColors.porcelain:alpha.30',
                      }}
                      onPress={onClose}
                      ref={cancelRef}>
                      <Text
                        fontFamily="dMSansRegular"
                        color="myJobCustomColors.darkIndigo">
                        Hủy
                      </Text>
                    </Button>
                    <Button
                      colorScheme="danger"
                      onPress={handleChangeValue}
                      bg="myJobCustomColors.darkIndigo"
                      _pressed={{
                        bg: 'myJobCustomColors.darkIndigo:alpha.50',
                      }}>
                      <Text
                        fontFamily="dMSansRegular"
                        color="myJobCustomColors.white">
                        Áp dụng
                      </Text>
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </>
            )}
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    </View>
  );
};

const JobsAroundMap = ({
  currentLocation,
  clusteredPosts,
  radius,
  setRadius,
}) => {
  const navigation = useNavigation();
  console.log('>>> JobsAroundMap Render');

  return (
    currentLocation?.latitude &&
    currentLocation?.longitude && (
      <View>
        <Box position="absolute" top={16} right={3} zIndex={1}>
          <VStack space={2}>
            <SettingPopup setRadius={setRadius} />
          </VStack>
        </Box>
        <MapView
          style={{
            height: '100%',
            width: '100%',
          }}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: currentLocation.latitudeDelta,
            longitudeDelta: currentLocation.longitudeDelta,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          loadingIndicatorColor="#FF9228"
          loadingEnabled={true}
          clusterColor="#FF9228">
          <Circle
            center={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            radius={radius}
            fillColor={'rgba(255, 99, 71, 0.15)'}
            strokeColor={'rgba(255, 99, 71, 0.2)'}
          />

          {clusteredPosts.map(clusteredPost => (
            <Marker
              key={clusteredPost.id}
              image={`${ICONS.JOB_LOCATION_ICON}`}
              coordinate={{
                latitude: clusteredPost?.latitude,
                longitude: clusteredPost?.longitude,
              }}>
              <Callout
                onPress={() =>
                  navigation.navigate('JobPostDetailScreen', {
                    id: clusteredPost.id,
                  })
                }>
                <Center style={{maxWidth: 350, minWidth: 200}}>
                  <AroundJobPost
                    key={clusteredPost.id}
                    id={clusteredPost?.id}
                    jobName={clusteredPost?.jobName}
                    salaryMin={clusteredPost?.salaryMin}
                    salaryMax={clusteredPost?.salaryMax}
                    deadline={clusteredPost?.deadline}
                    latitude={clusteredPost?.latitude}
                    longitude={clusteredPost?.longitude}
                    companyName={clusteredPost?.mobileCompanyDict?.companyName}
                    companyImageUrl={
                      clusteredPost?.mobileCompanyDict?.companyImageUrl
                    }
                    cityId={clusteredPost?.locationDict?.city}
                  />
                </Center>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    )
  );
};

export default JobsAroundMap;
