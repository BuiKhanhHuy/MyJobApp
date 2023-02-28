import React from 'react';
import {Box, View, VStack, Text} from 'native-base';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextInputCustom from '../../../../components/TextInputCustom';
import ButtonCustom from '../../../../components/ButtonCustom';

const SignUpForm = ({
  handleSignUp,
  handleFacebookSignUp,
  handleGoogleSignUp,
}) => {
  const schema = yup
    .object({
      fullName: yup.string().required('Họ và tên là bắt buộc!'),
      email: yup.string().required('Email là bắt buộc!'),
      password: yup.string().required('Mật khẩu là bắt buộc!'),
      confirmPassword: yup.string().required('Mật khẩu xác nhận là bắt buộc!'),
    })
    .required();

  const {control, handleSubmit} = useForm({
    defaultValues: {fullName: '', email: '', password: '', confirmPassword: ''},
    resolver: yupResolver(schema),
  });

  return (
    <View>
      <VStack space={4}>
        <Box>
          <TextInputCustom
            control={control}
            name="fullName"
            label="Họ và tên"
            placeholder="Nhập họ và tên"
          />
        </Box>
        <Box>
          <TextInputCustom
            control={control}
            name="email"
            label="Email"
            placeholder="Nhập email"
          />
        </Box>
        <Box>
          <TextInputCustom
            control={control}
            name="password"
            placeholder="Nhập mật khẩu"
            label="Mật khẩu"
            secureTextEntry={true}
          />
        </Box>
        <Box>
          <TextInputCustom
            control={control}
            name="confirmPassword"
            placeholder="Nhập mật khẩu xác nhận"
            label="Mật khẩu xác nhận"
            secureTextEntry={true}
          />
        </Box>
        <Box>
          <Text textAlign="right">Quên mật khẩu?</Text>
        </Box>
        <VStack space={4} paddingX="2" paddingTop="6">
          <Box>
            <ButtonCustom
              text="ĐĂNG KÝ"
              textColor="myJobCustomColors.white"
              bgColor="myJobCustomColors.darkIndigo"
              onPress={handleSubmit(handleSignUp)}
            />
          </Box>
          <Box>
            <ButtonCustom
              text="ĐĂNG KÝ VỚI FACEBOOK"
              textColor="myJobCustomColors.darkIndigo"
              bgColor="myJobCustomColors.moonrakerPurplyBlue"
              leftIcon={{
                iconName: 'facebook',
                iconColor: 'myJobCustomColors.darkIndigo',
              }}
              onPress={handleFacebookSignUp}
            />
          </Box>
          <Box>
            <ButtonCustom
              text="ĐĂNG KÝ VỚI GOOGLE"
              textColor="myJobCustomColors.darkIndigo"
              bgColor="myJobCustomColors.moonrakerPurplyBlue"
              leftIcon={{
                iconName: 'google',
                iconColor: 'myJobCustomColors.darkIndigo',
              }}
              onPress={handleGoogleSignUp}
            />
          </Box>
        </VStack>
      </VStack>
    </View>
  );
};

export default SignUpForm;
