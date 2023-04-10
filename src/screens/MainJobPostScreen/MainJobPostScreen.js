import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Icon, Input, Text, View} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';

const MainJobPostScreen = ({navigation}) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: props => (
        <Input
          width="97%"
          marginLeft={-12}
          backgroundColor="myJobCustomColors.whiteSmoke"
          borderColor="myJobCustomColors.ghostPurpleBlue"
          borderRadius="md"
          borderWidth="1"
          padding="2"
          height="10"
          InputLeftElement={
            <Icon
              as={<Fontisto name="search" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          fontFamily="dMSansRegular"
          fontSize="xs"
          color="myJobCustomColors.darkIndigo"
          placeholder="Từ khóa tìm kiếm"
          lineHeight="2xs"
          onPressIn={() => navigation.navigate('MainJobPostScreen')}
        />
      ),
      headerRight: () => (
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: '#130160',
            borderRadius: 10,
            padding: 8,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SpecializationScreen')}>
            <Image
              source={require('../../assets/images/icons/filter-icon.png')}
              resizeMode="contain"
              alt=""
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const handleFilter = data => {
    console.log(data);
  };

  return <Text>MainJobPostScreen</Text>;
};

export default MainJobPostScreen;
