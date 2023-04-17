import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Center, Spinner, Text, View, VStack} from 'native-base';
import moment from 'moment-timezone';
import 'moment/locale/vi';

import toastMessages from '../../../../utils/toastMessages';
import NoData from '../../../../components/NoData/NoData';
import ProfileCard from '../ProfileCard';
import jobSeekerProfileService from '../../../../services/jobSeekerProfileService';

const Item = ({title, content}) => (
  <View>
    <Text
      fontFamily="dMSansBold"
      lineHeight="sm"
      color="myJobCustomColors.mulledWine">
      {title}
    </Text>
    <Text
      fontFamily="dMSansRegular"
      lineHeight="lg"
      color="myJobCustomColors.mulledWine">
      {content || '---'}
    </Text>
  </View>
);

const PersonalProfileCard = () => {
  const navigation = useNavigation();
  const {allConfig} = useSelector(state => state.config);
  const {isReloadPersonalProfile} = useSelector(state => state.reload);
  const [isLoading, setIsLoading] = React.useState(true);
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);

      try {
        const resData = await jobSeekerProfileService.getProfile();

        setProfile(resData.data);
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [isReloadPersonalProfile]);

  return (
    <ProfileCard
      titleIcon="user"
      title="Thông tin cá nhân"
      isShowDivider={true}
      iconName="edit"
      onPressRightButton={() =>
        navigation.navigate('EditPersonalProfileScreen')
      }>
      <VStack space={2}>
        {isLoading ? (
          <Center mt="5">
            <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
          </Center>
        ) : profile === null ? (
          <NoData title="Không có dữ liệu" />
        ) : (
          <>
            <Item title="Họ và tên" content={profile?.user?.fullName} />
            <Item title="Số điện thoại" content={profile?.phone} />
            <Item
              title="Ngày sinh"
              content={
                profile?.birthday
                  ? moment(profile?.birthday).format('DD/MM/YYYY')
                  : profile?.birthday
              }
            />
            <Item
              title="Giới tính"
              content={allConfig.genderDict[profile?.gender]}
            />
            <Item
              title="Tình trạng hôn nhân"
              content={allConfig.maritalStatusDict[profile?.maritalStatus]}
            />
            <Item
              title="Tỉnh/Thành phố"
              content={allConfig.cityDict[profile?.location?.city]}
            />
            <Item
              title="Quận/Huyện"
              content={profile?.location?.districtDict?.name}
            />
            <Item title="Địa chỉ" content={profile?.location?.address} />
          </>
        )}
      </VStack>
    </ProfileCard>
  );
};

export default PersonalProfileCard;
