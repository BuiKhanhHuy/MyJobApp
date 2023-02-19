import React from 'react';
import {FormControl, Radio, View, WarningOutlineIcon, Text} from 'native-base';
import {Controller} from 'react-hook-form';

const data = [
  {id: 1, value: 'IT Phần cứng'},
  {id: 2, value: 'IT Phần mềm'},
  {id: 3, value: 'UX/UI Designer'},
];

const RadioCustom = ({
  control,
  errors,
  name,
  rules = {},
  label = null,
  flexDirection = 'row',
}) => {
  const getOptionList = data => {
    return data.map(d => {
      return (
        <Radio value={d.id} colorScheme="warning" key={d.id}>
          <Text fontFamily="dMSansRegular" fontSize="xs" lineHeight="xs">
            {d.value}
          </Text>
        </Radio>
      );
    });
  };

  const optionList = React.useMemo(() => getOptionList(data), [data]);

  return (
    <View>
      <FormControl isRequired isInvalid={name in errors}>
        {label && <FormControl.Label>{label}</FormControl.Label>}
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({field: {onChange}, fieldState: {invalid}}) => (
            <Radio.Group
              name={name}
              isInvalid={invalid}
              flexDirection={flexDirection}
              space={4}
              onChange={val => onChange(val)}>
              {optionList}
            </Radio.Group>
          )}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errors[name]?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    </View>
  );
};

export default React.memo(RadioCustom);
