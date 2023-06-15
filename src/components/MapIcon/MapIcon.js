import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Fab, Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MapIcon = () => {
  const navigation = useNavigation();

  return (
    <Fab
      renderInPortal={false}
      size="md"
      bg="myJobCustomColors.neonCarrot"
      _pressed={{
        bg: 'myJobCustomColors.neonCarrot:alpha.60',
      }}
      shadow={6}
      padding={3}
      right={5}
      bottom={'40'}
      icon={
        <Icon
          color="white"
          as={MaterialCommunityIcons}
          name="map-marker-radius"
          size="xl"
        />
      }
      onPress={() => navigation.navigate('MapScreen')}
    />
  );
};

export default MapIcon;
