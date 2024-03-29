import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {HStack, ScrollView, Skeleton, Text, View} from 'native-base';

import commonService from '../../../services/commonService';
import {TouchableNativeFeedback} from 'react-native';
import { searchJobPost } from '../../../redux/filterSlice';

const Loading = (
  <HStack space={2}>
    {Array.from(Array(5).keys()).map(value => (
      <Skeleton key={value} h="10" w="20" rounded="lg" />
    ))}
  </HStack>
);

const TopCareerCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(true);
  const {jobPostFilter} = useSelector(state => state.filter);
  const [careers, setCareers] = React.useState([]);


  React.useEffect(() => {
    const getTopCareers = async () => {
      setIsLoading(true);
      try {
        const resData = await commonService.getTop10Careers();

        setCareers(resData.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getTopCareers();
  }, []);

  const handleClick = id => {
    dispatch(
      searchJobPost({
        ...jobPostFilter,
        careerId: id,
      }),
    );
    
    navigation.navigate('MainJobPostScreen');
  };

  return (
    <ScrollView
      style={{flexDirection: 'row'}}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {isLoading
        ? Loading
        : careers.map(value => (
            <TouchableNativeFeedback key={value.id} onPress={() => handleClick(value.id)}>
              <View
                style={{
                  height: 40,
                  backgroundColor: '#cbc9d4',
                  borderRadius: 10,
                  padding: 13,
                  marginRight: 15,
                }}>
                <Text
                  style={{
                    lineHeight: 16,
                    fontSize: 12,
                    fontFamily: 'DMSans-Medium',
                    color: '#524b6b',
                  }}>
                  {value.name}
                </Text>
              </View>
            </TouchableNativeFeedback>
          ))}
    </ScrollView>
  );
};

export default React.memo(TopCareerCard);
