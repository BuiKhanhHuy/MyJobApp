import React from 'react';
import {Box, Center, Image, Text, View, VStack} from 'native-base';
import {useForm} from 'react-hook-form';

import TextInputCustom from '../../components/TextInputCustom';
import ButtonCustom from '../../components/ButtonCustom';

const CheckEmailScreen = ({navigation}) => {
  const {control, handleSubmit} = useForm();

  const handleOpenEmail = () => {
    console.log('>> OPEN EMAIL.');
  };

  return (
    <View paddingX="7" paddingTop="12">
      <View height="20%">
        <VStack alignItems="center">
          <Text
            textAlign="center"
            fontFamily="dMSansBold"
            fontSize="3xl"
            lineHeight="md"
            color="myJobCustomColors.purpleBlue">
            Xác thực email
          </Text>
          <Text textAlign="center" paddingTop="1.5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Text>
        </VStack>
      </View>
      <View height="30%" justifyContent="center" alignItems="center">
        <Center>
          <Image
            source={require('../../assets/images/check-your-email.png')}
            alt="IMAGE"
            size="xl"
            resizeMode="contain"
          />
        </Center>
      </View>
      <View paddingTop="20">
        <VStack space={4}>
          <Box>
            <ButtonCustom
              text="MỞ EMAIL CỦA BẠN"
              textColor="myJobCustomColors.white"
              bgColor="myJobCustomColors.darkIndigo"
              onPress={handleOpenEmail}
            />
          </Box>
          <Box>
            <ButtonCustom
              text="QUAY LẠI ĐĂNG NHẬP"
              textColor="myJobCustomColors.darkIndigo"
              bgColor="myJobCustomColors.moonrakerPurplyBlue"
              onPress={() => console.log('ON CALL BACK LOGIN')}
            />
          </Box>
        </VStack>
      </View>
    </View>
  );
};

export default CheckEmailScreen;
