import React from 'react';
import {Center, Box, Spinner, Modal} from 'native-base';

const BackdropLoading = () => {
  return (
    <Modal
      isOpen
      safeAreaTop={true}
      backgroundColor="myJobCustomColors.black:alpha.30">
      <Center>
        <Box backgroundColor="white" padding="4" borderRadius="xl" shadow="2">
          <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
        </Box>
      </Center>
    </Modal>
  );
};

export default BackdropLoading;
