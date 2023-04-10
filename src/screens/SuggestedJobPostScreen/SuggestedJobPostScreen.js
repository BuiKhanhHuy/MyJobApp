import React from 'react';
import {InteractionManager} from 'react-native';
import {View} from 'native-base';

import SuggestedJobPostCard from '../../components/SuggestedJobPostCard/SuggestedJobPostCard';

const SuggestedJobPostScreen = ({route, navigation}) => {
  const {headerTitle, params} = route.params;

  React.useState(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() =>
      navigation.setOptions({title: headerTitle}),
    );
    return () => interactionPromise.cancel();
  }, []);

  return (
    <View paddingX="4">
      <SuggestedJobPostCard isPagination={true} params={params} />
    </View>
  );
};

export default SuggestedJobPostScreen;
