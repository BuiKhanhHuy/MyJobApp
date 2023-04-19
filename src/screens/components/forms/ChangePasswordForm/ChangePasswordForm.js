import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Box, ScrollView, VStack, View} from 'native-base';

import TextInputCustom from '../../../../components/TextInputCustom/TextInputCustom';
import ButtonCustom from '../../../../components/ButtonCustom/ButtonCustom';

const ChangePasswordForm = ({handleUpdate, serverErrors = {}}) => {
  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required('Mật khẩu hiện tại là bắt buộc!')
      .max(128, 'Mật khẩu hiện tại vượt quá độ dài cho phép.'),
    newPassword: yup
      .string()
      .required('Mật khẩu mới là bắt buộc!')
      .max(128, 'Mật khẩu mới vượt quá độ dài cho phép.'),
    confirmPassword: yup
      .string()
      .required('Mật khẩu xác nhận là bắt buộc.')
      .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận không chính xác.'),
  });

  const {control, setError, handleSubmit} = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
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
    <>
      <View flex={10}>
        <ScrollView>
          <VStack space={4}>
            <TextInputCustom
              name="oldPassword"
              control={control}
              title="Mật khẩu hiện tại"
              showRequired={true}
              placeholder="Nhập mật khẩu hiện tại"
              secureTextEntry={true}
            />
            <TextInputCustom
              name="newPassword"
              control={control}
              title="Mật khẩu mới"
              showRequired={true}
              placeholder="Nhập mật khẩu mới"
              secureTextEntry={true}
            />
            <TextInputCustom
              name="confirmPassword"
              control={control}
              title="Mật khẩu xác nhận"
              showRequired={true}
              placeholder="Nhập lại mật khẩu mới"
              secureTextEntry={true}
            />
          </VStack>
        </ScrollView>
      </View>
      <View justifyContent="center">
        <Box px={6} pt={4}>
          <VStack space={4}>
            <ButtonCustom
              text="CẬP NHẬT"
              textColor="myJobCustomColors.white"
              bgColor="myJobCustomColors.darkIndigo"
              onPress={handleSubmit(handleUpdate)}
              shadow={8}
            />
          </VStack>
        </Box>
      </View>
    </>
  );
};

export default ChangePasswordForm;
