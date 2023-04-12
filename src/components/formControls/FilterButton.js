import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Image, View} from 'native-base';

import {ICONS} from '../../configs/globalStyles';

const FilterButton = ({onPress}) => {
  return (
    <View
      style={{
        height: 40,
        width: 40,
        backgroundColor: '#130160',
        borderRadius: 10,
        padding: 8,
      }}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={ICONS.FILTER}
          resizeMode="contain"
          alt=""
          style={{width: '100%', height: '100%'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FilterButton;
