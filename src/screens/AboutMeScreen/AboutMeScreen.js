import React from 'react';
import {Alert} from 'react-native';
import {ScrollView, View, Text, Box, VStack} from 'native-base';
import {useForm} from 'react-hook-form';

import {SheetManager} from 'react-native-actions-sheet';

import TextAreaCustom from '../../components/TextAreaCustom';
import ButtonCustom from '../../components/ButtonCustom';

const AboutMeScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleHandleSaveInfo = data => {
    console.log('>>> About me: ', data);
  };

  const handleUndo = async (title, description, yesText, noText) => {
    const isOk = await SheetManager.show('confirm-sheet', {
      payload: {
        title: title,
        description: description,
        yesText: yesText,
        noText: noText,
      },
    });

    if (isOk) {
      console.log('>>> OK');
    } else {
      console.log('>>> NOT OK');
    }
  };

  return (
    <View flex={1} padding={6}>
      <View flex={1}>
        <Text
          fontFamily="dMSansBold"
          lineHeight="xl"
          fontSize="md"
          color="myJobCustomColors.haitiBluePurple">
          About me
        </Text>
      </View>
      <View flex={10}>
        <ScrollView>
          <View>
            <TextAreaCustom
              control={control}
              name="info"
              errors={errors}
              rules={{
                required: {value: true, message: 'Thông tin là bắt buộc'},
              }}
              placeholder="Tell me about you"
            />
          </View>
        </ScrollView>
      </View>
      <View flex={3} justifyContent="center">
        <Box paddingX={10}>
          <VStack space={4}>
            <ButtonCustom
              text="SAVE"
              textColor="myJobCustomColors.white"
              bgColor="myJobCustomColors.darkIndigo"
              onPress={handleSubmit(handleHandleSaveInfo)}
              shadow={8}
            />
            <ButtonCustom
              text="DEMO SHOW ACTION"
              textColor="myJobCustomColors.darkIndigo"
              bgColor="myJobCustomColors.moonrakerPurplyBlue"
              onPress={() =>
                handleUndo(
                  'Hoàn tác thay đổi?',
                  'Bạn có chắc chắn muốn thay đổi những gì bạn đã nhập?',
                  'Tiếp tục chỉnh sửa',
                  'Hoàn tác thay đổi',
                )
              }
              shadow={8}
            />
          </VStack>
        </Box>
      </View>
    </View>
  );
};

export default AboutMeScreen;
