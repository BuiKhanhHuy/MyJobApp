import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import moment from 'moment-timezone';
import 'moment/locale/vi';
import {
  Avatar,
  Center,
  HStack,
  Link,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import HTMLView from 'react-native-htmlview';

import {ICONS} from '../../configs/globalStyles';
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

const CompanyDetail = ({
  companyName,
  employeeSizeId,
  fieldOperation,
  since,
  taxCode,
  companyEmail,
  companyPhone,
  websiteUrl,
  facebookUrl,
  youtubeUrl,
  linkedinUrl,
  description,
  cityId,
  address,
  lat,
  lng,
  companyImages,
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
              Giới thiệu
            </Text>
            <View mt={2}>
              <HTMLView
                value={`<div>${description || 'Chưa cập nhật'}</div>`}
                stylesheet={styles}
              />
            </View>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Lĩnh vực
            </Text>
            <Text
              mt={2}
              style={styles.text}
              color="myJobCustomColors.mulledWine">
              {textItem(fieldOperation)}
            </Text>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Quy mô công ty
            </Text>
            <Text
              mt={2}
              style={styles.text}
              color="myJobCustomColors.mulledWine">
              {textItem(allConfig?.employeeSizeDict[employeeSizeId])}
            </Text>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Ngày thành lập
            </Text>
            <Text
              mt={2}
              style={styles.text}
              color="myJobCustomColors.mulledWine">
              {textItem(moment(since).format('DD/MM/YYYY'))}
            </Text>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Website
            </Text>
            <Text
              mt={2}
              style={styles.text}
              color="myJobCustomColors.mulledWine">
              {websiteUrl ? (
                <Link
                  href={websiteUrl}
                  isExternal
                  _text={{
                    color: 'blue.400',
                  }}
                  mt={-0.5}
                  _web={{
                    mb: -2,
                  }}>
                  {websiteUrl}
                </Link>
              ) : (
                <Text
                  style={styles.textEmpty}
                  color="myJobCustomColors.mulledWine">
                  Chưa cập nhật
                </Text>
              )}
            </Text>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Mã số thuế
            </Text>
            <Text
              mt={2}
              style={styles.text}
              color="myJobCustomColors.mulledWine">
              {textItem(taxCode)}
            </Text>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Email
            </Text>
            <Text
              mt={2}
              style={styles.text}
              color="myJobCustomColors.mulledWine">
              {textItem(companyEmail)}
            </Text>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Số điện thoại
            </Text>
            <Text
              mt={2}
              style={styles.text}
              color="myJobCustomColors.mulledWine">
              {textItem(companyPhone)}
            </Text>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Địa chỉ
            </Text>
            <Text
              mt={2}
              style={styles.text}
              color="myJobCustomColors.mulledWine">
              {textItem(address)}
            </Text>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Vị trí trên bản đồ
            </Text>
            <View mt={3}>
              {/* Start: Map */}
              <Map
                latitude={lat}
                longitude={lng}
                title={companyName}
                subTitle={address}
              />
              {/* End: Map */}
            </View>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Hình ảnh
            </Text>
            <View mt={2}></View>
          </View>
          <View>
            <Text
              style={styles.title}
              color="myJobCustomColors.haitiBluePurple">
              Theo dõi tại
            </Text>
            <View mt={2}>
              <HStack space={3}>
                <Center>
                  <Avatar
                    bg="myJobCustomColors.white"
                    alignSelf="center"
                    size="sm"
                    source={ICONS.FACEBOOK}>
                    Facebook
                  </Avatar>
                </Center>
                <Center>
                  <Avatar
                    bg="myJobCustomColors.white"
                    alignSelf="center"
                    size="sm"
                    source={ICONS.YOUTUBE}>
                    Youtube
                  </Avatar>
                </Center>
                <Center>
                  <Avatar
                    bg="myJobCustomColors.white"
                    alignSelf="center"
                    size="sm"
                    source={ICONS.LINKEDIN}>
                    Linkedin
                  </Avatar>
                </Center>
              </HStack>
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

export default CompanyDetail;
