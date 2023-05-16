import React from 'react';
import {useSelector} from 'react-redux';
import {Center, Icon, IconButton, Spinner, Text} from 'native-base';
import {StyleSheet, Dimensions, View, Linking, Platform} from 'react-native';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import FileViewer from 'react-native-file-viewer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import downloadFile, {shareLink} from '../../utils/downloadFile';
import toastMessages from '../../utils/toastMessages';
import toSlug from '../../utils/customData';

const ViewPdfScreen = ({route, navigation}) => {
  const [isLoadingPdf, setIsLoadingPdf] = React.useState(true);
  const {currentUser} = useSelector(state => state.user);
  const [currentPage, setCurrentPage] = React.useState({
    page: 1,
    numberOfPages: 1,
  });
  const {title, fileUrl} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title || 'Xem Tệp',
      headerRight: () => (
        <>
          <IconButton
            onPress={() => handleShareFile(fileUrl)}
            marginRight={2}
            icon={<Icon as={Ionicons} name="md-share-social-outline" />}
            borderRadius="full"
            _icon={{
              color: 'myJobCustomColors.mulledWineBluePurple',
              size: 'lg',
            }}
          />

          {fileUrl.startsWith('http') || fileUrl.startsWith('https') ? (
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
          ) : (
            <IconButton
              onPress={() => handleOpenFolder(fileUrl)}
              size="sm"
              variant="solid"
              backgroundColor="myJobCustomColors.darkIndigo"
              _icon={{
                as: Entypo,
                name: 'folder',
              }}
            />
          )}
        </>
      ),
    });
  }, []);

  const handleDownload = fileUrl => {
    downloadFile(fileUrl);
  };

  const handleOpenFolder = async fileUrl => {
    FileViewer.open(`file://${fileUrl}`)
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  };

  const handleShareFile = async fileUrl => {
    const linkFile = await shareLink(fileUrl);

    if (linkFile !== null) {
      const fileName = `MyJob_CV-${toSlug(currentUser?.fullName || '')}`;

      let options = {
        type: 'application/pdf',
        url: linkFile,
        filename: fileName,
      };

      Share.open(options)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    } else {
      toastMessages.error();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Pdf
          onLoadProgress={() => console.log('Đang load')}
          trustAllCerts={false}
          source={{
            uri: `${fileUrl}`,
            cache: true,
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
            setIsLoadingPdf(false);
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
          renderActivityIndicator={() => (
            <Center mt="5">
              <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
            </Center>
          )}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: '50%',
          }}>
          {/* <Center>
            <Text textAlign="center">
              {currentPage.page}/{currentPage.numberOfPages}
            </Text>
          </Center> */}
        </View>
      </View>
    </>
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
