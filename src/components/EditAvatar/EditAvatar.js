import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Center,
  IconButton,
  VStack,
  View,
} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {SheetManager} from 'react-native-actions-sheet';
import Feather from 'react-native-vector-icons/Feather';

import toastMessages from '../../utils/toastMessages';
import BackdropLoading from '../loadings/BackdropLoading';
import {deleteAvatar, updateAvatar} from '../../redux/userSlice';

const EditAvatar = () => {
  const dispatch = useDispatch();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const {currentUser} = useSelector(state => state.user);

  const handleDelete = () => {
    setIsFullScreenLoading(true);

    dispatch(deleteAvatar())
      .unwrap()
      .then(() => {
        toastMessages.success('Xóa ảnh đại diện thành công.');
      })
      .catch((err) => {
        toastMessages.error();
      })
      .finally(() => setIsFullScreenLoading(false));
  };

  const handleUpload = imageResult => {
    setIsFullScreenLoading(true);

    var formData = new FormData();
    formData.append('file', {
      uri: imageResult.path,
      type: imageResult.mime,
      name: 'avatar',
    });

    dispatch(updateAvatar(formData))
      .unwrap()
      .then(() => {
        toastMessages.success('Cập nhật ảnh đại diện thành công.');
      })
      .catch(() => {
        toastMessages.error();
      })
      .finally(() => setIsFullScreenLoading(false));
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        handleUpload(image);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        handleUpload(image);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const showEditAvatarSheet = async () => {
    const result = await SheetManager.show('edit-avatar-sheet');

    switch (result) {
      case 'CAMERA':
        takePhotoFromCamera();
        break;
      case 'IMAGE_GALLERY':
        choosePhotoFromLibrary();
        break;
      case 'DELETE':
        const isOk = await SheetManager.show('confirm-sheet', {
          payload: {
            title: 'Xóa ảnh đại diện',
            description: 'Bạn có chắc chắn muốn xóa ảnh đại diện này không?',
            yesText: 'Đồng ý',
            noText: 'Hủy bỏ',
          },
        });
    
        if (isOk) {
          handleDelete();
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {isFullScreenLoading && <BackdropLoading />}
      <View>
        <Avatar
          bg="myJobCustomColors.neonCarrot"
          mr="1"
          size="lg"
          source={{
            uri: currentUser?.avatarUrl,
          }}>
          ---
        </Avatar>
        <Center position="absolute" left={9} top={8}>
          <IconButton
            borderWidth={0.5}
            borderColor="myJobCustomColors.cloud"
            size="sm"
            rounded="full"
            variant="solid"
            bgColor="myJobCustomColors.desertStorm"
            _icon={{
              as: Feather,
              name: 'camera',
              color: 'myJobCustomColors.mulledWineBluePurple',
            }}
            onPress={showEditAvatarSheet}
          />
        </Center>
      </View>
    </>
  );
};

export default EditAvatar;
