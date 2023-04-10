import React from 'react';
import {
  Toast,
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
  Alert,
} from 'native-base';

const ToastAlert = ({id, message, status = 'success'}) => (
  <Alert
    maxWidth="95%"
    alignSelf="center"
    flexDirection="row"
    status={status}
    variant="left-accent">
    <VStack space={1} flexShrink={1} w="100%">
      <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
        <HStack space={2} flexShrink={1} alignItems="center">
          <Alert.Icon />
          <Text px="1" color={'darkText'}>
            {message}
          </Text>
        </HStack>
        <IconButton
          variant="unstyled"
          icon={<CloseIcon size="3" />}
          _icon={{
            color: 'darkText',
          }}
          onPress={() => Toast.close(id)}
        />
      </HStack>
    </VStack>
  </Alert>
);

const toastMessages = {
  success: message =>
    Toast.show({
      render: ({id}) => {
        return <ToastAlert id={id} message={message} status="success" />;
      },
      placement: 'top',
      duration: 2000,
    }),
  error: (message = 'Có lỗi xảy ra! Thử lại') =>
    Toast.show({
      render: ({id}) => {
        return <ToastAlert id={id} message={message} status="error" />;
      },
      placement: 'top',
      duration: 2000,
    }),
  warn: message =>
    Toast.show({
      render: ({id}) => {
        return <ToastAlert id={id} message={message} status="warning" />;
      },
      placement: 'top',
      duration: 2000,
    }),
  info: message =>
    Toast.show({
      render: ({id}) => {
        return <ToastAlert id={id} message={message} status="info" />;
      },
      placement: 'top',
      duration: 2000,
    }),
};

export default toastMessages;
