import React from 'react';
import {TouchableNativeFeedback} from 'react-native';
import {View, Text, HStack, Icon, Center, useTheme} from 'native-base';
import Collapsible from 'react-native-collapsible';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CollapsibleCustom = ({
  title = 'Title',
  iconComponent = null,
  children,
}) => {
  const {colors} = useTheme();
  const [isCollapse, setIsCollapse] = React.useState(false);

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  return (
    <View>
      <View>
        <TouchableNativeFeedback onPress={handleCollapse}>
          <HStack justifyContent="space-between" alignItems="center">
            <Center>
              <Text
                fontFamily="dMSansBold"
                fontSize="sm"
                lineHeight="sm"
                color="myJobCustomColors.haitiBluePurple">
                {title}
              </Text>
            </Center>
            <Center>
              <MaterialIcons
                name={isCollapse ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                size={25}
                color={colors.myJobCustomColors.haitiBluePurple}
              />
            </Center>
          </HStack>
        </TouchableNativeFeedback>
      </View>
      <View>
        <Collapsible collapsed={isCollapse} duration={100}>
          <View>{children}</View>
        </Collapsible>
      </View>
    </View>
  );
};

export default CollapsibleCustom;
