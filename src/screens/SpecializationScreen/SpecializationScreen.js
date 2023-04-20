import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import {
  View,
  Icon,
  Input,
  Skeleton,
  FlatList,
  Center,
  Spinner,
  Pressable,
} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useLayout} from '../../hooks';
import BackdropLoading from '../../components/loadings/BackdropLoading/BackdropLoading';
import commonService from '../../services/commonService';
import {searchJobPost} from '../../redux/filterSlice';

const Loading = key => (
  <View
    key={key}
    style={{
      width: '45%',
      height: 210,
      padding: 25,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'space-around',
      marginHorizontal: 10,
      marginBottom: 15,
    }}>
    <View>
      <Skeleton w={16} height={16} rounded={'full'} />
    </View>
    <Skeleton h={5} rounded="md" />
    <Skeleton h={3} rounded="md" />
  </View>
);

const CategoryItem = ({value}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {jobPostFilter} = useSelector(state => state.filter);

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
    <TouchableNativeFeedback onPress={() => handleClick(value.id)}>
      <View shadow={'myJobCustomShadows.0'} key={value.id} style={styles.box}>
        <View>
          <View style={styles.icon}>
            <FontAwesome5
              name="hand-holding-heart"
              style={{
                fontSize: 25,
                color: '#ff9228',
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.titleText}>{value.name}</Text>
        </View>
        <View>
          <Text style={styles.subTitleText}>
            {value?.jobPostTotal || 0} việc làm
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const pageSize = 20;

const SpecializationScreen = () => {
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(true);
  const [kw, setKw] = React.useState('');
  const [careers, setCareers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  const getAllCareers = async (params, type = 'LOAD') => {
    setIsLoading(true);
    try {
      const resData = await commonService.getAllCareers(params);

      setCount(resData.count);
      switch (type) {
        case 'LOAD':
          setCareers([...careers, ...resData.results]);
          break;
        case 'SUBMIT':
          setCareers(resData.results);
          break;
        default:
          setCareers([...careers, ...resData.results]);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
      setIsLoadMoreLoading(false);
    }
  };

  React.useEffect(() => {
    getAllCareers(
      {
        page: page,
        pageSize: pageSize,
        kw: kw,
      },
      'LOAD',
    );
  }, [page]);

  const handleSubmit = () => {
    getAllCareers(
      {
        page: 1,
        pageSize: pageSize,
        kw: kw,
      },
      'SUBMIT',
    );
  };

  const handleLoadMore = () => {
    if (Math.ceil(count / pageSize) > page) {
      setIsLoadMoreLoading(true);
      setPage(page + 1);
    }
  };

  return (
    <View onLayout={handleLayout} style={[styles.container]}>
      {isLayoutLoading ? (
        <BackdropLoading />
      ) : (
        <>
          <View style={styles.header}>
            <View style={{flex: 9}}>
              <Input
                value={kw}
                onChangeText={value => setKw(value)}
                backgroundColor="myJobCustomColors.white"
                borderRadius="md"
                borderWidth="0"
                padding="2"
                InputLeftElement={
                  <Icon
                    as={<Fontisto name="search" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                InputRightElement={
                  <Pressable
                    disabled={kw === '' ? true : false}
                    onPress={() => setKw('')}>
                    <Icon
                      as={<MaterialIcons name="clear" />}
                      size={5}
                      mr="2"
                      color={kw === '' ? 'muted.400' : 'muted.800'}
                    />
                  </Pressable>
                }
                fontFamily="dMSansRegular"
                fontSize="xs"
                color="myJobCustomColors.darkIndigo"
                placeholder="Từ khóa tìm kiếm"
              />
            </View>
            <View style={{flex: 1.5, alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={handleSubmit}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: '#ff9228',
                    borderRadius: 10,
                    padding: 8,
                  }}>
                  <Icon
                    as={<Fontisto name="search" />}
                    color="myJobCustomColors.white"
                    ml={0.5}
                    size={5}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.specialization}>
            <View>
              <Text
                style={{
                  lineHeight: 21,
                  fontSize: 16,
                  fontFamily: 'DMSans-Bold',
                  color: '#150a33',
                }}>
                Tất cả ngành nghề
              </Text>
            </View>
            <View style={{height: '100%', paddingTop: 20}}>
              <View style={[styles.categories, {rowGap: 15, columnGap: 15}]}>
                {isLoading ? (
                  <FlatList
                    numColumns={2}
                    data={Array.from(Array(8).keys())}
                    renderItem={({item}) => Loading(item)}
                  />
                ) : (
                  <FlatList
                    numColumns={2}
                    data={careers}
                    renderItem={({item}) => <CategoryItem value={item} />}
                    keyExtractor={item => item.id}
                    ListFooterComponent={
                      isLoadMoreLoading ? (
                        <Center my="3">
                          <Spinner
                            size="lg"
                            color="myJobCustomColors.deepSaffron"
                          />
                        </Center>
                      ) : null
                    }
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.7}
                  />
                )}
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    padding: 20,
  },
  back: {
    flex: 1,
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  specialization: {
    flex: 15,
  },
  categories: {
    flex: 1,
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  box: {
    width: '45%',
    height: 210,
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 5,
    shadowOffset: {width: 0, height: 4},
    shadowColor: '#99ABC6',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    width: 80,
    height: 80,
    padding: 17,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f3',
    borderRadius: 50,
  },
  titleText: {
    fontFamily: 'DMSans-Bold',
    lineHeight: 18,
    fontSize: 14,
    color: '#150b3d',
    textAlign: 'center',
  },
  subTitleText: {
    fontFamily: 'DMSans-Medium',
    lineHeight: 16,
    fontSize: 12,
    color: '#aaa6b9',
  },
});

export default SpecializationScreen;
