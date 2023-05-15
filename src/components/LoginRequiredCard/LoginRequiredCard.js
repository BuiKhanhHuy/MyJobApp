import React from 'react';
import {Button, Center, Text, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const LoginRequiredCard = () => {
  const navigation = useNavigation();

  return (
    <VStack alignItems="center" justifyContent="center" height={'100%'}>
      <Text
        marginBottom={3}
        fontFamily="DMSans-Regular"
        color="myJobCustomColors.purplishGrey">
        Vui lòng đăng nhập để sử dụng tính năng này
      </Text>
      <Button
        onPress={() => navigation.navigate('Login')}
        size="md"
        rounded="lg"
        bgColor="myJobCustomColors.darkIndigo"
        fontFamily="DMSansBold"
        fontSize={16}
        width={'90%'}
        padding={3}
        lineHeight={18}>
        Đăng nhập
      </Button>
    </VStack>
  );
};

export default LoginRequiredCard;
