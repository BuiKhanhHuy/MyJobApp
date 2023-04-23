import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment-timezone';
import 'moment/locale/vi';
import FastImage from 'react-native-fast-image';
import {Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HStack, Skeleton, Spinner, View} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import toastMessages from '../../utils/toastMessages';
import {salaryString} from '../../utils/customData';
import jobService from '../../services/jobService';
import {reloadSaveJobPost} from '../../redux/reloadSlice';

const SaveComponent = ({id, isSaved}) => {
  const dispath = useDispatch();
  const navigation = useNavigation();
  const {isAuthenticated} = useSelector(state => state.user);
  const [isSaveLoading, setIsSaveLoading] = React.useState(false);

  const handleSave = id => {
    const saveJob = async jobPostId => {
      setIsSaveLoading(true);

      try {
        const resData = await jobService.saveJobPost(jobPostId);
        const saveStatus = resData?.data?.isSaved;

        dispath(
          reloadSaveJobPost({
            id: jobPostId,
            status: saveStatus,
          }),
        );
        toastMessages.success(
          saveStatus ? 'Lưu thành công.' : 'Hủy lưu thành công.',
        );
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsSaveLoading(false);
      }
    };

    saveJob(id);
  };

  return (
    <>
      {isSaveLoading ? (
        <Spinner color="myJobCustomColors.deepSaffron" />
      ) : (
        <TouchableOpacity
          onPress={() =>
            isAuthenticated ? handleSave(id) : navigation.navigate('Login')
          }>
          {isSaved ? (
            <FontAwesome name="bookmark" size={22} color={'#FF9228'} />
          ) : (
            <FontAwesome name="bookmark-o" size={22} color={'#524b6b'} />
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

const JobPost = ({
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
  isHot,
  isUrgent,
  isSaved,
  cityId,
  companyName,
  companyImageUrl,
  updateAt,
}) => {
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

  return (
    <View style={styles.container} shadow={'myJobCustomShadows.0'}>
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
          {/* Start: SaveComponent */}
          <SaveComponent id={id} isSaved={isSaved} />
          {/* End: SaveComponent */}
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
            lineHeight: 16,
            fontSize: 12,
            color: '#524b6b',
            fontFamily: 'DMSans-Medium',
          }}>
          {companyName}
        </Text>
      </View>
      <View style={{paddingVertical: 20}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
    </View>
  );
};

const Loading = () => (
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
  </View>
);

JobPost.Loading = Loading;

export default JobPost;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 210,
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
