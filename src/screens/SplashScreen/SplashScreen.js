import React from 'react';
import {View, Text, Image, Center, Box, VStack, IconButton} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SplashScreen = ({navigation}) => {
  return (
    <View padding="7">
      <View height="10%">
        <Text
          fontFamily="dMSansBold"
          fontSize="2xl"
          lineHeight="sm"
          textAlign="right"
          paddingTop="2">
          MyJob
        </Text>
      </View>
      <View height="50%">
        <Center alignItems="center" justifyContent="center">
          <Image
            resizeMode="contain"
            source={require('../../assets/images/splash.png')}
            alt="Alternate Text"
            size="100%"
          />
        </Center>
      </View>
      <View height="25%" justifyContent="flex-end">
        <VStack>
          <Text fontFamily="dMSansBold" fontSize="4xl" lineHeight="sm">
            Find Your
          </Text>
          <Text
            fontFamily="dMSansBold"
            fontSize="4xl"
            lineHeight="sm"
            textDecorationLine="underline"
            color="myJobCustomColors.neonCarrot">
            Dream Job
          </Text>
          <Text fontFamily="dMSansBold" fontSize="4xl" lineHeight="sm">
            Here
          </Text>
        </VStack>
        <Text
          paddingTop="2"
          color="myJobCustomColors.mulledWine"
          fontFamily="dMSansRegular"
          fontSize="sm"
          lineHeight="xs">
          Explore all the most exciting job roles based on your interest and
          study major.
        </Text>
      </View>
      <View height="15%" alignItems="flex-end" justifyContent="center">
        <IconButton
          backgroundColor="myJobCustomColors.darkIndigo"
          shadow={'6'}
          variant="solid"
          _icon={{
            as: AntDesign,
            name: 'arrowright',
            size: 'xl',
          }}
          size="16"
          style={{borderRadius: 60}}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
