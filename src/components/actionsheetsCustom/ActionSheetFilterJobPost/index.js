import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Text, useTheme, View, VStack} from 'native-base';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';

import ButtonCustom from '../../ButtonCustom';
import SelectCustom from '../../formControls/SelectCustom/SelectCustom';
import { searchJobPost } from '../../../redux/filterSlice';

function ActionSheetFilterJobPost({sheetId}) {
  const {sizes} = useTheme();
  const dispatch = useDispatch()
  const {allConfig} = useSelector(state => state.config);
  const {jobPostFilter} = useSelector(state => state.filter);

  const {control, handleSubmit, reset} = useForm();

  React.useEffect(() => {
    reset(formValues => ({
      ...formValues,
      ...jobPostFilter,
    }));
  }, [jobPostFilter, reset]);

  const handleFilter = data => {
    dispatch(searchJobPost(data))
    SheetManager.hide(sheetId);
  };

  return (
    <ActionSheet
      id={sheetId}
      statusBarTranslucent={false}
      drawUnderStatusBar={false}
      gestureEnabled={true}
      containerStyle={{
        paddingHorizontal: sizes[5],
        paddingTop: sizes[4],
        paddingBottom: sizes[4],
        borderTopLeftRadius: sizes[8],
        borderTopRightRadius: sizes[8],
      }}
      springOffset={50}
      defaultOverlayOpacity={0.5}>
      <View alignItems="flex-start">
        <Text
          fontFamily="dMSansBold"
          lineHeight="xl"
          fontSize="md"
          paddingBot
          color="myJobCustomColors.haitiBluePurple">
          Nâng cao
        </Text>
      </View>
      <View py="6">
        <VStack space={2}>
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
      </View>
      <View>
        <VStack space={3}>
          <ButtonCustom
            text="Lưu thay đổi"
            textColor="myJobCustomColors.white"
            bgColor="myJobCustomColors.darkIndigo"
            shadow={1}
            onPress={handleSubmit(handleFilter)}
          />
          <ButtonCustom
            text="Lọc lại"
            textColor="myJobCustomColors.darkIndigo"
            bgColor="myJobCustomColors.moonrakerPurplyBlue"
            shadow={1}
            onPress={() => {
              SheetManager.hide(sheetId);
            }}
          />
        </VStack>
      </View>
    </ActionSheet>
  );
}

export default ActionSheetFilterJobPost;
