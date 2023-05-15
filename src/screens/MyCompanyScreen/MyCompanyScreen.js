import React from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {Button, HStack, ScrollView, Text, View} from 'native-base';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading';
import CompanyViewedProfileCard from '../components/CompanyViewedProfileCard';
import CompanyFollowedCard from '../components/CompanyFollowedCard/CompanyFollowedCard';

const MenuButtonComponent = ({tab, setTab}) => {
  return (
    <>
      <View>
        <HStack space={2}>
          <Button
            onPress={() => setTab(0)}
            disabled={tab === 0 ? true : false}
            size="lg"
            width="48%"
            rounded="lg"
            bgColor={
              tab === 0
                ? 'myJobCustomColors.darkIndigo'
                : 'myJobCustomColors.moonrakerPurplyBlue'
            }>
            <Text
              fontFamily="DMSans-Bold"
              color={
                tab === 0
                  ? 'myJobCustomColors.white'
                  : 'myJobCustomColors.darkIndigo'
              }>
              NTD xem hồ sơ
            </Text>
          </Button>
          <Button
            onPress={() => setTab(1)}
            disabled={tab === 1 ? true : false}
            size="lg"
            width="48%"
            rounded="lg"
            bgColor={
              tab === 1
                ? 'myJobCustomColors.darkIndigo'
                : 'myJobCustomColors.moonrakerPurplyBlue'
            }>
            <Text
              fontFamily="DMSans-Bold"
              color={
                tab === 1
                  ? 'myJobCustomColors.white'
                  : 'myJobCustomColors.darkIndigo'
              }>
              Theo dõi công ty
            </Text>
          </Button>
        </HStack>
      </View>
    </>
  );
};

const MyCompanyScreen = ({route}) => {
  const {tabIndex} = route.params;
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [tab, setTab] = React.useState(tabIndex);

  return (
    <>
      <View
        flex={1}
        paddingX={3}
        paddingBottom={2}
        onLayout={handleLayout}
        style={{marginTop: headerHeight}}>
        {isLayoutLoading ? (
          <BackdropLoading />
        ) : (
          <>
            <View flex={9}>
              {tab === 0 ? (
                <>
                  {/* Start: CompanyViewedProfileCard */}
                  <CompanyViewedProfileCard />
                  {/* End: CompanyViewedProfileCard */}
                </>
              ) : (
                <>
                  {/* Start: CompanyFollowedCard */}
                  <CompanyFollowedCard />
                  {/* End: CompanyFollowedCard */}
                </>
              )}
            </View>
            <View flex={1} justifyContent="center">
              <MenuButtonComponent tab={tab} setTab={setTab} />
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default MyCompanyScreen;
