import React from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Box, ScrollView, VStack, View} from 'native-base';

import TextInputCustom from '../../../../components/TextInputCustom';
import ButtonCustom from '../../../../components/ButtonCustom';

const EditAccountForm = ({handleUpdate, serverErrors={}}) => {
  const {currentUser} = useSelector(state => state.user);

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Họ và tên là bắt buộc.')
      .max(100, 'Họ và tên vượt quá độ dài cho phép.'),
  });

  const {control, reset, setError, handleSubmit} = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset(formValues => ({
      ...formValues,
      fullName: currentUser?.fullName,
      email: currentUser?.email,
      password: '*****************',
    }));
  }, [currentUser, reset]);

  // show server errors
  React.useEffect(() => {
    if (serverErrors !== null)
      for (let err in serverErrors) {
        setError(err, {
          type: 400,
          message: serverErrors[err]?.join(' '),
        });
      }
    else {
      setError();
    }
  }, [serverErrors, setError]);

  return (
    <>
      <View flex={10}>
        <ScrollView>
          <VStack space={4}>
            <TextInputCustom
              name="fullName"
              title="Họ và tên"
              showRequired={true}
              placeholder="Nhập họ và tên của bạn"
              control={control}
            />
            <TextInputCustom
              name="email"
              title="Email"
              showRequired={true}
              placeholder="Nhập email"
              control={control}
              disabled={true}
            />
            <TextInputCustom
              name="password"
              title="Mật khẩu"
              showRequired={true}
              placeholder="Nhập mật khẩu"
              control={control}
              disabled={true}
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

export default EditAccountForm;
