import React from 'react';
import {Box, View, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextInputCustom from '../../../../components/TextInputCustom';
import ButtonCustom from '../../../../components/ButtonCustom';

const ResetPasswordForm = ({handleResetPassword, serverErrors = {}}) => {
  const navigation = useNavigation();

  const schema = yup.object().shape({
    code: yup
      .number()
      .required('Mã xác thực là bắt buộc.')
      .typeError('Mã xác thực không hợp lệ.'),
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
            name="code"
            keyboardType="numeric"
            title="Mã xác thực"
            placeholder="Nhập mã xác thực"
          />
        </Box>
        <Box>
          <TextInputCustom
            name="newPassword"
            control={control}
            title="Mật khẩu mới"
            showRequired={true}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry={true}
          />
        </Box>
        <Box>
          <TextInputCustom
            name="confirmPassword"
            control={control}
            title="Mật khẩu xác nhận"
            showRequired={true}
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry={true}
          />
        </Box>
        <VStack space={4} paddingX="2" paddingTop="6">
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
              text="QUAY LẠI"
              textColor="myJobCustomColors.darkIndigo"
              bgColor="myJobCustomColors.moonrakerPurplyBlue"
              onPress={() => navigation.goBack()}
            />
          </Box>
        </VStack>
      </VStack>
    </View>
  );
};

export default ResetPasswordForm;
