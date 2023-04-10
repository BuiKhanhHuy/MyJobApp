import React from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment-timezone';
import 'moment/locale/vi';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import {HStack, Skeleton} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

import {salaryString} from '../../utils/customData';

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
  cityId,
  companyName,
  companyImageUrl,
  updateAt,
}) => {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image source={{uri: companyImageUrl}} style={styles.logo} alt="" />
        </View>
        <View style={{justifyContent: 'flex-start'}}>
          <Feather name="bookmark" size={20} color={'#524b6b'} />
        </View>
      </View>
      <View style={{paddingTop: 10}}>
        <Text
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
      </View>
    </>
  );
};

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

JobPost.Loading = Loading;

export default JobPost;
