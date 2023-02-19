import React from 'react';
import {Button, Stack, View} from 'native-base';
import {Controller} from 'react-hook-form';

const data = [
  {id: 1, name: 'Apprenticeship'},
  {id: 2, name: 'Part-time'},
  {id: 3, name: 'Full-time'},
  {id: 4, name: 'Contract'},
  {id: 5, name: 'Project-based'},
];

const ButtonSelectCustom = ({control, name}) => {
  const handleSelect = (val, onChange, value) => {
    let newArr = [];
    if (value.includes(val.id)) {
      newArr = value.filter(x => x !== val.id);
    } else {
      newArr = [...value, val.id];
    }
    onChange(newArr);
  };

  return (
    <View>
      <Stack flexWrap="wrap" direction="row">
        <Controller
          control={control}
          name={name}
          defaultValue={[]}
          render={({field: {onChange, value}}) => {
            return data.map(val => (
              <Button
                mr={3}
                mb={3}
                key={val.id}
                onPress={() => handleSelect(val, onChange, value)}
                backgroundColor={
                  value.includes(val.id)
                    ? 'myJobCustomColors.neonCarrot'
                    : 'myJobCustomColors.ghostPurpleBlue'
                }
                _text={{
                  color: value.includes(val.id)
                    ? 'myJobCustomColors.white'
                    : 'myJobCustomColors.mulledWine',
                  fontFamily: 'dMSansRegular',
                  fontSize: 'xs',
                  lineHeight: 'xs',
                }}>
                {val.name}
              </Button>
            ));
          }}
        />
      </Stack>
    </View>
  );
};

export default ButtonSelectCustom;
