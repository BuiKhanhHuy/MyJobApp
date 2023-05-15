import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Text, useTheme, View, VStack} from 'native-base';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';

import ButtonCustom from '../../ButtonCustom';
import SelectCustom from '../../formControls/SelectCustom/SelectCustom';
import {resetSearchCompany, searchCompany} from '../../../redux/filterSlice';

function ActionSheetFilterCompany({sheetId}) {
  const {sizes} = useTheme();
  const dispatch = useDispatch();
  const {allConfig} = useSelector(state => state.config);
  const {companyFilter} = useSelector(state => state.filter);

  const {control, handleSubmit, reset} = useForm();

  React.useEffect(() => {
    reset(formValues => ({
      ...formValues,
      ...companyFilter,
    }));
  }, [companyFilter, reset]);

  const handleFilter = data => {
    dispatch(searchCompany(data));
    SheetManager.hide(sheetId);
  };

  const handleResetFilter = () => {
    dispatch(resetSearchCompany());
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
        <SelectCustom
          name="cityId"
          control={control}
          options={allConfig?.cityOptions || []}
          title="Tỉnh thành"
          placeholder="Chọn tỉnh thành"
          showBorder={true}
        />
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
            onPress={handleResetFilter}
          />
        </VStack>
      </View>
    </ActionSheet>
  );
}

export default ActionSheetFilterCompany;
