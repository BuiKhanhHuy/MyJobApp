import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  AlertDialog,
  Button,
  Center,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';

import {useLayout} from '../../../../hooks';
import toastMessages from '../../../../utils/toastMessages';
import BackdropLoading from '../../../../components/loadings/BackdropLoading';
import RatingCustom from '../../../../components/formControls/RatingCustom';
import TextAreaCustom from '../../../../components/TextAreaCustom';
import SettingOptionCard from '../../../../components/SettingOptionCard';
import myjobService from '../../../../services/myjobService';

const FeedbackCard = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef(null);
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const schema = yup.object().shape({
    rating: yup.number().required('Đánh giá là bắt buộc.'),
    content: yup
      .string()
      .required('Nội dung đánh giá là bắt buộc.')
      .max(500, 'Nội dung đánh giá vượt quá độ dài cho phép.'),
  });

  const {control, reset, handleSubmit} = useForm({
    defaultValues: {
      rating: 5,
      content: '',
    },
    resolver: yupResolver(schema),
  });
  const onClose = () => setIsOpen(false);

  const handleSendFeedback = data => {
    const sendFeedback = async data => {
      setIsFullScreenLoading(true);

      try {
        await myjobService.createFeedback(data);

        onClose();
        reset();

        toastMessages.success('Gửi phản hồi thành công.');
      } catch (error) {
        toastMessages.error();
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    sendFeedback(data);
  };

  return (
    <>
      {isFullScreenLoading && <BackdropLoading />}
      <View>
        <View>
          <SettingOptionCard
            leftIconName="thumbs-up-outline"
            rightIconName="chevron-forward"
            title="Phản hồi"
            onPress={() => setIsOpen(!isOpen)}
          />
        </View>
        <AlertDialog
          size="xl"
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}>
          <AlertDialog.Content onLayout={handleLayout}>
            {isLayoutLoading ? (
              <Center my="1/4">
                <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
              </Center>
            ) : (
              <>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>
                  <Text fontFamily="dMSansBold">Gửi phản hồi về MyJob</Text>
                </AlertDialog.Header>
                <AlertDialog.Body backgroundColor="myJobCustomColors.mercury">
                  <View mb={2}>
                    <Text
                      color="myJobCustomColors.mulledWine"
                      fontFamily="dMSansRegular">
                      Trải nghiệm của bạn với ứng dụng của chúng tôi cho đến nay
                      như thế nào?
                    </Text>
                  </View>
                  <VStack space={4} justifyContent="center">
                    <RatingCustom name="rating" control={control} />
                    <TextAreaCustom
                      name="content"
                      placeholder="Nhập nội dung đánh giá tại đây"
                      control={control}
                    />
                  </VStack>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button.Group space={2}>
                    <Button
                      onPress={handleSubmit(handleSendFeedback)}
                      rounded="lg"
                      bgColor="myJobCustomColors.darkIndigo"
                      fontFamily="DMSans-Bold">
                      Gửi đi
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </>
            )}
          </AlertDialog.Content>
        </AlertDialog>
      </View>
    </>
  );
};

export default FeedbackCard;
