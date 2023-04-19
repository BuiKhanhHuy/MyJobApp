import React from 'react';
import {Center, IconButton, Text} from 'native-base';
import {StyleSheet, Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import downloadFile from '../../utils/downloadFile';

const ViewPdfScreen = ({route, navigation}) => {
  const [currentPage, setCurrentPage] = React.useState({
    page: 1,
    numberOfPages: 1,
  });
  const {title, fileUrl} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title || 'Xem Tệp',
      headerRight: () => (
        <IconButton
          onPress={() => handleDownload(fileUrl)}
          size="sm"
          variant="solid"
          backgroundColor="myJobCustomColors.darkIndigo"
          _icon={{
            as: MaterialCommunityIcons,
            name: 'download',
          }}
        />
      ),
    });
  }, []);

  const handleDownload = fileUrl => {
    downloadFile(fileUrl);
  };

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={{
          uri: `${fileUrl}`,
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          setCurrentPage({
            page: page,
            numberOfPages: numberOfPages,
          });
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 20,
        }}>
        <Center>
          <Text textAlign="center">
            {currentPage.page}/{currentPage.numberOfPages}
          </Text>
        </Center>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'flex-start',
  },
  pdf: {
    flex: 1,
    height: Dimensions.get('window').height,
  },
});

export default ViewPdfScreen;
