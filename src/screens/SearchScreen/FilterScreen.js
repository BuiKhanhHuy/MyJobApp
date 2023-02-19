import React from 'react';
import {
  Button,
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
import RadioCustom from '../../components/RadioCustom';
import ButtonSelectCustom from '../../components/ButtonSelectCustom';
import CheckboxCustom from '../../components/CheckboxCustom';

const FilterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const handleSubmitFilter = data => {
    console.log('>>> SUBMIT FILTER -> DATA: ', data);
  };

  return (
    <View padding={6} flex={1}>
      <View flex={1}>
        <Center>
          <Text fontFamily="dMSansBold" fontSize="xl" lineHeight="sm">
            Bộ lọc
          </Text>
        </Center>
      </View>
      <View flex={12}>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          <VStack space={2}>
            {/*Start: Last Update */}
            <Box paddingY={2}>
              <CollapsibleCustom title="Last update">
                <View paddingY={4}>
                  <RadioCustom
                    control={control}
                    errors={errors}
                    name="lastUpdate"
                    rules={{
                      required: {
                        value: true,
                        message: 'Bạn hãy chọn thời gian cập nhật',
                      },
                    }}
                    flexDirection="column"
                  />
                </View>
              </CollapsibleCustom>
            </Box>
            <Divider bg="myJobCustomColors.lavenderPinocchioTealishBlue" />
            {/*End: Last Update */}
            {/* Start: Type Of Workplace */}
            <Box paddingY={2}>
              <CollapsibleCustom title="Type of workplace">
                <View paddingY={4}>
                  <RadioCustom
                    control={control}
                    errors={errors}
                    name="career"
                    rules={{
                      required: {
                        value: true,
                        message: 'Bạn hãy chọn 1 ngành nghề',
                      },
                    }}
                    flexDirection="column"
                  />
                </View>
              </CollapsibleCustom>
            </Box>
            <Divider bg="myJobCustomColors.lavenderPinocchioTealishBlue" />
            {/* End: Type Of Workplace */}
            {/* Start: Job Type */}
            <Box paddingY={2}>
              <CollapsibleCustom title="Job types">
                <View paddingY={4}>
                  <ButtonSelectCustom control={control} name="jobType" />
                </View>
              </CollapsibleCustom>
            </Box>
            <Divider bg="myJobCustomColors.lavenderPinocchioTealishBlue" />
            {/* End: Job Type */}
            {/* Start: Position level */}
            <Box paddingY={2}>
              <CollapsibleCustom title="Position level">
                <View paddingY={4}>
                  <ButtonSelectCustom control={control} name="positionLevel" />
                </View>
              </CollapsibleCustom>
            </Box>
            <Divider bg="myJobCustomColors.lavenderPinocchioTealishBlue" />
            {/* End: Position level */}
            {/* Start: City */}
            <Box paddingY={2}>
              <CollapsibleCustom title="Position level">
                <View paddingY={4}>
                  <CheckboxCustom
                    control={control}
                    errors={errors}
                    name="city"
                  />
                </View>
              </CollapsibleCustom>
            </Box>
            <Divider bg="myJobCustomColors.lavenderPinocchioTealishBlue" />
            {/* End: City */}
          </VStack>
        </ScrollView>
        <View paddingTop={8}>
          <Button
            backgroundColor="#130160"
            onPress={handleSubmit(handleSubmitFilter)}>
            SUBMIT
          </Button>
        </View>
      </View>
    </View>
  );
};

export default FilterScreen;
