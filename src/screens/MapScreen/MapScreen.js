import React from 'react';
import {Box, Button, HStack, Slider, Text, View} from 'native-base';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';

const MapScreen = () => {
  return (
    <View flex={1}>
      <View flex={1} paddingX={6} justifyContent="center">
        <HStack space={6} alignItems="center">
          <Box>
            <Text>Phạm vi: 1 km</Text>
          </Box>
          <Box flex={4}>
            <Slider defaultValue={70} colorScheme="orange" w="100%">
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </Box>
          <Box flex={1}>
            <Button
              borderRadius="full"
              size="xs"
              backgroundColor="myJobCustomColors.neonCarrot">
              Tìm
            </Button>
          </Box>
        </HStack>
      </View>
      <View flex={10} backgroundColor="blue.100">
        <MapView
          style={{
            height: '100%',
            width: '100%',
          }}
          initialRegion={{
            latitude: 10.817042511146953,
            longitude: 106.67710216636878,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}>
          <Circle
            center={{
              latitude: 10.817042511146953,
              longitude: 106.67710216636878,
            }}
            radius={1000}
            fillColor={'rgba(255, 99, 71, 0.15)'}
            strokeColor={'rgba(255, 99, 71, 0.15)'}
          />
          <Marker
            coordinate={{
              latitude: 10.817042511146953,
              longitude: 106.67710216636878,
            }}
            title={'Đại học Mở TP. HCM'}
            description={
              'Trường Đại học Mở TP. HCM (Ho Chi Minh City Open University)'
            }
            image={{
              uri: 'https://res.cloudinary.com/dtnpj540t/image/upload/c_fill,h_120,r_1000,w_120/a_360/v1662831072/yc2czkt53rri42oqelyc.png',
              width: 1,
              height: 1,
            }}
          />
          <Marker
            coordinate={{
              latitude: 10.81474263664938,
              longitude: 106.67863208929212,
            }}
            title={'Đại học Mở TP. HCM'}
            description={
              'Trường Đại học Mở TP. HCM (Ho Chi Minh City Open University)'
            }
            image={{
              uri: 'https://res.cloudinary.com/dtnpj540t/image/upload/v1676966861/cz53ppmlfioienduqayy.png',
            }}
          />
          <Marker
            coordinate={{
              latitude: 10.815834944350186,
              longitude: 106.67887192254884,
            }}
            title={'Đại học Mở TP. HCM'}
            description={
              'Trường Đại học Mở TP. HCM (Ho Chi Minh City Open University)'
            }
            image={{
              uri: 'https://res.cloudinary.com/dtnpj540t/image/upload/v1676966861/cz53ppmlfioienduqayy.png',
            }}
          />
          <Marker
            coordinate={{
              latitude: 10.810808160286118,
              longitude: 106.67063217624533,
            }}
            title={'Đại học Mở TP. HCM'}
            description={
              'Trường Đại học Mở TP. HCM (Ho Chi Minh City Open University)'
            }
            image={{
              uri: 'https://res.cloudinary.com/dtnpj540t/image/upload/v1676966861/cz53ppmlfioienduqayy.png',
            }}
          />
        </MapView>
      </View>
      <View flex={4} paddingX={6}>
        <Text>Danh sách việc làm tại đây</Text>
      </View>
    </View>
  );
};

export default MapScreen;
