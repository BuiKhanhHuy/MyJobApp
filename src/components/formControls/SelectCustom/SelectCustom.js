import React from 'react';
import {Controller} from 'react-hook-form';
import {
  FormControl,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  Text,
  Icon,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SelectCustom = ({
  name,
  control,
  options = [],
  title = null,
  showRequired = false,
  placeholder = '',
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <>
          <FormControl
            isRequired={showRequired}
            isInvalid={fieldState.isInvalid}>
            {title && (
              <FormControl.Label>
                <Text fontFamily="DMSans-Bold" fontSize="12">
                  {title}
                </Text>
              </FormControl.Label>
            )}
            <Select
              minWidth="200"
              borderRadius="10"
              backgroundColor="myJobCustomColors.white"
              accessibilityLabel={placeholder}
              placeholder={placeholder}
              shadow="myJobCustomShadows.0"
              fontFamily="dMSansRegular"
              fontSize="xs"
              lineHeight="xs"
              color="myJobCustomColors.mulledWine"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={3} />,
              }}
              dropdownIcon={
                <Icon
                  as={<MaterialIcons name={'expand-more'} />}
                  size={5}
                  mr={1.5}
                  color="myJobCustomColors.blueGrey"
                />
              }
              dropdownOpenIcon={
                <Icon
                  as={<MaterialIcons name={'expand-less'} />}
                  size={5}
                  mr={1.5}
                  color="myJobCustomColors.blueGrey"
                />
              }>
              {options.map(value => (
                <Select.Item
                  label={value.name}
                  value={value.id}
                  key={value.id}
                />
              ))}
            </Select>
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

export default SelectCustom;
