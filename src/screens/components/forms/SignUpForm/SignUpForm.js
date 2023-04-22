import React from 'react';
import {Box, View, VStack, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextInputCustom from '../../../../components/TextInputCustom';
import ButtonCustom from '../../../../components/ButtonCustom';

const SignUpForm = ({
  handleRegister,
  handleFacebookRegister,
  handleGoogleRegister,
  serverErrors = {},
}) => {
  const navigation = useNavigation();
  const schema = yup.object().shape({
    fullName: yup.string().required('Họ và tên là bắt buộc.'),
    email: yup
      .string()
      .required('Email là bắt buộc!')
      .email('Email không đúng định dạng')
      .max(100, 'Email vượt quá độ dài cho phép.'),
    password: yup
      .string()
      .required('Mật khẩu là bắt buộc!')
      .max(128, 'Mật khẩu vượt quá độ dài cho phép.'),
    confirmPassword: yup
      .string()
      .required('Mật khẩu xác nhận là bắt buộc.')
      .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không chính xác.'),
  });

  const {control, setError, handleSubmit} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    for (let err in serverErrors) {
      setError(err, {type: 400, message: serverErrors[err]?.join(' ')});
    }
  }, [serverErrors, setError]);

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
          <Text
            textAlign="right"
            onPress={() => navigation.navigate('ForgotPassword')}>
            Quên mật khẩu?
          </Text>
        </Box>
        <VStack space={4} paddingX="2" paddingTop="6">
          <Box>
            <ButtonCustom
              text="ĐĂNG KÝ"
              textColor="myJobCustomColors.white"
              bgColor="myJobCustomColors.darkIndigo"
              onPress={handleSubmit(handleRegister)}
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
              onPress={handleFacebookRegister}
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
              onPress={handleGoogleRegister}
            />
          </Box>
        </VStack>
      </VStack>
    </View>
  );
};

export default SignUpForm;
