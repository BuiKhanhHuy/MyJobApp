import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Box, ScrollView, Skeleton, VStack, View} from 'native-base';

import ButtonCustom from '../../../../components/ButtonCustom';
import UploadCv from '../../../../components/UploadCV';

const EditCvForm = ({handleUpdate}) => {
  const schema = yup.object().shape({
    file: yup
      .mixed()
      .nonNullable('Tập tin là bắt buộc.')
      .test(
        'files empty',
        'Tập tin là bắt buộc.',
        value => !(value === undefined || value === null || value === ''),
      ),
  });

  const {control, handleSubmit} = useForm({
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
          <Skeleton rounded="md" height={16} />
          <Skeleton rounded="md" h={6} />
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

EditCvForm.Loading = Loading;

export default EditCvForm;
