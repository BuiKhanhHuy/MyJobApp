import * as React from 'react';
import {Text, View, Image, Center} from 'native-base';
import {APP_NAME, LOGO_IMAGE} from '../../constants/globalStyles';

const LogoScreen = () => {
  return (
    <View
      backgroundColor="myJobCustomColors.darkIndigo"
      size="full"
      alignItems="center"
      justifyContent="center">
      <Center>
        <Image source={LOGO_IMAGE.lightLogoMedium} alt={APP_NAME} size="sm" />
        <Text
          fontSize="2xl"
          fontFamily="dMSansBold"
          _light={{color: 'myJobCustomColors.white'}}
          _dark={{color: 'myJobCustomColors.white'}}>
          {APP_NAME}
        </Text>
      </Center>
    </View>
  );
};

export default LogoScreen;
