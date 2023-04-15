import React from 'react';
import {useSelector} from 'react-redux';
import {useForm, useWatch} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Box, ScrollView, Skeleton, VStack, View} from 'native-base';

import {DATE_OPTIONS, REGEX_VATIDATE} from '../../../../configs/constants';
import TextInputCustom from '../../../../components/TextInputCustom/TextInputCustom';
import SelectCustom from '../../../../components/formControls/SelectCustom';
import DateTimePickerCustom from '../../../../components/formControls/DateTimePickerCustom';
import ButtonCustom from '../../../../components/ButtonCustom/ButtonCustom';
import commonService from '../../../../services/commonService';

const EditPersonalProfileForm = ({handleUpdate, editData}) => {
  const {allConfig} = useSelector(state => state.config);
  const schema = yup.object().shape({
    user: yup.object().shape({
      fullName: yup
        .string()
        .required('Họ và tên là bắt buộc.')
        .max(100, 'Họ và tên vượt quá độ dài cho phép.'),
    }),
    phone: yup
      .string()
      .required('Số điện thoại là bắt buộc.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Số điện thoại không hợp lệ.')
      .max(15, 'Số điện thoại vượt quá độ dài cho phép.'),
    birthday: yup
      .date()
      .required('Ngày sinh là bắt buộc.')
      .typeError('Ngày sinh không hợp lệ.')
      .max(DATE_OPTIONS.yesterday, 'Ngày sinh không hợp lệ.'),
    gender: yup
      .string()
      .required('Giới tính là bắt buộc.')
      .max(1, 'Giới tính vượt quá độ dài cho phép.'),
    maritalStatus: yup
      .string()
      .required('Tình trạng hôn nhân là bắt buộc.')
      .max(1, 'Tình trạng hôn nhân vượt quá độ dài cho phép.'),
    location: yup.object().shape({
      city: yup
        .number()
        .required('Tỉnh/Thành phố là bắt buộc.')
        .typeError('Tỉnh/Thành phố là bắt buộc.'),
      district: yup
        .number()
        .required('Quận/Huyện là bắt buộc.')
        .typeError('Quận/Huyện là bắt buộc.'),
      address: yup
        .string()
        .required('Địa chỉ là bắt buộc.')
        .max(255, 'Địa chỉ vượt quá độ dài cho phép.'),
    }),
  });

  const [districtOptions, setDistrictOptions] = React.useState([]);

  const {control, setValue, reset, handleSubmit} = useForm({
    resolver: yupResolver(schema),
  });

  const cityId = useWatch({
    control,
    name: 'location.city',
  });

  React.useEffect(() => {
    reset(formValues => ({
      ...formValues,
      phone: editData?.phone || '',
      birthday: editData?.birthday,
      gender: editData?.gender || '',
      maritalStatus: editData?.maritalStatus || '',
      user: {
        fullName: editData.user?.fullName || '',
      },
      location: {
        city: editData?.location?.city || '',
        district: editData?.location?.district || '',
        address: editData?.location?.address || '',
      },
    }));
  }, [editData, reset]);

  React.useEffect(() => {
    const loadDistricts = async cityId => {
      try {
        const resData = await commonService.getDistrictsByCityId(cityId);

        if (districtOptions.length > 0) setValue('location.district', '');
        setDistrictOptions(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
      }
    };

    if (cityId) {
      loadDistricts(cityId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId, setValue]);

  return (
    <>
      <View flex={10}>
        <ScrollView>
          <VStack space={4}>
            <TextInputCustom
              name="user.fullName"
              title="Họ và tên"
              showRequired={true}
              placeholder="Nhập họ và tên"
              control={control}
            />
            <TextInputCustom
              name="phone"
              title="Số điện thoại"
              showRequired={true}
              placeholder="Nhập số điện thoại"
              control={control}
              keyboardType="numeric"
            />
            <DateTimePickerCustom
              name="birthday"
              control={control}
              title="Ngày sinh"
              showRequired={true}
            />
            <SelectCustom
              name="gender"
              control={control}
              options={allConfig?.genderOptions || []}
              title="Giới tính"
              showRequired={true}
              placeholder="Chọn giới tính"
            />
            <SelectCustom
              name="maritalStatus"
              control={control}
              options={allConfig?.maritalStatusOptions || []}
              title="Tình trạng hôn nhân"
              showRequired={true}
              placeholder="Chọn tình trạng hôn nhân"
            />
            <SelectCustom
              name="location.city"
              control={control}
              options={allConfig?.cityOptions || []}
              title="Tỉnh/Thành phố"
              showRequired={true}
              placeholder="Chọn tỉnh thành phố"
            />
            <SelectCustom
              options={districtOptions || []}
              name="location.district"
              control={control}
              title="Quận/Huyện"
              showRequired={true}
              placeholder="Chọn Quận/Huyện"
            />
            <TextInputCustom
              name="location.address"
              title="Địa chỉ"
              showRequired={true}
              placeholder="Nhập địa chỉ"
              control={control}
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
              onPress={handleSubmit(handleUpdate)}
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

EditPersonalProfileForm.Loading = Loading;

export default EditPersonalProfileForm;
