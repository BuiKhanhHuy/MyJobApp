import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Center, Image, Text, View} from 'native-base';

import {ICONS} from '../../configs/globalStyles';

const FilterButton = ({onPress, number = 0}) => {
  return (
    <View
      style={{
        height: 40,
        width: 40,
        backgroundColor: '#130160',
        borderRadius: 10,
        padding: 8,
      }}>
      {number > 0 && (
        <Center
          position="absolute"
          right={-2.5}
          top={-2.5}
          width={3.5}
          height={3.5}
          rounded="full"
          backgroundColor="myJobCustomColors.burningOrange">
          <Text color="white" fontSize={9}>
            {number}
          </Text>
        </Center>
      )}
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
