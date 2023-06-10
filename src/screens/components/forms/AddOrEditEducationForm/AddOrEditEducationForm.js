import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Box, ScrollView, Skeleton, VStack, View} from 'native-base';

import {DATE_OPTIONS} from '../../../../configs/constants';
import TextInputCustom from '../../../../components/TextInputCustom/TextInputCustom';
import DateTimePickerCustom from '../../../../components/formControls/DateTimePickerCustom';
import TextAreaCustom from '../../../../components/TextAreaCustom/TextAreaCustom';
import ButtonCustom from '../../../../components/ButtonCustom/ButtonCustom';

const AddOrEditEducationForm = ({handleAddOrUpdate, editData}) => {
  const schema = yup.object().shape({
    degreeName: yup
      .string()
      .required('Tên bằng cấp/Chứng chỉ là bắt buộc.')
      .max(200, 'Tên bằng cấp/Chứng chỉ vượt quá độ dài cho phép.'),
    major: yup
      .string()
      .required('Chuyên ngành đào tạo là bắt buộc.')
      .max(255, 'Chuyên ngành đào tạo vượt quá độ dài cho phép.'),
    trainingPlaceName: yup
      .string()
      .required('Trường/Trung tâm đào tạo là bắt buộc.')
      .max(255, 'Trường/Trung tâm đào tạo vượt quá độ dài cho phép.'),
    startDate: yup
      .date()
      .required('Ngày bắt đầu là bắt buộc.')
      .typeError('Ngày bắt đầu là bắt buộc.'),
    completedDate: yup
      .date()
      .nullable()
      .test(
        'end-date-comparison',
        'Ngày kết thúc phải lớn hơn ngày bắt đầu.',
        function (value) {
          if (value) {
            return !(value <= this.parent.startDate);
          }
          return true;
        },
      ),
  });

  const {control, reset, handleSubmit} = useForm({
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

  return (
    <>
      <View flex={10}>
        <ScrollView showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <VStack space={4}>
            <TextInputCustom
              control={control}
              name="degreeName"
              showRequired={true}
              placeholder="VD: Bằng Cao Đẳng CNTT, Chứng chỉ nghề điện"
              title="Tên bằng cấp/Chứng chỉ"
            />
            <TextInputCustom
              control={control}
              name="major"
              showRequired={true}
              placeholder="Nhập chuyên ngành đào tạo"
              title="Chuyên ngành đào tạo"
            />
            <TextInputCustom
              control={control}
              name="trainingPlaceName"
              showRequired={true}
              placeholder="Nhập tên trường/Trung tâm đào tạo"
              title="Trường/Trung tâm đào tạo"
            />
            <DateTimePickerCustom
              name="startDate"
              control={control}
              title="Ngày bắt đầu"
              showRequired={true}
            />
            <DateTimePickerCustom
              name="completedDate"
              control={control}
              title="Ngày hoàn thành (Để trống nếu đang học tại đây)"
            />
            <TextAreaCustom
              control={control}
              name="description"
              placeholder="Nhập nội dung mô tả tại đây"
              label="Mô tả thêm"
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
      <ScrollView showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
        <VStack space={4}>
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12} />
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12} />
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

AddOrEditEducationForm.Loading = Loading;

export default AddOrEditEducationForm;
