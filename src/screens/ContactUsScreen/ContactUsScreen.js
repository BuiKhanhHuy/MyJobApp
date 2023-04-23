import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {Center, Image, ScrollView, Text, VStack, View} from 'native-base';

import {useLayout} from '../../hooks';
import {LOGO_IMAGE} from '../../configs/globalStyles';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import Map from '../../components/Map/Map';

const ContactUsScreen = () => {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();

  return (
    <View
      flex={1}
      paddingX={6}
      paddingBottom={6}
      onLayout={handleLayout}
      style={{marginTop: headerHeight}}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack space={6}>
              <Center>
                <Image
                  source={LOGO_IMAGE.darkTextLogo}
                  alt="Alternate Text"
                  resizeMode="center"
                />
              </Center>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  lineHeight="sm"
                  color="myJobCustomColors.haitiBluePurple">
                  Về chúng tôi
                </Text>
                <View paddingTop={4}>
                  <Text
                    textAlign="justify"
                    color="myJobCustomColors.mulledWine">
                    MyJob - Kênh thông tin tuyển dụng và việc làm dành cho mọi
                    Doanh nghiệp và Ứng viên. Chúng tôi tin tưởng sẽ đem lại “HY
                    VỌNG” cho Doanh nghiệp tìm kiếm nhân tài và cho Ứng viên tìm
                    kiếm cơ hội nghề nghiệp.Với 2 hệ thống: Website dành cho Nhà
                    Tuyển Dụng và Ứng dụng (Application) dành cho Người Tìm
                    Việc, MyJob sẽ mang lại những trải nghiệm mới mẻ, thú vị;
                    kết nối ước mơ chinh phục công việc của mọi nhân tài và giúp
                    doanh nghiệp xây dựng đội ngũ nhân sự vững mạnh.
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  lineHeight="sm"
                  color="myJobCustomColors.burningOrange">
                  Website
                </Text>
                <View paddingTop={4}>
                  <Text
                    textAlign="justify"
                    color="myJobCustomColors.mulledWine">
                    Website hỗ trợ Nhà Tuyển Dụng tìm kiếm nhân sự, quản lý công
                    việc, ứng viên, xây dựng nguồn dữ liệu phong phú.
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  lineHeight="sm"
                  color="myJobCustomColors.burningOrange">
                  Mobile
                </Text>
                <View paddingTop={4}>
                  <Text
                    textAlign="justify"
                    color="myJobCustomColors.mulledWine">
                    Ứng dụng tìm kiếm việc làm giúp Người Tìm Việc tiếp cận được
                    công việc phù hợp nhất ở mọi nơi và mọi thời điểm
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  lineHeight="sm"
                  color="myJobCustomColors.burningOrange">
                  Ngành tập trung
                </Text>
                <View paddingTop={4}>
                  <Text
                    textAlign="justify"
                    color="myJobCustomColors.mulledWine">
                    Với việc chuyên sâu vào mảng tuyển dụng và tìm kiếm việc làm
                    của 3 lĩnh vực: Công nghệ thông tin, Quảng cáo trực tuyến,
                    PR - Marketing, Người Tìm việc hay Nhà Tuyển dụng sẽ kết nối
                    được đúng với đối tượng, phù hợp với nhu cầu.
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="lg"
                  lineHeight="sm"
                  color="myJobCustomColors.burningOrange">
                  Tiết kiệm chi phí
                </Text>
                <View paddingTop={4}>
                  <Text
                    textAlign="justify"
                    color="myJobCustomColors.mulledWine">
                    Tiết kiệm chi phí, thời gian, đạt được hiệu quả, đáp ứng
                    được mọi nhu cầu tìm việc và tìm nhân tài.
                  </Text>
                </View>
              </View>
              <View
                padding={6}
                backgroundColor="myJobCustomColors.white"
                borderRadius="md">
                <VStack space={2}>
                  <View>
                    <Text
                      fontFamily="DMSans-Bold"
                      color="myJobCustomColors.haitiBluePurple">
                      Điện thoại
                    </Text>
                    <Text
                      fontFamily="DMSansRegular"
                      color="myJobCustomColors.mulledWine">
                      0888-425-094
                    </Text>
                  </View>
                  <View>
                    <Text
                      fontFamily="DMSans-Bold"
                      color="myJobCustomColors.haitiBluePurple">
                      Email
                    </Text>
                    <Text
                      fontFamily="DMSansRegular"
                      color="myJobCustomColors.mulledWine">
                      myjob.contact00000@gmail.com
                    </Text>
                  </View>
                  <View>
                    <Text
                      fontFamily="DMSans-Bold"
                      color="myJobCustomColors.haitiBluePurple">
                      Địa chỉ
                    </Text>
                    <Text
                      fontFamily="DMSansRegular"
                      color="myJobCustomColors.mulledWine">
                      1242 QL1A, Tân Tạo A, Bình Tân, TP. HCM
                    </Text>
                  </View>
                  <View>
                    <Text
                      fontFamily="DMSans-Bold"
                      color="myJobCustomColors.haitiBluePurple"
                      mb={1}>
                      Bản đồ
                    </Text>
                    <Map
                      title="MyJob"
                      subTitle="1242 QL1A, Tân Tạo A, Bình Tân, TP. Hồ Chí Minh"
                      latitude={10.723151713888345}
                      longitude={106.60091036729372}
                    />
                  </View>
                </VStack>
              </View>
            </VStack>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default ContactUsScreen;
