import React from 'react';
import {
  FormControl,
  TextArea,
  View,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import {Controller} from 'react-hook-form';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TextAreaCustom = ({
  control,
  name,
  placeholder,
  showRequired = false,
  height = 300,
  label = null,
}) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        placeholder={placeholder}
        render={({field: {onChange, onBlur, value}, fieldState}) => (
          <FormControl isInvalid={fieldState.invalid}>
            {label && (
              <FormControl.Label>
                <Text
                  fontFamily="dMSansMedium"
                  fontSize="xs"
                  color="myJobCustomColors.purpleBlue"
                  paddingBottom="1">
                  {label}{' '}
                  {showRequired && (
                    <Text color="myJobCustomColors.lavaRed">*</Text>
                  )}
                </Text>
              </FormControl.Label>
            )}
            <TextArea
              padding="4"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isInvalid={fieldState.invalid}
              h={height}
              w="100%"
              placeholder={placeholder}
              borderRadius="10"
              backgroundColor="myJobCustomColors.white"
              borderWidth={fieldState.invalid ? '1' : '0'}
              invalidOutlineColor="myJobCustomColors.lightRed"
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {fieldState.error && fieldState?.error?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
      />
    </View>
  );
};

export default TextAreaCustom;
