import React from 'react';
import {Box, View, VStack} from 'native-base';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextInputCustom from '../../../../components/TextInputCustom';
import ButtonCustom from '../../../../components/ButtonCustom';

const ForgotPasswordForm = ({handleResetPassword}) => {
  const schema = yup
    .object({
      email: yup.string().required('Email là bắt buộc!'),
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
              onPress={handleSubmit(handleResetPassword)}
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
      </VStack>
    </View>
  );
};

export default ForgotPasswordForm;
