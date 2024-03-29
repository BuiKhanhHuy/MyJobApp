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
  HStack,
} from 'native-base';
import {Dropdown} from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SelectCustom = ({
  name,
  control,
  options = [],
  title = null,
  showRequired = false,
  placeholder = '',
  showBorder = false,
}) => {
  const searchQuery = (keyword, labelValue) => {
    return labelValue.toLowerCase().includes(keyword.toLowerCase());
  };
  return (
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
            <Dropdown
              mode="modal"
              renderRightIcon={() => (
                <HStack space={1}>
                  {field.value && (
                    <MaterialIcons
                      onPress={() => field.onChange(null)}
                      name="clear"
                      size={17}
                      color={'#524b6b'}
                    />
                  )}

                  <Feather name="chevron-down" size={17} color={'#C4C4C4'} />
                </HStack>
              )}
              containerStyle={{
                height: 600,
              }}
              searchQuery={searchQuery}
              search={true}
              searchPlaceholder="Nhập từ khóa"
              inputSearchStyle={{
                color: '#524B6B',
                fontSize: 13,
                borderRadius: 8,
              }}
              itemTextStyle={{color: '#524B6B', fontSize: 13}}
              selectedTextStyle={{color: '#524B6B', fontSize: 13}}
              fontFamily="DMSans-Regular"
              style={[
                styles.dropdown,
                {
                  borderColor: fieldState.invalid ? '#FF464A' : '#CBC8D4',
                  borderWidth: showBorder || fieldState.invalid ? 1 : 0,
                },
              ]}
              data={options}
              dropdownPosition="auto"
              labelField="name"
              valueField="id"
              value={field.value}
              onChange={item => field.onChange(item.id || null)}
              placeholder={placeholder}
              placeholderStyle={{
                color: '#CBC9D4',
                fontSize: 12,
              }}
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
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default SelectCustom;
