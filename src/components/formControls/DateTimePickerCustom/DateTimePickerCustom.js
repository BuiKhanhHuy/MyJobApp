import React from 'react';
import {TouchableNativeFeedback} from 'react-native';
import {Controller} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Box,
  Center,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import dayjs from 'dayjs';
import moment from 'moment-timezone';
import 'moment/locale/vi';
import {current} from '@reduxjs/toolkit';

const DateTimePickerCustom = ({
  control,
  name,
  title = null,
  showRequired = false,
}) => {
  const [show, setShow] = React.useState(false);

  const showMode = () => {
    setShow(true);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({field, fieldState}) => (
        <>
          <Center>
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
              <TouchableNativeFeedback onPress={showMode}>
                <HStack
                  justifyContent="space-between"
                  style={{height: 50, padding: 12, paddingTop: 20}}
                  borderWidth={fieldState.invalid ? 1 : 0}
                  borderColor="myJobCustomColors.lavaRed"
                  borderRadius="10"
                  invalidOutlineColor="myJobCustomColors.lightRed"
                  backgroundColor="myJobCustomColors.white"
                  shadow="myJobCustomShadows.0"
                  color="myJobCustomColors.mulledWine">
                  <Text
                    color="myJobCustomColors.mulledWine"
                    fontFamily="dMSansRegular"
                    fontSize="xs"
                    lineHeight="xs">
                    {field.value ? (
                      moment(field.value).format('DD/MM/YYYY')
                    ) : (
                      <Text color="myJobCustomColors.bobel">DD/MM/YYYY</Text>
                    )}
                  </Text>
                  {field?.value && (
                    <Icon
                      onPress={() => field.onChange(null)}
                      as={<Fontisto name={'close-a'} />}
                      size={3}
                      color="myJobCustomColors.black"
                      mb={3}
                    />
                  )}
                </HStack>
              </TouchableNativeFeedback>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {fieldState.error && fieldState?.error?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </Center>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={
                field.value ? new Date(field.value) : new Date('1000-01-01')
              }
              mode={'date'}
              is24Hour={true}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate;
                setShow(false);
                if (
                  currentDate.getTime() === new Date('1000-01-01').getTime()
                ) {
                  field.onChange(null);
                } else {
                  field.onChange(dayjs(currentDate).format('YYYY-MM-DD'));
                }
              }}
              display="spinner"
            />
          )}
        </>
      )}
    />
  );
};

export default DateTimePickerCustom;
