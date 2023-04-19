import ReactNativeBlobUtil from 'react-native-blob-util';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const downloadFile = (fileUrl, mime = 'application/pdf') => {
  ReactNativeBlobUtil.config({
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mime: mime,
      description: 'File downloaded by download manager.',
    },
    fileCache: true,
  })
    .fetch('GET', `${fileUrl}`, {})
    .then(res => {
      console.log('The file saved to ', res.path());
    });
};

const createPDF = async () => {
  let options = {
    html: '<h1>PDF TEST</h1>',
    fileName: 'test',
    directory: 'Downloads',
  };

  let file = await RNHTMLtoPDF.convert(options);
  // console.log(file.filePath);
  return file
};

export default downloadFile;
export {createPDF};
