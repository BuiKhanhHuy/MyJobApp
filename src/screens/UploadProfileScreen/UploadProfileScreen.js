import React from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {View} from 'native-base';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import UploadProfileForm from '../components/forms/UploadProfileForm/UploadProfileForm';

const UploadProfileScreen = () => {
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  return (
    <View
      flex={1}
      padding={6}
      onLayout={handleLayout}
      style={{marginTop: headerHeight}}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <>{isLoading ? <UploadProfileForm.Loading /> : <UploadProfileForm />}</>
      )}
      {isFullScreenLoading && <BackdropLoading />}
    </View>
  );
};

export default UploadProfileScreen;
