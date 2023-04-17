import React from 'react';
import {Center, Image, Text, VStack} from 'native-base';

import {IMAGES} from '../../configs/globalStyles';

const NoData = ({
  title = null,
  titleSize = 'xs',
  img = null,
  imgSize = 'lg',
  children,
}) => {
  return (
    <VStack space={3} py={2}>
      <Center>
        <Image source={img || IMAGES.img1} alt="ICON" size={imgSize} />
      </Center>
      {title && (
        <Center>
          <Text
            fontFamily="dMSansRegular"
            fontSize={titleSize}
            lineHeight="sm"
            color="#AAA6B9">
            {title}
          </Text>
        </Center>
      )}
      <Center>{children}</Center>
    </VStack>
  );
};

export default NoData;
