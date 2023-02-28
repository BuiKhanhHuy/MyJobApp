import React from 'react';
import {Box, View, VStack, Text, HStack} from 'native-base';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextInputCustom from '../../../../components/TextInputCustom';
import ButtonCustom from '../../../../components/ButtonCustom';

const LoginForm = ({handleLogin, handleFacebookLogin, handleGoogleLogin}) => {
  const schema = yup
    .object({
      email: yup.string().required('Email là bắt buộc!'),
      password: yup.string().required('Mật khẩu là bắt buộc!'),
    })
    .required();

  const {control, handleSubmit} = useForm({
    defaultValues: {email: '', password: ''},
    resolver: yupResolver(schema),
  });

  return (
    <View>
      <VStack space={4}>
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
          <Text textAlign="right">Quên mật khẩu?</Text>
        </Box>
        <VStack space={4} paddingX="2" paddingTop="6">
          <Box>
            <ButtonCustom
              text="ĐĂNG NHẬP"
              textColor="myJobCustomColors.white"
              bgColor="myJobCustomColors.darkIndigo"
              onPress={handleSubmit(handleLogin)}
            />
          </Box>
          <Box>
            <ButtonCustom
              text="ĐĂNG NHẬP VỚI FACEBOOK"
              textColor="myJobCustomColors.darkIndigo"
              bgColor="myJobCustomColors.moonrakerPurplyBlue"
              leftIcon={{
                iconName: 'facebook',
                iconColor: 'myJobCustomColors.darkIndigo',
              }}
              onPress={handleFacebookLogin}
            />
          </Box>
          <Box>
            <ButtonCustom
              text="ĐĂNG NHẬP VỚI GOOGLE"
              textColor="myJobCustomColors.darkIndigo"
              bgColor="myJobCustomColors.moonrakerPurplyBlue"
              leftIcon={{
                iconName: 'google',
                iconColor: 'myJobCustomColors.darkIndigo',
              }}
              onPress={handleGoogleLogin}
            />
          </Box>
        </VStack>
      </VStack>
    </View>
  );
};

export default LoginForm;
