import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  VStack,
  Modal,
  Button,
  ScrollView,
  Text,
  Center,
  View,
  Spinner,
} from 'native-base';

import SelectCustom from '../../formControls/SelectCustom/SelectCustom';
import ButtonCustom from '../../ButtonCustom/ButtonCustom';

const FilterJobPostForm = ({openPopup, setOpenPopup, handleFilter}) => {
  const [isRendered, setIsRendered] = React.useState(false);
  const handleLayout = () => {
    setIsRendered(true);
  };

  const schema = yup.object().shape({});
  const {control, handleSubmit} = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Modal isOpen={openPopup} onClose={() => setOpenPopup(false)} size={'xl'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header fontFamily="DMSans-Bold">
            <Text fontFamily="DMSans-Bold" fontSize="18">
              Nâng cao
            </Text>
          </Modal.Header>
          <Modal.Body>
            <View onLayout={handleLayout}>
              {isRendered ? (
                <ScrollView>
                  <VStack space={2}>
                    <SelectCustom
                      name="employeeSize"
                      control={control}
                      options={[]}
                      title="Quy mô công ty"
                      showRequired={true}
                      placeholder="Chọn quy mô công ty"
                    />
                    <SelectCustom
                      name="employeeSize"
                      a
                      control={control}
                      options={[]}
                      title="Quy mô công ty"
                      showRequired={true}
                      placeholder="Chọn quy mô công ty"
                    />
                    <SelectCustom
                      name="employeeSize"
                      control={control}
                      options={[]}
                      title="Quy mô công ty"
                      showRequired={true}
                      placeholder="Chọn quy mô công ty"
                    />
                    <SelectCustom
                      name="employeeSize"
                      control={control}
                      options={[]}
                      title="Quy mô công ty"
                      showRequired={true}
                      placeholder="Chọn quy mô công ty"
                    />
                    <SelectCustom
                      name="employeeSize"
                      control={control}
                      options={[]}
                      title="Quy mô công ty"
                      showRequired={true}
                      placeholder="Chọn quy mô công ty"
                    />
                    <SelectCustom
                      name="employeeSize"
                      control={control}
                      options={[]}
                      title="Quy mô công ty"
                      showRequired={true}
                      placeholder="Chọn quy mô công ty"
                    />
                    <SelectCustom
                      name="employeeSize"
                      control={control}
                      options={[]}
                      title="Quy mô công ty"
                      showRequired={true}
                      placeholder="Chọn quy mô công ty"
                    />
                  </VStack>
                </ScrollView>
              ) : (
                <Center mt="5">
                  <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
                </Center>
              )}
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <ButtonCustom
                size="small"
                text="Làm mới"
                textColor="myJobCustomColors.darkIndigo"
                bgColor="myJobCustomColors.moonrakerPurplyBlue"
                onPress={() => setOpenPopup(false)}
              />
              <ButtonCustom
                size="small"
                text="Áp dụng"
                textColor="myJobCustomColors.white"
                bgColor="myJobCustomColors.darkIndigo"
                onPress={() => {
                  setOpenPopup(false);
                  handleSubmit(handleFilter);
                }}
              />
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default FilterJobPostForm;
