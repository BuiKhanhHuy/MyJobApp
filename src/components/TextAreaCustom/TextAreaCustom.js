import React from 'react';
import {
  FormControl,
  TextArea,
  View,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import {Controller} from 'react-hook-form';

const TextAreaCustom = ({
  control,
  name,
  errors,
  rules = {},
  placeholder,
  height = 300,
  label = null,
}) => {
  return (
    <View>
      <FormControl isInvalid={name in errors}>
        {label && (
          <FormControl.Label>
            <Text
              fontFamily="dMSansMedium"
              fontSize="xs"
              color="myJobCustomColors.purpleBlue"
              paddingBottom="0.5">
              {label}
            </Text>
          </FormControl.Label>
        )}
        <Controller
          control={control}
          name={name}
          rules={rules}
          placeholder={placeholder}
          render={({
            field: {onChange, onBlur, value},
            fieldState: {invalid},
          }) => (
            <TextArea
              padding="4"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              isInvalid={invalid}
              h={height}
              w="100%"
              placeholder={placeholder}
              borderRadius="10"
              backgroundColor="myJobCustomColors.white"
              borderWidth={invalid ? '1' : '0'}
              invalidOutlineColor="myJobCustomColors.lightRed"
            />
          )}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errors[name]?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    </View>
  );
};

export default TextAreaCustom;
