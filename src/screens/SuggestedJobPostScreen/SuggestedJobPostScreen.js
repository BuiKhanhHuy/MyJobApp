import React from 'react';
import {InteractionManager} from 'react-native';
import {View} from 'native-base';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import SuggestedJobPostsCard from '../../components/SuggestedJobPostsCard/SuggestedJobPostsCard';

const SuggestedJobPostScreen = ({route, navigation}) => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const {headerTitle, pageSize, params} = route.params;

  React.useLayoutEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() =>
      navigation.setOptions({title: headerTitle}),
    );
    return () => interactionPromise.cancel();
  }, []);

  return (
    <>
      <View paddingX="3" onLayout={handleLayout}>
        {isLayoutLoading ? (
          <BackdropLoading />
        ) : (
          <SuggestedJobPostsCard
            pageSize={pageSize}
            isPagination={true}
            params={params}
          />
        )}
      </View>
    </>
  );
};

export default SuggestedJobPostScreen;
