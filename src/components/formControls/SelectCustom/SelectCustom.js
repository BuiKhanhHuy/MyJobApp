import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  FormControl,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  Text,
  Icon,
} from 'native-base';
import {Dropdown} from 'react-native-element-dropdown';
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
            <Dropdown
              itemTextStyle={{color: '#524B6B', fontSize: 13}}
              selectedTextStyle={{color: '#524B6B', fontSize: 13}}
              fontFamily="DMSans-Regular"
              style={[styles.dropdown]}
              data={options}
              dropdownPosition="auto"
              labelField="name"
              valueField="id"
              value={field.value}
              onChange={item => field.onChange(item.id)}
            />
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 45,
    borderColor: '#AAA6B9',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default SelectCustom;
