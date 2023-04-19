import React from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Box, ScrollView, Skeleton, VStack, View} from 'native-base';

import SelectCustom from '../../../../components/formControls/SelectCustom/SelectCustom';
import RatingCustom from '../../../../components/formControls/RatingCustom/RatingCustom';
import ButtonCustom from '../../../../components/ButtonCustom/ButtonCustom';

const AddOrEditLanguageSkillForm = ({
  handleAddOrUpdate,
  editData,
  serverErrors = {},
}) => {
  const {allConfig} = useSelector(state => state.config);
  const schema = yup.object().shape({
    language: yup
      .number()
      .required('Ngôn ngữ là bắt buộc.')
      .typeError('Ngôn ngữ là bắt buộc.'),
    level: yup.number().required('Trình độ là bắt buộc.'),
  });

  const {control,setError, reset, handleSubmit} = useForm({
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
        <ScrollView>
          <VStack space={4}>
            <SelectCustom
              name="language"
              control={control}
              options={allConfig?.languageOptions || []}
              title="Ngôn ngữ"
              showRequired={true}
              placeholder="Chọn ngôn ngữ"
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
      <ScrollView>
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

AddOrEditLanguageSkillForm.Loading = Loading;

export default AddOrEditLanguageSkillForm;
