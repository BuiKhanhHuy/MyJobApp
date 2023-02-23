import React from 'react';
import {Box, Button, Divider, HStack, Icon, Text, View} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const ProfileCard = ({
  titleIcon = 'question',
  title = 'Title',
  isShowDivider = false,
  children,
}) => {
  return (
    <View
      padding={6}
      backgroundColor="myJobCustomColors.white"
      borderRadius="2xl">
      <HStack>
        <View flex={8} justifyContent="center">
          <HStack>
            <Icon
              as={SimpleLineIcons}
              size="lg"
              name={titleIcon}
              color="myJobCustomColors.deepSaffron"
              _light={{
                color: 'myJobCustomColors.deepSaffron',
              }}
            />
            <Box justifyContent="center" paddingLeft={3}>
              <Text
                fontFamily="dMSansBold"
                lineHeight="sm"
                fontSize="sm"
                color="myJobCustomColors.haitiBluePurple">
                {title}
              </Text>
            </Box>
          </HStack>
        </View>
        <View flex={1}>
          <Button
            borderRadius="full"
            backgroundColor="myJobCustomColors.deepSaffron:alpha.20">
            <Icon
              as={Entypo}
              name="plus"
              color="myJobCustomColors.deepSaffron"
              _light={{
                color: 'myJobCustomColors.deepSaffron',
              }}
            />
          </Button>
        </View>
      </HStack>
      {isShowDivider && (
        <Divider
          marginY={4}
          bg="myJobCustomColors.lavenderPinocchioTealishBlue"
        />
      )}
      <View>{children}</View>
    </View>
  );
};

export default ProfileCard;
