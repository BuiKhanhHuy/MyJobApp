import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Box, ScrollView, Skeleton, VStack, View} from 'native-base';

import {DATE_OPTIONS} from '../../../../configs/constants';
import TextInputCustom from '../../../../components/TextInputCustom/TextInputCustom';
import DateTimePickerCustom from '../../../../components/formControls/DateTimePickerCustom/DateTimePickerCustom';
import TextAreaCustom from '../../../../components/TextAreaCustom/TextAreaCustom';
import ButtonCustom from '../../../../components/ButtonCustom/ButtonCustom';

const AddOrEditCertificateForm = ({
  handleAddOrUpdate,
  editData,
  serverErrors = {},
}) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Tên chứng chỉ là bắt buộc.')
      .max(200, 'Tên chứng chỉ vượt quá độ dài cho phép.'),
    trainingPlace: yup
      .string()
      .required('Tên trường/Trung tâm đào tạo là bắt buộc.')
      .max(255, 'Tên trường/Trung tâm đào tạo vượt quá độ dài cho phép.'),
    startDate: yup
      .date()
      .required('Ngày bắt đầu là bắt buộc.')
      .typeError('Ngày bắt đầu là bắt buộc.'),
    expirationDate: yup.date().nullable(),
  });

  const {control, setError, reset, handleSubmit} = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (editData) {
      reset(formValues => ({
        ...formValues,
        ...editData,
      }));
    } else {
      reset();
    }
  }, [editData, reset]);

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
              control={control}
              name="name"
              showRequired={true}
              placeholder="Nhập tên chứng chỉ"
              title="Tên chứng chỉ"
            />
            <TextInputCustom
              control={control}
              name="trainingPlace"
              showRequired={true}
              placeholder="Trường/Trung tâm đào tạo"
              title="Nhập tên trường/Trung tâm đào tạo"
            />
            <DateTimePickerCustom
              name="startDate"
              control={control}
              title="Ngày bắt đầu"
              showRequired={true}
            />
            <DateTimePickerCustom
              name="expirationDate"
              control={control}
              title="Ngày hết hạn (Để trống nếu chứng chỉ vô thời hạn)"
            />
          </VStack>
        </ScrollView>
      </View>
      <View justifyContent="center">
        <Box px={6} pt={4}>
          <VStack space={4}>
            <ButtonCustom
              text="LƯU"
              textColor="myJobCustomColors.white"
              bgColor="myJobCustomColors.darkIndigo"
              onPress={handleSubmit(handleAddOrUpdate)}
              shadow={8}
            />
          </VStack>
        </Box>
      </View>
    </>
  );
};

const Loading = () => (
  <>
    <View flex={10}>
      <ScrollView>
        <VStack space={4}>
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12} />
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12} />
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12} />
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12} />
        </VStack>
      </ScrollView>
    </View>
    <View justifyContent="center">
      <Box px={6} pt={4}>
        <VStack space={4}>
          <Skeleton rounded="md" height={12} />
        </VStack>
      </Box>
    </View>
  </>
);

AddOrEditCertificateForm.Loading = Loading;

export default AddOrEditCertificateForm;
