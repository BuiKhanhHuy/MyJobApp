import React from 'react';
import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment-timezone';
import 'moment/locale/vi';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HStack, Skeleton, Text, View, VStack} from 'native-base';
import {TouchableNativeFeedback} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const Notification = props => {
  const {
    id,
    title,
    content,
    image,
    time,
    isRead,
    item,
    handleRemove,
    handleClickItem,
  } = props;
  const navigation = useNavigation();
  const {allConfig} = useSelector(state => state.config);

  return (
    <TouchableNativeFeedback onPress={() => handleClickItem(item)}>
      <View style={styles.container}>
        <HStack justifyContent="space-between" mb={2}>
          <FastImage
            style={styles.logo}
            source={{
              uri: `${image}`,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          {isRead ? (
            <Text
              style={{
                fontFamily: 'DMSans-Regular',
                color: '#9FA7B1',
                fontSize: 12,
              }}>
              Đã đọc
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: 'DMSans-Regular',
                color: '#04B015',
                fontSize: 12,
              }}>
              Mới
            </Text>
          )}
        </HStack>
        <VStack space={4}>
          <VStack space={2}>
            {isRead ? (
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  color: '#150a33',
                  fontSize: 16,
                }}>
                {title}
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: 'DMSans-Bold',
                  color: '#150a33',
                  fontSize: 16,
                }}>
                {title}
              </Text>
            )}

            <Text
              style={{
                fontFamily: 'DMSans-Regular',
                color: '#150a33',
              }}>
              {content}
            </Text>
          </VStack>
          <View>
            <HStack justifyContent="space-between" alignItems="center">
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'DMSans-Regular',
                    color: '#aaa6b9',
                  }}>
                  {moment(time * 1000).fromNow()}
                </Text>
              </View>
              <View>
                <Text
                  fontSize={16}
                  color="#FC4646"
                  onPress={() => handleRemove(id)}>
                  Xóa thông báo
                </Text>
              </View>
            </HStack>
          </View>
        </VStack>
      </View>
    </TouchableNativeFeedback>
  );
};

const Loading = () => {
  return (
    <View style={styles.container}>
      <HStack justifyContent="space-between" alignItems="center" mb={2}>
        <Skeleton style={styles.logo} />
        <Skeleton rounded="md" width={'80%'} h="4" />
      </HStack>
      <VStack space={4}>
        <VStack space={2}>
          <Skeleton rounded="md" h="4" />

          <Skeleton rounded="md" h="4" />
        </VStack>
        <View>
          <HStack justifyContent="space-between" alignItems="center">
            <View>
              <Skeleton rounded="md" h="4" />
            </View>
            <View>
              <Skeleton size="5" w={48} rounded="md" />
            </View>
          </HStack>
        </View>
      </VStack>
    </View>
  );
};

Notification.Loading = Loading;

export default Notification;

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 15,
    shadowOpacity: 0.18,
    shadowColor: '#99ABC6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#E6E6E6',
  },
});
