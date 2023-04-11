import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity} from 'react-native';
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

import SelectCustom from '../../../../components/formControls/SelectCustom/SelectCustom';
import ButtonCustom from '../../../../components/ButtonCustom/ButtonCustom';

import {searchJobPost} from '../../../../redux/filterSlice';

const FilterJobPostForm = () => {
  const dispatch = useDispatch();
  const {allConfig} = useSelector(state => state.config);
  const {jobPostFilter} = useSelector(state => state.filter);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isRendered, setIsRendered] = React.useState(false);
  const handleLayout = () => {
    setIsRendered(true);
  };
  const {control, handleSubmit, reset} = useForm();

  React.useEffect(() => {
    reset(formValues => ({
      ...formValues,
      ...jobPostFilter,
    }));
  }, [jobPostFilter, reset]);

  const handleFilter = data => {
    console.log(data);
    dispatch(searchJobPost(data));
    setOpenPopup(false);
  };

  return (
    <>
      <View
        style={{
          height: 40,
          width: 40,
          backgroundColor: '#130160',
          borderRadius: 10,
          padding: 8,
        }}>
        <TouchableOpacity onPress={() => setOpenPopup(true)}>
          <Image
            source={require('../../../../assets/images/icons/filter-icon.png')}
            resizeMode="contain"
            alt=""
            style={{width: '100%', height: '100%'}}
          />
        </TouchableOpacity>
      </View>
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
                      name="careerId"
                      control={control}
                      options={allConfig?.careerOptions || []}
                      title="Ngành nghề"
                      placeholder="Chọn ngành nghề"
                    />
                    <SelectCustom
                      name="cityId"
                      control={control}
                      options={allConfig?.cityOptions || []}
                      title="Tỉnh thành"
                      placeholder="Chọn tỉnh thành"
                    />
                    <SelectCustom
                      name="positionId"
                      control={control}
                      options={allConfig?.positionOptions || []}
                      title="Vị trí làm việc"
                      placeholder="Chọn vị trí làm việc"
                    />
                    <SelectCustom
                      name="experienceId"
                      control={control}
                      options={allConfig?.experienceOptions || []}
                      title="Kinh nghiệm"
                      placeholder="Chọn kinh nghiệm"
                    />
                    <SelectCustom
                      name="jobTypeId"
                      control={control}
                      options={allConfig?.jobTypeOptions || []}
                      title="Hình thức làm việc"
                      placeholder="Chọn hình thức làm việc"
                    />
                    <SelectCustom
                      name="typeOfWorkplaceId"
                      control={control}
                      options={allConfig?.typeOfWorkplaceOptions || []}
                      title="Nơi làm việc"
                      placeholder="Chọn nơi làm việc"
                    />
                    <SelectCustom
                      name="genderId"
                      control={control}
                      options={allConfig?.genderOptions || []}
                      title="Giới tính"
                      placeholder="Chọn giới tính"
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
                onPress={handleSubmit(handleFilter)}
              />
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default FilterJobPostForm;
