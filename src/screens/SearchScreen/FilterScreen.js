import React from 'react';
import {View, Text, Accordion} from 'native-base';
const dataArray = [
  {title: 'First Element', content: 'Lorem ipsum dolor sit amet'},
  {title: 'Second Element', content: 'Lorem ipsum dolor sit amet'},
  {title: 'Third Element', content: 'Lorem ipsum dolor sit amet'},
];
const FilterScreen = () => {
  return (
    <View>
      <Accordion dataArray={dataArray} expanded={0} />
    </View>
  );
};

export default FilterScreen;
