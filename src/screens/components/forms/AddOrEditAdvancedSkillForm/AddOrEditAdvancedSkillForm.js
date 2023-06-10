import React from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Box, ScrollView, Skeleton, VStack, View} from 'native-base';

import TextInputCustom from '../../../../components/TextInputCustom/TextInputCustom';
import RatingCustom from '../../../../components/formControls/RatingCustom/RatingCustom';
import ButtonCustom from '../../../../components/ButtonCustom/ButtonCustom';

const AddOrEditAdvancedSkillForm = ({
  handleAddOrUpdate,
  editData,
  serverErrors = {},
}) => {
  const {allConfig} = useSelector(state => state.config);
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Tên kỹ năng là bắt buộc.')
      .max(200, 'Tên kỹ năng vượt quá độ dài cho phép.'),
    level: yup.number().required('Trình độ là bắt buộc.'),
  });

  const {control, setError, reset, handleSubmit} = useForm({
    defaultValues: {
      language: '',
      level: 3,
    },
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
        <ScrollView showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <VStack space={4}>
            <TextInputCustom
              control={control}
              name="name"
              showRequired={true}
              placeholder="Nhập tên kỹ năng"
              title="Tên kỹ năng"
            />
            <RatingCustom
              name="level"
              control={control}
              title="Trình độ"
              showRequired={true}
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

AddOrEditAdvancedSkillForm.Loading = Loading;

export default AddOrEditAdvancedSkillForm;
