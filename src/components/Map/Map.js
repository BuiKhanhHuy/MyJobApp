import React from 'react';
import {Text, View} from 'native-base';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import {ICONS} from '../../configs/globalStyles';

const Map = ({title, subTitle, latitude, longitude}) => {
  return latitude && longitude ? (
    <View
      style={{
        borderRadius: 10,
        width: '100%',
        overflow: 'hidden',
      }}>
      <MapView
        style={{
          height: 220,
          width: '100%',
        }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={title || ''}
          description={subTitle || ''}
          image={ICONS.LOCATION}
        />
      </MapView>
    </View>
  ) : (
    <Text
      fontFamily="DMSans-Italic"
      textAlign="justify"
      color="myJobCustomColors.mulledWine">
      Chưa thể xác định vị trí trên bản đồ
    </Text>
  );
};

export default Map;
