import React from 'react';
import {Text, useTheme, View, VStack} from 'native-base';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';

import ButtonCustom from '../../ButtonCustom';

function ActionSheetEditAvatar({sheetId, payload}) {
  const {sizes} = useTheme();

  return (
    <ActionSheet
      id={sheetId}
      statusBarTranslucent={false}
      drawUnderStatusBar={false}
      gestureEnabled={true}
      containerStyle={{
        paddingHorizontal: sizes[8],
        paddingTop: sizes[6],
        paddingBottom: sizes[6],
        borderTopLeftRadius: sizes[8],
        borderTopRightRadius: sizes[8],
      }}
      springOffset={50}
      defaultOverlayOpacity={0.5}>
      <View paddingTop={6} paddingBottom={6} alignItems="center">
        <Text
          paddingBottom={2}
          fontFamily="dMSansBold"
          lineHeight="xl"
          fontSize="md"
          paddingBot
          color="myJobCustomColors.haitiBluePurple">
          Cập nhật ảnh đại diện
        </Text>
      </View>
      <View>
        <VStack space={3}>
          <ButtonCustom
            text="Chụp ảnh"
            textColor="myJobCustomColors.white"
            bgColor="myJobCustomColors.darkIndigo"
            shadow={1}
            onPress={() => {
              SheetManager.hide(sheetId, {
                payload: 'CAMERA',
              });
            }}
          />
          <ButtonCustom
            text="Chọn ảnh từ thư viện"
            textColor="myJobCustomColors.white"
            bgColor="myJobCustomColors.darkIndigo"
            shadow={1}
            onPress={() => {
              SheetManager.hide(sheetId, {
                payload: 'IMAGE_GALLERY',
              });
            }}
          />
          <ButtonCustom
            text="Xóa ảnh đại diện"
            textColor="myJobCustomColors.lightRed"
            bgColor="myJobCustomColors.sundownRed"
            shadow={1}
            onPress={() => {
                SheetManager.hide(sheetId, {
                  payload: 'DELETE',
                });
              }}
          />
        </VStack>
      </View>
    </ActionSheet>
  );
}

export default ActionSheetEditAvatar;
