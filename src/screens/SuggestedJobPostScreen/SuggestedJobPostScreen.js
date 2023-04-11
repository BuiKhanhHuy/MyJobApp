import React from 'react';
import {InteractionManager} from 'react-native';
import {View} from 'native-base';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import SuggestedJobPostCard from '../../components/SuggestedJobPostCard/SuggestedJobPostCard';

const SuggestedJobPostScreen = ({route, navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const {headerTitle, pageSize, params} = route.params;

  React.useState(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() =>
      navigation.setOptions({title: headerTitle}),
    );
    return () => interactionPromise.cancel();
  }, []);

  return (
    <View paddingX="4" onLayout={handleLayout}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <SuggestedJobPostCard
          pageSize={pageSize}
          isPagination={true}
          params={params}
        />
      )}
    </View>
  );
};

export default SuggestedJobPostScreen;
