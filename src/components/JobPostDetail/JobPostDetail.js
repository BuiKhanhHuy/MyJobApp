import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Center, Divider, Spinner, Text, VStack, View} from 'native-base';
import HTMLView from 'react-native-htmlview';

import {salaryString} from '../../utils/customData';
import {useLayout} from '../../hooks';
import Map from '../Map/Map';

const textItem = value => (
  <>
    {value ? (
      <Text style={styles.text} color="myJobCustomColors.mulledWine">
        {value}
      </Text>
    ) : (
      <Text style={styles.textEmpty} color="myJobCustomColors.mulledWine">
        Chưa cập nhật
      </Text>
    )}
  </>
);

const JobPostDetail = ({
  jobName,
  jobDescription,
  jobRequirement,
  benefitsEnjoyed,
  careerId,
  experienceId,
  academicLevelId,
  positionId,
  salaryMin,
  salaryMax,
  jobTypeId,
  typeOfWorkplaceId,
  quantity,
  genderRequiredId,
  contactPersonName,
  contactPersonEmail,
  contactPersonPhone,
  address,
  lat,
  lng,
}) => {
  const {allConfig} = useSelector(state => state.config);
  const [layout, isLayoutLoading, handleLayout] = useLayout();

  return (
    <View onLayout={handleLayout}>
      {isLayoutLoading ? (
        <Center mt="5">
          <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
        </Center>
      ) : (
        <VStack space={4}>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Mô tả công việc
            </Text>
            <View mt={2}>
              <HTMLView
                value={`<div>${jobDescription || 'Chưa cập nhật'}</div>`}
                stylesheet={styles}
              />
            </View>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Yêu cầu công việc
            </Text>
            <View mt={2}>
              <HTMLView
                value={`<div>${jobRequirement || 'Chưa cập nhật'}</div>`}
                stylesheet={styles}
              />
            </View>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Quyền lợi
            </Text>
            <View mt={2}>
              <HTMLView
                value={`<div>${benefitsEnjoyed || 'Chưa cập nhật'}</div>`}
                stylesheet={styles}
              />
            </View>
          </View>
          <View>
            <Text
              fontFamily="DMSans-Bold"
              color="myJobCustomColors.haitiBluePurple"
              fontSize={16}>
              Thông tin tuyển dụng
            </Text>
            <View mt={2}>
              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Ngành nghề
                </Text>
                <Text
                  mt={0.5}
                  style={styles.text}
                  color="myJobCustomColors.mulledWine">
                  {textItem(allConfig?.careerDict[careerId])}
                </Text>
              </View>
              <Divider
                my="3"
                backgroundColor="myJobCustomColors.lavenderPinocchioTealishBlue"
              />

              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Kinh nghiệm
                </Text>
                <Text
                  mt={0.5}
                  style={styles.text}
                  color="myJobCustomColors.mulledWine">
                  {textItem(allConfig?.experienceDict[experienceId])}
                </Text>
              </View>
              <Divider
                my="3"
                backgroundColor="myJobCustomColors.lavenderPinocchioTealishBlue"
              />

              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Học vấn
                </Text>
                <Text
                  mt={0.5}
                  style={styles.text}
                  color="myJobCustomColors.mulledWine">
                  {textItem(allConfig?.academicLevelDict[academicLevelId])}
                </Text>
              </View>
              <Divider
                my="3"
                backgroundColor="myJobCustomColors.lavenderPinocchioTealishBlue"
              />

              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Cấp bậc
                </Text>
                <Text
                  mt={0.5}
                  style={styles.text}
                  color="myJobCustomColors.mulledWine">
                  {textItem(allConfig?.positionDict[positionId])}
                </Text>
              </View>
              <Divider
                my="3"
                backgroundColor="myJobCustomColors.lavenderPinocchioTealishBlue"
              />

              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Mức lương
                </Text>
                <Text
                  mt={0.5}
                  style={styles.text}
                  color="myJobCustomColors.mulledWine">
                  {salaryString(salaryMin, salaryMax)}
                </Text>
              </View>
              <Divider
                my="3"
                backgroundColor="myJobCustomColors.lavenderPinocchioTealishBlue"
              />

              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Hình thức làm việc
                </Text>
                <Text
                  mt={0.5}
                  style={styles.text}
                  color="myJobCustomColors.mulledWine">
                  {textItem(allConfig?.jobTypeDict[jobTypeId])}
                </Text>
              </View>
              <Divider
                my="3"
                backgroundColor="myJobCustomColors.lavenderPinocchioTealishBlue"
              />

              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Nơi làm việc
                </Text>
                <Text
                  mt={0.5}
                  style={styles.text}
                  color="myJobCustomColors.mulledWine">
                  {textItem(allConfig?.typeOfWorkplaceDict[typeOfWorkplaceId])}
                </Text>
              </View>
              <Divider
                my="3"
                backgroundColor="myJobCustomColors.lavenderPinocchioTealishBlue"
              />

              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Số lượng tuyển
                </Text>
                <Text
                  mt={0.5}
                  style={styles.text}
                  color="myJobCustomColors.mulledWine">
                  {textItem(quantity)}
                </Text>
              </View>
              <Divider
                my="3"
                backgroundColor="myJobCustomColors.lavenderPinocchioTealishBlue"
              />

              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Yêu cầu giới tính
                </Text>
                <Text
                  mt={0.5}
                  style={styles.text}
                  color="myJobCustomColors.mulledWine">
                  {textItem(allConfig?.genderDict[genderRequiredId])}
                </Text>
              </View>
              <Divider
                my="3"
                backgroundColor="myJobCustomColors.lavenderPinocchioTealishBlue"
              />
            </View>
          </View>

          <View>
            <Text
              fontFamily="DMSans-Bold"
              color="myJobCustomColors.haitiBluePurple"
              fontSize={16}>
              Thông tin liên hệ
            </Text>
            <View mt={2}>
              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Tên người liên hệ
                </Text>
                <Text style={styles.text} color="myJobCustomColors.mulledWine">
                  {textItem(contactPersonName)}
                </Text>
              </View>
              <Divider
                my="3"
                backgroundColor="myJobCustomColors.lavenderPinocchioTealishBlue"
              />

              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Email người liên hệ
                </Text>
                <Text
                  mt={0.5}
                  style={styles.text}
                  color="myJobCustomColors.mulledWine">
                  {textItem(contactPersonEmail)}
                </Text>
              </View>
              <Divider
                my="3"
                backgroundColor="myJobCustomColors.lavenderPinocchioTealishBlue"
              />

              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Số điện thoại người liên hệ
                </Text>
                <Text
                  mt={0.5}
                  style={styles.text}
                  color="myJobCustomColors.mulledWine">
                  {textItem(contactPersonPhone)}
                </Text>
              </View>
              <Divider
                my="3"
                backgroundColor="myJobCustomColors.lavenderPinocchioTealishBlue"
              />

              <View>
                <Text
                  style={styles.subTitle}
                  color="myJobCustomColors.haitiBluePurple">
                  Địa chỉ
                </Text>
                <Text
                  mt={0.5}
                  style={styles.text}
                  color="myJobCustomColors.mulledWine">
                  {textItem(address)}
                </Text>
                <View mt={3}>
                  {/* Start: Map */}
                  <Map
                    latitude={lat}
                    longitude={lng}
                    title={jobName}
                    subTitle={address}
                  />
                  {/* End: Map */}
                </View>
              </View>
            </View>
          </View>
        </VStack>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'DMSans-Bold',
    fontSize: 16,
  },
  subTitle: {
    fontFamily: 'DMSans-Bold',
    fontSize: 14,
  },
  text: {
    fontFamily: 'DMSans-Regular',
    textAlign: 'justify',
  },
  textEmpty: {
    fontFamily: 'DMSans-Italic',
    textAlign: 'justify',
  },
  div: {
    color: '#524B6C',
    fontFamily: 'DMSans-Regular',
  },
});

export default JobPostDetail;
