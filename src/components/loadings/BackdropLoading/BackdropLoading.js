import React from 'react';
import {Center, Box, Spinner} from 'native-base';
import {Modal, StyleSheet, View} from 'react-native';

const BackdropLoading = () => {
  return (
    <Modal transparent={true} visible={true}>
      <View style={styles.centeredView}>
        <Center>
          <Box backgroundColor="white" padding="4" borderRadius="xl" shadow="2">
            <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
          </Box>
        </Center>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
});

export default BackdropLoading;
