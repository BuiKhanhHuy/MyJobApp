import React from 'react';
import {Text, useTheme, View, VStack} from 'native-base';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';

import ButtonCustom from '../../ButtonCustom';

function ActionSheetConfirm({sheetId, payload}) {
  const {sizes} = useTheme();

  const {
    title = 'Title',
    description = 'description',
    yesText = 'YES',
    noText = 'NO',
  } = payload;

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
      <View paddingTop={6} paddingBottom={10} alignItems="center">
        <Text
          paddingBottom={2}
          fontFamily="dMSansBold"
          lineHeight="xl"
          fontSize="md"
          paddingBot
          color="myJobCustomColors.haitiBluePurple">
          {title}
        </Text>
        <Text
          textAlign="center"
          fontFamily="dMSansRegular"
          lineHeight="xs"
          fontSize="xs"
          color="myJobCustomColors.mulledWine">
          {description}
        </Text>
      </View>
      <View>
        <VStack space={3}>
          <ButtonCustom
            text={yesText}
            textColor="myJobCustomColors.white"
            bgColor="myJobCustomColors.darkIndigo"
            shadow={1}
            onPress={() => {
              SheetManager.hide(sheetId, {
                payload: true,
              });
            }}
          />
          <ButtonCustom
            text={noText}
            textColor="myJobCustomColors.darkIndigo"
            bgColor="myJobCustomColors.moonrakerPurplyBlue"
            shadow={1}
            onPress={() => {
              SheetManager.hide(sheetId, {
                payload: false,
              });
            }}
          />
        </VStack>
      </View>
    </ActionSheet>
  );
}

export default ActionSheetConfirm;
