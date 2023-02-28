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
  label = 'Email',
  height = 'large',
  leftIconName = null,
  secureTextEntry = false,
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {value, onChange, onBlur},
        fieldState: {error, invalid},
      }) => (
        <Center>
          <FormControl isInvalid={invalid}>
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
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={{height: height === 'large' ? 50 : 40}}
              borderWidth={invalid ? '1' : '0'}
              borderRadius="10"
              isInvalid={invalid}
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
              {error && error.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </Center>
      )}
    />
  );
};

export default TextInputCustom;
