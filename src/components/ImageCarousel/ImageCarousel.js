import React from 'react';
import {View} from 'native-base';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';

const ImageCarousel = ({items}) => {
  const width = Dimensions.get('window').width;

  const renderItem = item => {
    return (
      <View key={item.id}>
        <FastImage
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 5,
          }}
          source={{
            uri: item.imageUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  };

  return (
    <View height={200}>
      <Carousel
        layout="default"
        data={items}
        renderItem={({item}) => renderItem(item)}
        sliderWidth={width - 50}
        itemWidth={width - 50}
        enableSnap={true}
        loop={true}
        autoplay={true}
        activeAnimationType="spring"
      />
    </View>
  );
};

export default ImageCarousel;
