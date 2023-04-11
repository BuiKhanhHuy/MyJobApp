import * as React from 'react';
import * as Keychain from 'react-native-keychain';
import {Text, View, Image, Center, HStack, Spinner} from 'native-base';
import { APP_NAME } from '../../configs/constants';
import { LOGO_IMAGE } from '../../configs/globalStyles';

const LogoScreen = ({navigation}) => {
  React.useEffect(() => {
  }, []);

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
      <Center position="absolute" bottom="12">
        <HStack space={2} justifyContent="center">
          <Spinner
            accessibilityLabel="Loading..."
            size="lg"
            color="myJobCustomColors.white"
          />
        </HStack>
      </Center>
    </View>
  );
};

export default LogoScreen;
