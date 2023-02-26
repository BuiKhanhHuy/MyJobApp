import * as React from 'react';
import * as Keychain from 'react-native-keychain';
import {Text, View, Image, Center, HStack, Spinner} from 'native-base';
import {APP_NAME, LOGO_IMAGE} from '../../constants/globalStyles';

import authService from '../../services/authService';

const LogoScreen = ({navigation}) => {
  React.useEffect(() => {
    // const getUserInfo = () => {};
    // getUserInfo();

    // Store the credentials
    console.log('LOGO SCREEN');
    const demo = async () => {
      try {
        // Retrieve the credentials
        const credentials = await Keychain.getInternetCredentials("MyJob");
        if (credentials) {
          console.log('access_token_sau: ', credentials.username);
          console.log('refresh_token_sau: ', credentials.password);
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
      navigation.navigate("Login")
    };
    demo();
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
      <Center>
        <Text>Huy</Text>
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
