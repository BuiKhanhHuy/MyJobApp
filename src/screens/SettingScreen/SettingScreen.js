import React from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {VStack, View} from 'native-base';
import {SheetManager} from 'react-native-actions-sheet';
import {useDispatch, useSelector} from 'react-redux';

import errorHandling from '../../utils/errorHandling';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import SettingOptionCard from '../../components/SettingOptionCard';
import {useLayout} from '../../hooks';
import {removeUserInfo} from '../../redux/userSlice';

const SettingScreen = () => {
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const {isAuthenticated} = useSelector(state => state.user);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [layout, isLayoutLoading, handleLayout] = useLayout();

  const handleLogout = async () => {
    const logout = () => {
      dispatch(removeUserInfo())
        .unwrap()
        .then(() => {
          navigation.navigate('Login');
          setIsFullScreenLoading(false);
        })
        .catch(error => {
          console.log('ERROR: ', error);
          errorHandling(error);
          setIsFullScreenLoading(false);
        });
    };

    const isOk = await SheetManager.show('confirm-sheet', {
      payload: {
        title: 'Đăng xuất',
        description: 'Bạn có chắc chắn muốn đăng xuất?',
        yesText: 'Đồng ý',
        noText: 'Hủy bỏ',
      },
    });

    if (isOk) {
      setIsFullScreenLoading(true);
      logout();
    }
  };

  return (
    <>
      <View
        flex={1}
        paddingX={4}
        paddingBottom={6}
        onLayout={handleLayout}
        style={{marginTop: headerHeight}}>
        {isLayoutLoading ? (
          <BackdropLoading />
        ) : (
          <>
            <View paddingTop={4}>
              <VStack space={3}>
                <SettingOptionCard
                  leftIconName="md-notifications-outline"
                  rightIconName="chevron-forward"
                  title="Cài đặt thông báo"
                  onPress={() =>
                    alert(
                      'Chức năng chưa được phát triển ở phiên bản hiện tại.',
                    )
                  }
                />
                <SettingOptionCard
                  leftIconName="moon-outline"
                  rightIconName="chevron-forward"
                  title="Giao diện"
                  onPress={() =>
                    alert(
                      'Chức năng chưa được phát triển ở phiên bản hiện tại.',
                    )
                  }
                />
                <SettingOptionCard
                  leftIconName="ios-language-outline"
                  rightIconName="chevron-forward"
                  title="Ngôn ngữ"
                  onPress={() =>
                    alert(
                      'Chức năng chưa được phát triển ở phiên bản hiện tại.',
                    )
                  }
                />
                {isAuthenticated && (
                  <>
                    <SettingOptionCard
                      leftIconName="ios-key-outline"
                      rightIconName="chevron-forward"
                      title="Đổi mật khẩu"
                      onPress={() =>
                        navigation.navigate('ChangePasswordScreen')
                      }
                    />
                    <SettingOptionCard
                      leftIconName="ios-exit-outline"
                      rightIconName="chevron-forward"
                      title="Đăng xuất"
                      onPress={handleLogout}
                    />
                  </>
                )}
              </VStack>
            </View>
          </>
        )}
      </View>
      {isFullScreenLoading && <BackdropLoading />}
    </>
  );
};

export default SettingScreen;
