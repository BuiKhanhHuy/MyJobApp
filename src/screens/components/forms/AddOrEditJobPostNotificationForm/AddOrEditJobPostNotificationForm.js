import React from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  View,
} from 'native-base';

import {DATE_OPTIONS} from '../../../../configs/constants';
import TextInputCustom from '../../../../components/TextInputCustom/TextInputCustom';
import DateTimePickerCustom from '../../../../components/formControls/DateTimePickerCustom';
import TextAreaCustom from '../../../../components/TextAreaCustom/TextAreaCustom';
import ButtonCustom from '../../../../components/ButtonCustom/ButtonCustom';
import SelectCustom from '../../../../components/formControls/SelectCustom';
import RadioCustom from '../../../../components/formControls/RadioCustom';

const AddOrEditJobPostNotificationForm = ({
  handleAddOrUpdate,
  handleDelete,
  editData,
}) => {
  const {allConfig} = useSelector(state => state.config);

  const schema = yup.object().shape({
    jobName: yup
      .string()
      .required('Từ khóa là bắt buộc.')
      .max(200, 'Từ khóa là bắt buộc.'),
    career: yup
      .number()
      .required('Ngành/nghề là bắt buộc.')
      .typeError('Ngành/nghề là bắt buộc.'),
    city: yup
      .number()
      .required('Tỉnh/Thành phố là bắt buộc.')
      .typeError('Tỉnh/Thành phố là bắt buộc.'),
    position: yup.number().notRequired().nullable(),
    experience: yup.number().notRequired().nullable(),
    salary: yup
      .number()
      .nullable()
      .typeError('Mức lương mong muốn không hợp lệ.')
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return null;
        }
        return value;
      }),
  });

  const {control, reset, handleSubmit} = useForm({
    defaultValues: {
      frequency:
        (allConfig?.frequencyNotificationOptions || []).length > 0
          ? allConfig?.frequencyNotificationOptions[0].id
          : null,
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (editData) {
      reset(formValues => ({
        ...formValues,
        ...editData,
        salary: (editData?.salary || 0).toString(),
      }));
    } else {
      reset();
    }
  }, [editData, reset]);

  return (
    <>
      <View flex={10}>
        <ScrollView>
          <VStack space={4} mb={5}>
            <TextInputCustom
              control={control}
              name="jobName"
              showRequired={true}
              placeholder="Là tên công việc hoặc từ khóa liên quan công việc cần tìm"
              title="Từ khóa"
            />
            <SelectCustom
              name="career"
              control={control}
              options={allConfig?.careerOptions || []}
              title="Ngành nghề"
              showRequired={true}
              placeholder="Chọn ngành nghề"
            />
            <SelectCustom
              name="city"
              control={control}
              options={allConfig?.cityOptions || []}
              title="Tỉnh thành"
              showRequired={true}
              placeholder="Chọn tỉnh thành"
            />
            <SelectCustom
              name="position"
              control={control}
              options={allConfig?.positionOptions || []}
              title="Vị trí làm việc"
              placeholder="Chọn vị trí làm việc"
            />
            <SelectCustom
              name="experience"
              control={control}
              options={allConfig?.experienceOptions || []}
              title="Kinh nghiệm"
              placeholder="Chọn kinh nghiệm"
            />
            <TextInputCustom
              control={control}
              name="salary"
              placeholder="Nhập mức lương mong muốn"
              title="Mức lương mong muốn"
              keyboardType="numeric"
            />
            <RadioCustom
              name="frequency"
              control={control}
              options={allConfig?.frequencyNotificationOptions || []}
              title="Tần suất thông báo"
            />
            {editData && editData?.id && (
              <Box mt={2}>
                <ButtonCustom
                  text="Xóa thông báo việc làm"
                  textColor="myJobCustomColors.lightRed"
                  bgColor="myJobCustomColors.sundownRed"
                  shadow={1}
                  onPress={() => handleDelete(editData?.id)}
                />
              </Box>
            )}
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

AddOrEditJobPostNotificationForm.Loading = Loading;

export default AddOrEditJobPostNotificationForm;
