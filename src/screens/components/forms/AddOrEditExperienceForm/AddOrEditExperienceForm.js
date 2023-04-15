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

const AddOrEditExperienceForm = ({handleAddOrUpdate, editData}) => {
  const schema = yup.object().shape({
    jobName: yup
      .string()
      .required('Tên công việc là bắt buộc.')
      .max(200, 'Tên công việc vượt quá độ dài cho phép.'),
    companyName: yup
      .string()
      .required('Tên công ty là bắt buộc.')
      .max(255, 'Tên công ty vượt quá độ dài cho phép.'),
    startDate: yup
      .date()
      .required('Ngày bắt đầu là bắt buộc.')
      .typeError('Ngày bắt đầu là bắt buộc.')
      .max(DATE_OPTIONS.yesterday, 'Ngày bắt đầu phải nhỏ hơn ngày hôm nay.')
      .test(
        'start-date-comparison',
        'Ngày bắt đầu phải nhỏ hơn ngày kết thúc.',
        function (value) {
          return !(value >= this.parent.endDate);
        },
      ),
    endDate: yup
      .date()
      .required('Ngày kết thúc là bắt buộc.')
      .typeError('Ngày kết thúc là bắt buộc.')
      .max(
        DATE_OPTIONS.today,
        'Ngày kết thúc phải nhỏ hơn hoặc bằng ngày hôm nay.',
      )
      .test(
        'end-date-comparison',
        'Ngày kết thúc phải lớn hơn ngày bắt đầu.',
        function (value) {
          return !(value <= this.parent.startDate);
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
        <ScrollView>
          <VStack space={4}>
            <TextInputCustom
              control={control}
              name="jobName"
              showRequired={true}
              placeholder="VD: kỹ sư phần mềm"
              title="Chức danh/vị trí công việc"
            />
            <TextInputCustom
              control={control}
              name="companyName"
              showRequired={true}
              placeholder="Nhập tên công ty"
              title="Tên công ty"
            />
            <DateTimePickerCustom
              name="startDate"
              control={control}
              title="Ngày bắt đầu"
              showRequired={true}
            />
            <DateTimePickerCustom
              name="endDate"
              control={control}
              title="Ngày kết thúc"
              showRequired={true}
            />
            <TextAreaCustom
              control={control}
              name="description"
              placeholder="Nhập nội dung mô tả tại đây"
              title="Mô tả thêm"
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
          <Skeleton rounded="md" height={12}/>
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12}/>
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12}/>
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12}/>
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12}/>
        </VStack>
      </ScrollView>
    </View>
    <View justifyContent="center">
      <Box px={6} pt={4}>
        <VStack space={4}>
          <Skeleton rounded="md" height={12}/>
        </VStack>
      </Box>
    </View>
  </>
);

AddOrEditExperienceForm.Loading = Loading;

export default AddOrEditExperienceForm;
