import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  FormControl,
  WarningOutlineIcon,
  Text,
  Icon,
  Radio,
  Stack,
} from 'native-base';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RadioCustom = ({
  name,
  control,
  options = [],
  title = null,
  showRequired = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <>
          <FormControl isInvalid={fieldState.isInvalid}>
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
            <Radio.Group
              value={field.value}
              onChange={value => field.onChange(value)}
              accessibilityLabel="radio">
              <Stack direction="row" space={4}>
                {options.map(option => (
                  <Radio
                    key={option.id}
                    value={option.id}
                    colorScheme="warning"
                    size="md"
                    my={1}>
                    {option.name}
                  </Radio>
                ))}
              </Stack>
            </Radio.Group>
            {fieldState.invalid && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                {fieldState.error?.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        </>
      )}
    />
  );
};

export default RadioCustom;
