import React from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Box, HStack, ScrollView, VStack, View} from 'native-base';

import SelectCustom from '../../../../components/formControls/SelectCustom';
import ButtonCustom from '../../../../components/ButtonCustom';

const SearchJobPostAroundForm = ({handleFilter, handleResetFilter}) => {
  const {allConfig} = useSelector(state => state.config);
  const {jobPostAroundFilter} = useSelector(state => state.filter);

  const {control, handleSubmit, reset} = useForm();

  React.useEffect(() => {
    reset(formValues => ({
      ...formValues,
      ...jobPostAroundFilter,
    }));
  }, [jobPostAroundFilter, reset]);

  return (
    <>
      <View flex={10}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <VStack space={4}>
            <SelectCustom
              name="careerId"
              control={control}
              options={allConfig?.careerOptions || []}
              title="Ngành nghề"
              placeholder="Chọn ngành nghề"
            />
            <SelectCustom
              name="cityId"
              control={control}
              options={allConfig?.cityOptions || []}
              title="Tỉnh thành"
              placeholder="Chọn tỉnh thành"
            />
            <SelectCustom
              name="positionId"
              control={control}
              options={allConfig?.positionOptions || []}
              title="Vị trí làm việc"
              placeholder="Chọn vị trí làm việc"
            />
            <SelectCustom
              name="experienceId"
              control={control}
              options={allConfig?.experienceOptions || []}
              title="Kinh nghiệm"
              placeholder="Chọn kinh nghiệm"
            />
            <SelectCustom
              name="jobTypeId"
              control={control}
              options={allConfig?.jobTypeOptions || []}
              title="Hình thức làm việc"
              placeholder="Chọn hình thức làm việc"
            />
            <SelectCustom
              name="typeOfWorkplaceId"
              control={control}
              options={allConfig?.typeOfWorkplaceOptions || []}
              title="Nơi làm việc"
              placeholder="Chọn nơi làm việc"
            />
            <SelectCustom
              name="genderId"
              control={control}
              options={allConfig?.genderOptions || []}
              title="Giới tính"
              placeholder="Chọn giới tính"
            />
          </VStack>
        </ScrollView>
      </View>
      <View justifyContent="center">
        <Box px={6} pt={4}>
          <HStack space={4}>
            <View flex={1}>
              <ButtonCustom
                text="HỦY BỘ LỌC"
                textColor="myJobCustomColors.darkIndigo"
                bgColor="myJobCustomColors.moonrakerPurplyBlue"
                onPress={handleSubmit(handleResetFilter)}
                shadow={8}
              />
            </View>
            <View flex={1}>
              <ButtonCustom
                text="TÌM KIẾM"
                textColor="myJobCustomColors.white"
                bgColor="myJobCustomColors.darkIndigo"
                onPress={handleSubmit(handleFilter)}
                shadow={8}
              />
            </View>
          </HStack>
        </Box>
      </View>
    </>
  );
};

export default SearchJobPostAroundForm;
