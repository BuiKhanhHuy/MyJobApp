import React from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment-timezone';
import 'moment/locale/vi';
import FastImage from 'react-native-fast-image';
import {StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, HStack, View, Skeleton, Text, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {salaryString} from '../../utils/customData';
import {
  checkExists,
  createUser,
  checkChatRoomExists,
  addDocument,
} from '../../services/firebaseService';
import {ChatContext} from '../../context/ChatProvider';
import BackdropLoading from '../loadings/BackdropLoading';

const AppliedJobPost = ({
  id,
  jobName,
  careerId,
  experienceId,
  academicLevelId,
  positionId,
  salaryMin,
  salaryMax,
  typeOfWorkplaceId,
  jobTypeId,
  deadline,
  cityId,
  userId,
  userFullName,
  userEmail,
  companyId,
  companySlug,
  companyName,
  companyImageUrl,
  updateAt,
  appliedAt,
}) => {
  const {setSelectedRoomId, currentUserChat} = React.useContext(ChatContext);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const navigation = useNavigation();
  const {allConfig} = useSelector(state => state.config);

  const keyworkDescription = name => {
    return (
      <View
        style={{
          paddingVertical: 7,
          paddingHorizontal: 23,
          borderRadius: 8,
          backgroundColor: '#cbc9d4',
          marginRight: 10,
        }}>
        <Text
          style={{
            lineHeight: 13,
            fontSize: 10,
            color: '#524b6b',
            fontFamily: 'DMSans-Medium',
          }}>
          {name}
        </Text>
      </View>
    );
  };

  const handleAddRoom = async (partnerId, userData) => {
    setIsFullScreenLoading(true);

    // kiem tra user nay da duoc tao account tren firestore
    let allowCreateNewChatRoom = false;
    const isExists = await checkExists('accounts', partnerId);
    if (!isExists) {
      // tao moi user tren firestore.
      const createResult = await createUser('accounts', userData, partnerId);
      if (createResult) {
        // tao phong tro chuyen
        allowCreateNewChatRoom = true;
      }
    } else {
      allowCreateNewChatRoom = true;
      5;
    }

    // tao phong tro chuyen
    if (allowCreateNewChatRoom) {
      // neu da ton tai phong co 2 user này => setSelectRoomID
      let chatRoomId = await checkChatRoomExists(
        'chatRooms',
        currentUserChat.userId,
        partnerId,
      );
      if (chatRoomId === null) {
        // neu chua ton tai thi tao phong moi
        chatRoomId = await addDocument('chatRooms', {
          members: [`${currentUserChat.userId}`, `${partnerId}`],
          membersString: [
            `${currentUserChat.userId}-${partnerId}`,
            `${partnerId}-${currentUserChat.userId}`,
          ],
          recipientId: `${partnerId}`,
          unreadCount: 0,
        });
      }

      setIsFullScreenLoading(false);
      // set phong hien tai voi chatRoomId
      setSelectedRoomId(chatRoomId);

      // chuyen den chat screen
      navigation.navigate('ChatScreen');
    }
  };

  return (
    <>
      {isFullScreenLoading && <BackdropLoading />}
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <FastImage
              style={styles.logo}
              source={{
                uri: companyImageUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{justifyContent: 'flex-start'}}>
            <Text fontFamily="DMSans-Regular" color="#aaa6b9">
              Ứng tuyển ngày:{' '}
              <Text
                color="myJobCustomColors.burningOrange"
                fontFamily="DMSans-Bold">
                {moment(appliedAt).format('DD/MM/YYYY')}
              </Text>
            </Text>
          </View>
        </View>
        <View style={{paddingTop: 10}}>
          <Text
            onPress={() =>
              navigation.navigate('JobPostDetailScreen', {
                id: id,
              })
            }
            style={{
              fontFamily: 'DMSans-Bold',
              color: '#150a33',
              fontSize: 14,
              height: 18,
              lineHeight: 18,
            }}>
            {jobName}
          </Text>
        </View>
        <View style={{paddingTop: 4}}>
          <Text
            style={{
              height: 16,
              fontSize: 12,
              color: '#524b6b',
              fontFamily: 'DMSans-Medium',
            }}>
            {companyName}
          </Text>
        </View>
        <View style={{paddingVertical: 20}}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {careerId && keyworkDescription(allConfig?.careerDict[careerId])}
            {cityId && keyworkDescription(allConfig?.cityDict[cityId])}
            {experienceId &&
              keyworkDescription(allConfig?.experienceDict[experienceId])}
            {academicLevelId &&
              keyworkDescription(allConfig?.academicLevelDict[academicLevelId])}
            {positionId &&
              keyworkDescription(allConfig?.positionDict[positionId])}
            {typeOfWorkplaceId &&
              keyworkDescription(
                allConfig?.typeOfWorkplaceDict[typeOfWorkplaceId],
              )}
            {jobTypeId && keyworkDescription(allConfig?.jobTypeDict[jobTypeId])}
            {deadline &&
              keyworkDescription(moment(deadline).format('DD/MM/YYYY'))}
          </ScrollView>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text
              style={{
                fontSize: 10,
                lineHeight: 13,
                fontFamily: 'DMSans-Regular',
                color: '#aaa6b9',
              }}>
              {moment(updateAt).fromNow()}
            </Text>
          </View>
          <View>
            <Text>
              <Text
                style={{
                  lineHeight: 18,
                  fontSize: 14,
                  fontFamily: 'DMSans-Bold',
                  color: '#000',
                }}>
                {salaryString(salaryMin, salaryMax)}
              </Text>
              <Text
                style={{
                  lineHeight: 16,
                  fontSize: 12,
                  fontFamily: 'DMSans-Medium',
                  color: '#aaa6b9',
                }}>
                /tháng
              </Text>
            </Text>
          </View>
        </View>
        <View mt={4}>
          <Button
            bgColor="myJobCustomColors.irishGreen:alpha.20"
            size="sm"
            _pressed={{
              bg: 'myJobCustomColors.irishGreen:alpha.10',
            }}
            onPress={() =>
              handleAddRoom(userId, {
                userId: userId,
                name: userFullName,
                email: userEmail,
                avatarUrl: companyImageUrl,
                company: {
                  companyId: companyId,
                  slug: companySlug,
                  companyName: companyName,
                  imageUrl: companyImageUrl,
                },
              })
            }
          >
            <HStack space={1.5} alignItems="center" justifyContent="center">
              <Ionicons
                key={2}
                name="chatbubble-ellipses-outline"
                color={'#04B015'}
                size={20}
              />
              <Text
                fontFamily="dMSansMedium"
                color="myJobCustomColors.irishGreen">
                Gửi tin nhắn
              </Text>
            </HStack>
          </Button>
        </View>
      </View>
    </>
  );
};

const Loading = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Skeleton size="40" rounded="full" style={styles.logo} />
          </View>
          <View style={{justifyContent: 'flex-start'}}>
            <Skeleton size="5" rounded="md" />
          </View>
        </View>
        <View style={{paddingTop: 10}}>
          <Skeleton rounded="md" h="7" />
        </View>
        <View style={{paddingTop: 10}}>
          <Skeleton rounded="md" h="5" />
        </View>
        <HStack space="3" alignItems="center" style={{paddingTop: 10}}>
          <Skeleton rounded="md" flex={1} h="8" />
          <Skeleton rounded="md" flex={1} h="8" />
          <Skeleton rounded="md" flex={1} h="8" />
        </HStack>
        <HStack space="3" alignItems="center" style={{paddingTop: 10}}>
          <Skeleton rounded="md" flex={1} h="4" />
          <Skeleton rounded="md" flex={1} h="4" />
        </HStack>
        <View mt={4}>
          <Skeleton rounded="md" h="9" />
        </View>
      </View>
    </>
  );
};

AppliedJobPost.Loading = Loading;

export default AppliedJobPost;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 260,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
