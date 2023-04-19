import React from 'react';
import {
  Center,
  FormControl,
  Icon,
  Input,
  Pressable,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import {Controller} from 'react-hook-form';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TextInputCustom = ({
  control,
  name,
  placeholder,
  title = '',
  height = 'large',
  showRequired = false,
  leftIconName = null,
  secureTextEntry = false,
  keyboardType = 'default',
  disabled = false,
}) => {
  const [show, setShow] = React.useState(false);

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
            <Input
              isReadOnly={disabled}
              isDisabled={disabled}
              keyboardType={keyboardType}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder={placeholder}
              style={{height: height === 'large' ? 50 : 40}}
              borderWidth={fieldState.invalid ? '1' : '0'}
              borderRadius="10"
              isInvalid={fieldState.invalid}
              invalidOutlineColor="myJobCustomColors.lightRed"
              backgroundColor="myJobCustomColors.white"
              shadow="myJobCustomShadows.0"
              fontFamily="dMSansRegular"
              fontSize="xs"
              lineHeight="xs"
              color="myJobCustomColors.mulledWine"
              InputLeftElement={
                leftIconName ? (
                  <Icon
                    as={<Fontisto name={leftIconName} />}
                    size={5}
                    ml="3"
                    color="myJobCustomColors.blueGrey"
                  />
                ) : (
                  leftIconName
                )
              }
              type={secureTextEntry ? (show ? 'text' : 'password') : 'text'}
              InputRightElement={
                secureTextEntry ? (
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={<Ionicons name={show ? 'eye' : 'eye-off'} />}
                      size={6}
                      mr="2"
                      color="myJobCustomColors.blueGrey"
                    />
                  </Pressable>
                ) : null
              }
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

export default TextInputCustom;
