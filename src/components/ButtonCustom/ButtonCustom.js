import {Button, Icon, Text} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ButtonCustom = ({
  text,
  textColor,
  bgColor,
  onPress,
  leftIcon = null,
  shadow = 'none',
  size = 'large',
}) => {
  return (
    <Button
      shadow={shadow}
      leftIcon={
        leftIcon ? (
          <Icon
            as={FontAwesome}
            name={leftIcon.iconName}
            size="lg"
            color={leftIcon.iconColor}
          />
        ) : (
          leftIcon
        )
      }
      padding={size === 'large' ? (leftIcon ? '3' : '4') : null}
      borderRadius="sm"
      backgroundColor={bgColor}
      onPress={onPress}>
      <Text
        textTransform="uppercase"
        fontFamily="dMSansBold"
        fontSize="sm"
        lineHeight="sm"
        color={textColor}>
        {text}
      </Text>
    </Button>
  );
};

export default ButtonCustom;
