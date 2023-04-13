import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Text,
  VStack,
  View,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BoxProfileCard = () => {
  const navigation = useNavigation();

  return (
    <View
      padding={6}
      backgroundColor="myJobCustomColors.white"
      borderRadius="2xl">
      <HStack justifyContent="space-between">
        <Button variant="outline" px="3" py="1.5">
          <Text
            fontFamily="dMSansRegular"
            fontSize="xs"
            lineHeight="sm"
            color="myJobCustomColors.mulledWine">
            <Icon as={FontAwesome} name="star-o" size={4} /> Đặt làm CV chính
          </Text>
        </Button>
        <HStack space={4}>
          <Icon
            size="lg"
            marginRight={1}
            as={AntDesign}
            name="download"
            color="myJobCustomColors.deepSaffron"
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OnlineProfileScreen', {
                headerTitle: 'Hồ sơ Online',
              })
            }>
            <Icon
              size="lg"
              marginRight={1}
              as={AntDesign}
              name="edit"
              color="myJobCustomColors.deepSaffron"
            />
          </TouchableOpacity>
        </HStack>
      </HStack>
      <Divider
        marginY={4}
        bg="myJobCustomColors.lavenderPinocchioTealishBlue"
      />
      <VStack space={2}>
        <HStack space={2}>
          <Box>
            <Avatar
              bg="green.500"
              size="md"
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}>
              AJ
            </Avatar>
          </Box>
          <Box>
            <Text
              fontFamily="dMSansBold"
              color="myJobCustomColors.mulledWine"
              fontSize="md">
              Bùi Khánh Huy
            </Text>
            <Text
              fontSize="sm"
              fontFamily="dMSansBold"
              color="myJobCustomColors.mulledWine">
              Lập trình viên Python
            </Text>
          </Box>
        </HStack>
        <View>
          <VStack space={1}>
            <Text
              fontFamily="dMSansRegular"
              color="myJobCustomColors.mulledWine">
              <Text fontWeight="bold">Kinh nghiệm:</Text> 1 năm kinh nghiệm
            </Text>
            <Text
              fontFamily="dMSansRegular"
              color="myJobCustomColors.mulledWine">
              <Text fontWeight="bold">Cấp bậc:</Text> nhân viên
            </Text>
            <Text
              fontFamily="dMSansRegular"
              color="myJobCustomColors.mulledWine">
              <Text fontWeight="bold">Mức lương mong muốn:</Text> 12tr
            </Text>
          </VStack>
        </View>
      </VStack>
      <Text
        mt={5}
        fontFamily="dMSansRegular"
        fontSize="xs"
        lineHeight="sm"
        color="myJobCustomColors.mulledWine"
        textAlign="right">
        Ngày cập nhật: 27/02/2001
      </Text>
    </View>
  );
};

export default BoxProfileCard;
