import {Button, Icon, Text} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ButtonCustom = ({text, textColor, bgColor, onPress, leftIcon = null}) => {
  return (
    <Button
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
      padding={leftIcon ? '3' : '4'}
      backgroundColor={bgColor}
      onPress={onPress}>
      <Text
        fontFamily="dMSansBold"
        fontSize="md"
        lineHeight="sm"
        color={textColor}>
        {text}
      </Text>
    </Button>
  );
};

export default ButtonCustom;
