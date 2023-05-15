import ReactNativeBlobUtil from 'react-native-blob-util';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const downloadFile = async (fileUrl, mime = 'application/pdf') => {
  return await ReactNativeBlobUtil.config({
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mime: mime,
      description: 'File downloaded by download manager.',
    },
    fileCache: true,
  }).fetch('GET', `${fileUrl}`, {});
};

const shareLink = async fileUrl => {
  let link = null;
  if ((fileUrl.startsWith('http') || fileUrl.startsWith('https')) === true) {
    const data = await ReactNativeBlobUtil.fetch('GET', fileUrl).then(res => {
      let status = res.info().status;
      if (status == 200) {
        let base64Str = res.base64();
        return `data:application/pdf;base64,${base64Str}`;
      }
    });

    link = data;
  } else {
    link = 'file://' + fileUrl;
  }

  return link;
};

const createPDF = async (html, fileName) => {
  let options = {
    html: html,
    fileName: fileName || 'MyJob-Cv',
    directory: 'Downloads',
  };

  let file = await RNHTMLtoPDF.convert(options);
  return file;
};

export default downloadFile;
export {createPDF, shareLink};
