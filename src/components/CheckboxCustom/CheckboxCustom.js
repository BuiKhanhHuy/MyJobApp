import React from 'react';
import {FormControl, Text, View, Checkbox} from 'native-base';
import {Controller} from 'react-hook-form';

const data = [
  {id: 1, name: 'TP. HCM'},
  {id: 2, name: 'Hà Nội'},
  {id: 3, name: 'Bến Tre'},
];

const CheckboxCustom = ({
  control,
  errors,
  name,
  rules = {},
  label = null,
  flexDirection = 'column',
}) => {
  return (
    <View>
      <FormControl isInvalid={name in errors}>
        {label && <FormControl.Label>{label}</FormControl.Label>}
        <Controller
          control={control}
          name={name}
          rules={rules}
          defaultValue={[]}
          render={({field: {onChange}}) => (
            <Checkbox.Group onChange={onChange} flexDirection={flexDirection}>
              {data.map(val => (
                <Checkbox key={val.id} value={val.id} colorScheme="orange">
                  <Text
                    fontFamily="dMSansRegular"
                    fontSize="xs"
                    lineHeight="xs"
                    my={2}>
                    {val.name}
                  </Text>
                </Checkbox>
              ))}
            </Checkbox.Group>
          )}
        />
        <FormControl.ErrorMessage>
          {errors[name]?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    </View>
  );
};

export default CheckboxCustom;
