import React from 'react';
import FastImage from 'react-native-fast-image';
import {Dimensions, Linking, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Button, Skeleton, Stack, Text, VStack} from 'native-base';

import myjobService from '../../services/myjobService';

const RenderItem = ({item}) => {
  const [location, setLocation] = React.useState({
    position: 'absolute',
    left: 10,
    bottom: 20,
    right: null,
    top: null,
  });

  React.useMemo(() => {
    switch (item.descriptionLocation) {
      case 1:
        setLocation({
          position: 'absolute',
          left: 10,
          bottom: null,
          right: null,
          top: 20,
        });
        break;
      case 2:
        setLocation({
          position: 'absolute',
          left: null,
          bottom: null,
          right: 10,
          top: 20,
        });
        break;
      case 3:
        setLocation({
          position: 'absolute',
          left: 10,
          bottom: 20,
          right: null,
          top: null,
        });
        break;
      case 4:
        setLocation({
          position: 'absolute',
          left: null,
          bottom: 20,
          right: 10,
          top: null,
        });
        break;
      default:
        break;
    }
  }, [item]);

  const handleOpenLink = link => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log('URL cannot be opened');
      }
    });
  };

  return (
    <View key={item.id} style={{position: 'relative'}}>
      <FastImage
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 5,
        }}
        source={{
          uri: item.imageMobileUrl,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

      <VStack style={location} space={2}>
        <View width={200}>
          {item?.description && (
            <Text
              color="myJobCustomColors.white"
              fontFamily="dMSansMedium"
              fontSize={20}>
              {item?.description}
            </Text>
          )}
        </View>
        {item?.isShowButton && (
          <Button
            onPress={() => handleOpenLink(item?.buttonLink)}
            fontFamily="dMSansRegular"
            backgroundColor="myJobCustomColors.neonCarrot"
            maxWidth={160}>
            {item?.buttonText}
          </Button>
        )}
      </VStack>
    </View>
  );
};

const BannerCarousel = () => {
  const width = Dimensions.get('window').width;
  const [banners, setBanners] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const getBanners = async () => {
      setIsLoading(true);
      try {
        const resData = await myjobService.getBanners();

        const data = resData?.data || [];

        setBanners(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getBanners();
  }, []);

  return (
    <View height={200}>
      {isLoading ? (
        <View>
          <Skeleton height={'100%'} rounded="md" />
        </View>
      ) : (
        <Carousel
          lockScrollWhileSnapping={true}
          layout="default"
          data={banners}
          renderItem={({item}) => <RenderItem item={item} />}
          sliderWidth={width - 25}
          itemWidth={width - 25}
          enableSnap={true}
          loop={true}
          autoplay={true}
          activeAnimationType="spring"
        />
      )}
    </View>
  );
};

export default BannerCarousel;
