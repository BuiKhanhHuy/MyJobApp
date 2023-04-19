import React from 'react';
import {TouchableNativeFeedback} from 'react-native';
import {Box, HStack, Text, View} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingOptionCard = ({leftIconName, rightIconName, title, onPress}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <Box
        shadow={'myJobCustomShadows.0'}
        paddingX={6}
        paddingY={4}
        backgroundColor="myJobCustomColors.white"
        rounded="lg">
        <HStack alignItems="center" space={3}>
          <View>
            <Ionicons name={leftIconName} size={25} color="#3D4859" />
          </View>
          <View flex={1}>
            <Text
              fontFamily="DMSansRegular" 
              color="myJobCustomColors.haitiBluePurple">
              {title}
            </Text>
          </View>
          <View>
            <Ionicons name={rightIconName} size={18} color="#3D4859" />
          </View>
        </HStack>
      </Box>
    </TouchableNativeFeedback>
  );
};

export default SettingOptionCard;
