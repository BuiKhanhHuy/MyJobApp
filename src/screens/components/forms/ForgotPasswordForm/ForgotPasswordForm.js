import React from 'react';
import {Box, View, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextInputCustom from '../../../../components/TextInputCustom';
import ButtonCustom from '../../../../components/ButtonCustom';

const ForgotPasswordForm = ({handleRequestResetPassword}) => {
  const navigation = useNavigation();
  const schema = yup
    .object({
      email: yup
        .string()
        .required('Email là bắt buộc!')
        .email('Email không đúng định dạng'),
    })
    .required();

  const {control, handleSubmit} = useForm({
    defaultValues: {email: ''},
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
        <VStack space="4" paddingX="2" paddingTop="6">
          <Box>
            <ButtonCustom
              text="CẬP NHẬT MẬT KHẨU"
              textColor="myJobCustomColors.white"
              bgColor="myJobCustomColors.darkIndigo"
              onPress={handleSubmit(handleRequestResetPassword)}
            />
          </Box>
          <Box>
            <ButtonCustom
              text="QUAY LẠI ĐĂNG NHẬP"
              textColor="myJobCustomColors.darkIndigo"
              bgColor="myJobCustomColors.moonrakerPurplyBlue"
              onPress={() => navigation.navigate('Login')}
            />
          </Box>
        </VStack>
      </VStack>
    </View>
  );
};

export default ForgotPasswordForm;
