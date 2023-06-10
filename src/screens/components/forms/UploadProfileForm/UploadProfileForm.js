import React from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Box, ScrollView, Skeleton, VStack, View} from 'native-base';

import TextInputCustom from '../../../../components/TextInputCustom';
import SelectCustom from '../../../../components/formControls/SelectCustom';
import TextAreaCustom from '../../../../components/TextAreaCustom';
import ButtonCustom from '../../../../components/ButtonCustom';
import UploadCv from '../../../../components/UploadCV';

const UploadProfileForm = ({handleAdd}) => {
  const {allConfig} = useSelector(state => state.config);
  const schema = yup.object().shape({
    file: yup
      .mixed()
      .nonNullable('Tập tin là bắt buộc.')
      .test(
        'files empty',
        'Tập tin là bắt buộc.',
        value => !(value === undefined || value === null || value === ''),
      ),
    title: yup
      .string()
      .required('Vị trí mong muốn là bắt buộc.')
      .max(200, 'Vị trí mong muốn vượt quá độ dài cho phép.'),
    position: yup
      .number()
      .required('Cấp bậc mong muốn là bắt buộc.')
      .typeError('Cấp bậc mong muốn là bắt buộc.'),
    academicLevel: yup
      .number()
      .required('Trình độ học vấn là bắt buộc.')
      .typeError('Trình độ học vấn là bắt buộc.'),
    experience: yup
      .number()
      .required('Kinh nghiệm làm việc là bắt buộc.')
      .typeError('Kinh nghiệm làm việc là bắt buộc.'),
    career: yup
      .number()
      .required('Ngành nghề là bắt buộc.')
      .typeError('Ngành nghề là bắt buộc.'),
    city: yup
      .number()
      .required('Tỉnh/Thành phố là bắt buộc.')
      .typeError('Tỉnh/Thành phố là bắt buộc.'),
    salaryMin: yup
      .number()
      .required('Mức lương mong muốn tối thiểu là bắt buộc.')
      .typeError('Lương tối thiểu không hợp lệ.')
      .min(0, 'Lương tối thiểu không hợp lệ.')
      .test(
        'minimum-wage-comparison',
        'Lương tối thiểu phải nhỏ hơn lương tối đa.',
        function (value) {
          return !(value >= this.parent.salaryMax);
        },
      ),
    salaryMax: yup
      .number()
      .required('Mức lương mong muốn tối đa là bắt buộc.')
      .typeError('Lương tối đa không hợp lệ.')
      .min(0, 'Lương tối đa không hợp lệ.')
      .test(
        'maximum-wage-comparison',
        'Lương tối đa phải lớn hơn lương tối thiểu.',
        function (value) {
          return !(value <= this.parent.salaryMin);
        },
      ),
    typeOfWorkplace: yup
      .number()
      .required('Nơi làm việc là bắt buộc.')
      .typeError('Nơi làm việc là bắt buộc.'),
    jobType: yup
      .number()
      .required('Hình thức làm việc là bắt buộc.')
      .typeError('Hình thức làm việc là bắt buộc.'),
    description: yup
      .string()
      .required('Mục tiêu nghề nghiệp là bắt buộc.')
      .max(800, 'Mục tiêu nghề nghiệp vượt quá độ dài cho phép.'),
  });

  const {control, reset, handleSubmit} = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <View flex={10}>
        <ScrollView showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <VStack space={4}>
            <View>
              <UploadCv
                title="Tập tin"
                showRequired={true}
                control={control}
                name="file"
              />
            </View>
            <TextInputCustom
              name="title"
              showRequired={true}
              title="Vị trí mong muốn"
              placeholder="VD: Lập trình viên Backend"
              control={control}
            />
            <SelectCustom
              name="position"
              control={control}
              options={allConfig?.positionOptions || []}
              title="Cấp bậc mong muốn"
              showRequired={true}
              placeholder="Chọn cấp bậc"
            />
            <SelectCustom
              name="academicLevel"
              control={control}
              options={allConfig?.academicLevelOptions || []}
              title="Trình độ học vấn"
              showRequired={true}
              placeholder="Chọn trình độ học vấn"
            />
            <SelectCustom
              name="experience"
              control={control}
              options={allConfig?.experienceOptions || []}
              title="Kinh nghiệm làm việc"
              showRequired={true}
              placeholder="Chọn kinh nghiệm làm việc"
            />
            <SelectCustom
              name="career"
              control={control}
              options={allConfig?.careerOptions || []}
              title="Nghề nghiệp"
              showRequired={true}
              placeholder="Chọn nghề nghiệp"
            />
            <SelectCustom
              name="city"
              control={control}
              options={allConfig?.cityOptions || []}
              title="Tỉnh/Thành phố"
              showRequired={true}
              placeholder="Chọn tỉnh thành phố"
            />
            <TextInputCustom
              name="salaryMin"
              control={control}
              title="Mức lương mong muốn tối thiểu"
              showRequired={true}
              placeholder="Nhập mức lương mong muốn tối thiểu"
              keyboardType="numeric"
            />
            <TextInputCustom
              name="salaryMax"
              control={control}
              title="Mức lương mong muốn tối đa"
              showRequired={true}
              placeholder="Nhập mức lương mong muốn tối đa"
              keyboardType="numeric"
            />
            <SelectCustom
              name="typeOfWorkplace"
              control={control}
              options={allConfig?.typeOfWorkplaceOptions || []}
              title="Nơi làm việc"
              showRequired={true}
              placeholder="Chọn nơi làm việc"
            />
            <SelectCustom
              name="jobType"
              control={control}
              options={allConfig?.jobTypeOptions || []}
              title="Hình thức làm việc"
              showRequired={true}
              placeholder="Chọn hình thức làm việc"
            />
            <TextAreaCustom
              name="description"
              control={control}
              title="Mục tiêu nghề nghiệp"
              showRequired={true}
              placeholder="Nhập nội dung tại đây"
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
              onPress={handleSubmit(handleAdd)}
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
          <Skeleton rounded="md" height={16} />
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
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12} />
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12} />
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={12} />
          <Skeleton rounded="md" h={6} />
          <Skeleton rounded="md" height={40} />
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

UploadProfileForm.Loading = Loading;

export default UploadProfileForm;
