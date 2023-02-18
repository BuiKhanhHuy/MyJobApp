import React from 'react';
import {Box, Center, Image, Text, View, VStack} from 'native-base';
import {useForm} from 'react-hook-form';

import TextInputCustom from '../../components/TextInputCustom';
import ButtonCustom from '../../components/ButtonCustom';

const ForgotPasswordScreen = ({navigation}) => {
  const {control, handleSubmit} = useForm();

  const handleResetPassword = () => {
    console.log('>> RESET PASSWORD.');
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
            Quên mật khẩu
          </Text>
          <Text textAlign="center" paddingTop="1.5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Text>
        </VStack>
      </View>
      <View height="25%" justifyContent="center" alignItems="center">
        <Center>
          <Image
            source={require('../../assets/images/forgot-password.png')}
            alt="IMAGE"
            size="xl"
            resizeMode="contain"
          />
        </Center>
      </View>
      <View height="20%" justifyContent="flex-end">
        <VStack>
          <Box>
            <TextInputCustom
              control={control}
              name="email"
              rules={{required: {value: true, message: 'Email là bắt buộc'}}}
              label="Email"
              placeholder="Nhập email"
            />
          </Box>
        </VStack>
      </View>
      <View paddingTop="8">
        <VStack space={4}>
          <Box>
            <ButtonCustom
              text="CẬP NHẬT MẬT KHẨU"
              textColor="myJobCustomColors.white"
              bgColor="myJobCustomColors.darkIndigo"
              onPress={handleResetPassword}
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

export default ForgotPasswordScreen;
