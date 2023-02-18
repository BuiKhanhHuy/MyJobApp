import React from 'react';
import {IconButton} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = () => {
  return (
    <IconButton
      colorScheme="indigo"
      variant="ghost"
      _icon={{
        as: AntDesign,
        name: 'arrowleft',
      }}
    />
  );
};

export default Header;
