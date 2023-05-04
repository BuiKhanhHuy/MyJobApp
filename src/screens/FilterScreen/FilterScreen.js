import React from 'react';
import {
  Center,
  View,
  Text,
  VStack,
  Box,
  Divider,
  ScrollView,
} from 'native-base';
import {useForm} from 'react-hook-form';

import CollapsibleCustom from '../../components/CollapsibleCustom';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';

const FilterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleSubmitFilter = data => {
    console.log('>>> SUBMIT FILTER -> DATA: ', data);
  };

  const handleResetForm = () => {
    console.log('>> RESET FORM');
  };

  return (
    <>
      <View flex={1}>
        <View flex={0.5} padding={6}>
          <Center>
            <Text
              fontFamily="dMSansBold"
              fontSize="xl"
              lineHeight="sm"
              color="myJobCustomColors.haitiBluePurple">
              Bộ lọc
            </Text>
          </Center>
        </View>
        <View flex={12} padding={6}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never">
            <VStack space={2}>
              {/*Start: Last Update */}
              <Box paddingY={2}>
                <CollapsibleCustom title="Last update">
                  <View paddingY={4}></View>
                </CollapsibleCustom>
              </Box>
              <Divider bg="myJobCustomColors.lavenderPinocchioTealishBlue" />
              {/*End: Last Update */}
              {/* Start: Type Of Workplace */}
              <Box paddingY={2}>
                <CollapsibleCustom title="Type of workplace">
                  <View paddingY={4}></View>
                </CollapsibleCustom>
              </Box>
              <Divider bg="myJobCustomColors.lavenderPinocchioTealishBlue" />
              {/* End: Type Of Workplace */}
              {/* Start: Job Type */}
              <Box paddingY={2}>
                <CollapsibleCustom title="Job types">
                  <View paddingY={4}></View>
                </CollapsibleCustom>
              </Box>
              <Divider bg="myJobCustomColors.lavenderPinocchioTealishBlue" />
              {/* End: Job Type */}
              {/* Start: Position level */}
              <Box paddingY={2}>
                <CollapsibleCustom title="Position level">
                  <View paddingY={4}></View>
                </CollapsibleCustom>
              </Box>
              <Divider bg="myJobCustomColors.lavenderPinocchioTealishBlue" />
              {/* End: Position level */}
              {/* Start: City */}
              <Box paddingY={2}>
                <CollapsibleCustom title="Position level">
                  <View paddingY={4}></View>
                </CollapsibleCustom>
              </Box>
              <Divider bg="myJobCustomColors.lavenderPinocchioTealishBlue" />
              {/* End: City */}
              {/*Start: Experience */}
              <Box paddingY={2}>
                <CollapsibleCustom title="Experience">
                  <View paddingY={4}></View>
                </CollapsibleCustom>
              </Box>
              <Divider bg="myJobCustomColors.lavenderPinocchioTealishBlue" />
              {/*End: Experience */}
              {/* Start: Specialization */}
              <Box paddingY={2}>
                <CollapsibleCustom title="Specialization">
                  <View paddingY={4}></View>
                </CollapsibleCustom>
              </Box>
              <Divider bg="myJobCustomColors.lavenderPinocchioTealishBlue" />
              {/* End: Specialization */}
            </VStack>
          </ScrollView>
        </View>
        {/* Start: Button */}
        <View
          flexDirection="row"
          alignItems="center"
          paddingX={6}
          flex={1.8}
          backgroundColor="myJobCustomColors.white"
          shadow="myJobCustomShadows.1">
          <View flex={1} paddingRight="2">
            <ButtonCustom
              text="ĐẶT LẠI"
              textColor="myJobCustomColors.neonCarrot"
              bgColor="myJobCustomColors.white"
              shadow="4"
              onPress={handleResetForm}
            />
          </View>
          <View flex={3} paddingLeft="2">
            <ButtonCustom
              text="TÌM KIẾM NGAY"
              textColor="myJobCustomColors.white"
              bgColor="myJobCustomColors.darkIndigo"
              shadow="6"
              onPress={handleSubmit(handleSubmitFilter)}
            />
          </View>
        </View>
        {/* End: Button */}
      </View>
    </>
  );
};

export default FilterScreen;
