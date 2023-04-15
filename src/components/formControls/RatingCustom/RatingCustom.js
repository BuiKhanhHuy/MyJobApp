import React from 'react';
import {Center, FormControl, Text, WarningOutlineIcon} from 'native-base';
import {Controller} from 'react-hook-form';
import {AirbnbRating} from 'react-native-ratings';

const RatingCustom = ({name, control, title = null, showRequired = false}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field, fieldState}) => (
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
            <AirbnbRating
              defaultRating={field.value}
              jumpValue={1}
              count={5}
              onFinishRating={field.onChange}
              size={28}
              showRating={false}
              ratingContainerStyle={{marginRight: 'auto'}}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {fieldState.error && fieldState?.error?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </Center>
      )}
    />
  );
};

export default RatingCustom;
