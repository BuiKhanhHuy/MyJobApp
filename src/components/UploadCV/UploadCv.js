import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Controller} from 'react-hook-form';
import dayjs from 'dayjs';
import {
  Box,
  Center,
  FormControl,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  View,
  WarningOutlineIcon,
} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import toastMessages from '../../utils/toastMessages';
import {ICONS} from '../../configs/globalStyles';

const UploadCv = ({title = null, showRequired=false, name, control}) => {
  const [fileSelected, setFileSelected] = React.useState(null);

  const selectDoc = async onChange => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });

      setFileSelected({...doc, timeUpload: new Date()});
      onChange(doc);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User cancel: ', error);
      } else {
        toastMessages.error();
      }
    }
  };

  const removeFile = onChange => {
    setFileSelected(null);
    onChange(null);
  };

  return (
    <VStack space={3}>
      <Controller
        name={name}
        control={control}
        render={({field, fieldState}) => (
          <>
            <FormControl isInvalid={fieldState.invalid}>
              {title && (
                <FormControl.Label>
                  <Text
                    fontFamily="dMSansMedium"
                    fontSize="xs"
                    color="myJobCustomColors.purpleBlue"
                    paddingBottom="1">
                    {title}{' '}
                    {showRequired && (
                      <Text color="myJobCustomColors.lavaRed">*</Text>
                    )}
                  </Text>
                </FormControl.Label>
              )}
              <>
                {fileSelected ? (
                  <Box
                    padding={5}
                    borderStyle="dashed"
                    borderWidth="1"
                    borderColor="myJobCustomColors.amethystSmoke"
                    backgroundColor="myJobCustomColors.artyClickUltramarine:0.05"
                    rounded="xl">
                    <VStack space={4}>
                      <HStack space={3} alignItems="center">
                        <View>
                          <Image
                            alt="icon"
                            source={ICONS.PDF_ICON}
                            width="45"
                            height="50"
                          />
                        </View>
                        <VStack>
                          <View>
                            <Text
                              color="myJobCustomColors.darkIndigo"
                              fontFamily="dMSansRegular">
                              {fileSelected?.name}
                            </Text>
                          </View>
                          <View>
                            <Text
                              color="myJobCustomColors.greyCloud"
                              fontFamily="dMSansRegular">
                              {(fileSelected?.size || 0) * 0.001} Kb{' '}
                              {dayjs(fileSelected?.timeUpload).format(
                                'DD/MM/YYYY HH:mm:ss a',
                              )}
                            </Text>
                          </View>
                        </VStack>
                      </HStack>
                      <View>
                        <HStack alignItems="center" space={1}>
                          <TouchableOpacity
                            onPress={() => removeFile(field.onChange)}>
                            <Text color="#FC4646" fontFamily="dMSansRegular">
                              <MaterialCommunityIcons
                                name="delete-outline"
                                color="#FC4646"
                                size={24}
                              />{' '}
                              <Text> Xóa tệp</Text>
                            </Text>
                          </TouchableOpacity>
                        </HStack>
                      </View>
                    </VStack>
                  </Box>
                ) : (
                  <TouchableOpacity onPress={() => selectDoc(field.onChange)}>
                    <Center
                      padding={5}
                      borderStyle="dashed"
                      borderWidth="1"
                      borderColor={
                        fieldState.invalid
                          ? 'myJobCustomColors.lavaRed'
                          : 'myJobCustomColors.amethystSmoke'
                      }
                      rounded="xl">
                      <HStack space={4}>
                        <Center>
                          <Icon
                            as={MaterialCommunityIcons}
                            name="folder-upload-outline"
                            size="2xl"
                            color="myJobCustomColors.limedSpruce"
                          />
                        </Center>
                        <Center>
                          <Text
                            color="myJobCustomColors.limedSpruce"
                            fontFamily="dMSansBold">
                            Chọn CV của bạn
                          </Text>
                        </Center>
                      </HStack>
                    </Center>
                  </TouchableOpacity>
                )}
              </>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {fieldState.error && fieldState?.error?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </>
        )}
      />
      <Text color="#AAA6B9" fontFamily="dMSansRegular" fontSize="xs">
        Tải lên tệp ở định dạng PDF. Tối đa 1 tệp.
      </Text>
    </VStack>
  );
};

export default UploadCv;
