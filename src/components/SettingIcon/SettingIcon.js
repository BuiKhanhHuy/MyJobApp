import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingIcon = ({color, bg}) => {
  const navigation = useNavigation();

  return (
    <IconButton
      onPress={() => navigation.navigate('SettingScreen')}
      borderRadius="full"
      _pressed={{
        bg: bg,
      }}
      icon={<Ionicons name="settings-outline" color={color} size={26} />}
    />
  );
};

export default SettingIcon;
