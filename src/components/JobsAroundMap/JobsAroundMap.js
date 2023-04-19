import React from 'react';
import {
  AlertDialog,
  Box,
  Button,
  Center,
  IconButton,
  Image,
  Text,
  VStack,
  View,
  Radio,
  Stack,
  HStack,
} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';

import {ICONS} from '../../configs/globalStyles';

const CompanyComponent = ({jobPost}) => {
  console.log(jobPost);
  return (
    <Marker
      onPress={value => console.log(value)}
      coordinate={{
        latitude: jobPost.lat,
        longitude: jobPost.lng,
      }}>
      <Center>
        <Image source={ICONS.JOB_LOCATION_ICON} size="xs" alt="L" />
        <Text position="absolute" bottom={'1/5'} fontSize={8.5} color="white">
          {jobPost.id}
        </Text>
      </Center>
    </Marker>
  );
};

const SettingPopup = ({setRadius}) => {
  const [value, setValue] = React.useState(3000);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  const handleChangeValue = () => {
    onClose();
    setRadius(value);
  };

  return (
    <Center>
      <IconButton
        onPress={() => setIsOpen(!isOpen)}
        size="md"
        rounded="full"
        variant="solid"
        borderWidth={0.5}
        borderColor="myJobCustomColors.greyChateauBluePurple"
        backgroundColor="myJobCustomColors.white"
        _icon={{
          as: Octicons,
          name: 'gear',
          color: 'myJobCustomColors.deepSaffron',
        }}
      />
      <AlertDialog
        size="xl"
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
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
                  <Radio.Group
                    name="optionMapGroup"
                    defaultValue={3000}
                    value={value}
                    onChange={value => setValue(value)}
                    accessibilityLabel="pick a size">
                    <HStack justifyContent="space-between" space={4}>
                      <Radio
                        value={3000}
                        colorScheme="warning"
                        size="md"
                        my={1}>
                        <Text fontFamily="dMSansRegular" color="#524B6B">
                          3 Km
                        </Text>
                      </Radio>
                      <Radio
                        value={5000}
                        colorScheme="warning"
                        size="md"
                        my={1}>
                        <Text fontFamily="dMSansRegular" color="#524B6B">
                          5 Km
                        </Text>
                      </Radio>
                      <Radio
                        value={10000}
                        colorScheme="warning"
                        size="md"
                        my={1}>
                        <Text fontFamily="dMSansRegular" color="#524B6B">
                          10 Km
                        </Text>
                      </Radio>
                      <Radio
                        value={25000}
                        colorScheme="warning"
                        size="md"
                        my={1}>
                        <Text fontFamily="dMSansRegular" color="#524B6B">
                          25 Km
                        </Text>
                      </Radio>
                    </HStack>
                  </Radio.Group>
                </Center>
              </View>
            </VStack>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
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
                backgroundColor="myJobCustomColors.darkIndigo">
                <Text
                  fontFamily="dMSansRegular"
                  color="myJobCustomColors.white">
                  Áp dụng
                </Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

const JobsAroundMap = ({currentLocation, jobPosts, radius, setRadius}) => {
  return currentLocation?.latitude && currentLocation?.longitude ? (
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
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}>
        <Circle
          center={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          radius={radius}
          fillColor={'rgba(255, 99, 71, 0.11)'}
          strokeColor={'rgba(255, 99, 71, 0.15)'}
        />
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={{
            uri: 'https://img.icons8.com/emoji/110/round-pushpin-emoji.png',
          }}
        />

        {jobPosts.map(value => (
          <CompanyComponent key={value.id} jobPost={value} />
        ))}
      </MapView>
    </View>
  ) : (
    <Text>Dang loading....</Text>
  );
};

export default JobsAroundMap;
