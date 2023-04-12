import React from 'react';
import {Text, VStack, View, Avatar, Button, Skeleton} from 'native-base';

const Company = ({
  id,
  companyName,
  companyImageUrl,
  followNumber,
  jobPostNumber,
  isFollowed,
}) => {
  return (
    <View
      key={id}
      alignItems="center"
      flexDirection="column"
      bg="myJobCustomColors.white"
      height="250"
      width="100%"
      py="5"
      px="4"
      borderRadius="2xl">
      <VStack justifyContent="space-between">
        <VStack alignItems="center" space={1} flex={1}>
          <View>
            <Avatar
              bg="green.500"
              source={{
                uri: companyImageUrl,
              }}>
              LOGC
            </Avatar>
          </View>
          <Text
            textAlign="center"
            fontFamily="DMSans-Bold"
            fontSize={15}
            color="myJobCustomColors.purpleBlue">
            {companyName}
          </Text>
          <Text fontFamily="DMSans-Regular" fontSize={14} color="#AAA6B9">
            {followNumber} lượt theo dõi
          </Text>
          <Text fontFamily="DMSans-Regular" fontSize={14} color="#AAA6B9">
            {jobPostNumber} việc làm
          </Text>
        </VStack>
        <Button
          borderRadius="3xl"
          borderWidth="0.5"
          variant="outline"
          borderColor="myJobCustomColors.blueLotus"
          size="sm">
          <Text
            fontFamily="DMSans-Regular"
            fontSize={12}
            color="myJobCustomColors.purpleBlue">
            Theo dõi
          </Text>
        </Button>
      </VStack>
    </View>
  );
};

const Loading = () => (
  <View
    alignItems="center"
    flexDirection="column"
    bg="myJobCustomColors.white"
    height="250"
    width="100%"
    py="5"
    px="4"
    borderRadius="2xl">
    <VStack justifyContent="space-between">
      <VStack alignItems="center" space={3} flex={1}>
        <View>
          <Skeleton rounded="full" w={20} h={20} />
        </View>

        <Skeleton rounded="md" h="10" width="100%" />

        <Skeleton rounded="md" h="5" width="100%" />

        <Skeleton rounded="md" h="5" width="100%" />
      </VStack>
      <Skeleton rounded="md" h="8" width="100%" />
    </VStack>
  </View>
);

Company.Loading = Loading;

export default Company;
