import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, useTheme} from 'native-base';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import JobTypePopular from '../JobTypePopular';
import jobService from '../../services/jobService';
import {searchJobPost} from '../../redux/filterSlice';

const JobTypePopulars = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {allConfig} = useSelector(state => state.config);
  const {jobPostFilter} = useSelector(state => state.filter);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getTotalJob = async () => {
      setIsLoading(true);

      try {
        const resData = await jobService.getTotalJobPostByJobType();
        const data = resData.data;

        const customData = [];
        for (let id in allConfig?.typeOfWorkplaceDict) {
          let objs = data.filter(value => value.typeOfWorkplace == id);
          customData.push({
            id: id,
            name: allConfig?.typeOfWorkplaceDict[id],
            total: objs.length > 0 ? objs[0].total : 0,
          });
        }
        setData(customData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getTotalJob();
  }, []);

  const handleClick = typeOfWorkplaceId => {
    dispatch(
      searchJobPost({
        ...jobPostFilter,
        typeOfWorkplaceId: typeOfWorkplaceId,
      }),
    );

    navigation.navigate('MainJobPostScreen');
  };

  return (
    <View style={styles.container} shadow={'myJobCustomShadows.0'}>
      <View style={{flex: 1, marginRight: 10}}>
        {isLoading || data.length <= 0 ? (
          <JobTypePopular.Loading />
        ) : (
          <JobTypePopular
            imageUrl={require('../../assets/images/job-type-popular-icon.png')}
            id={data[0].id}
            title={data[0].total}
            subTitle={data[0].name}
            bgColor={'myJobCustomColors.frenchPass'}
            handleClick={handleClick}
          />
        )}
      </View>
      <View style={{flex: 1, marginLeft: 10, flexDirection: 'column'}}>
        <View
          style={{
            flex: 1,
            marginBottom: 10,
          }}>
          {isLoading || data.length <= 1 ? (
            <JobTypePopular.Loading />
          ) : (
            <JobTypePopular
              id={data[1].id}
              title={data[1].total}
              subTitle={data[1].name}
              bgColor={'myJobCustomColors.paleViolet'}
              handleClick={handleClick}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 10,
          }}>
          {isLoading || data.length <= 2 ? (
            <JobTypePopular.Loading />
          ) : (
            <JobTypePopular
              id={data[2].id}
              title={data[2].total}
              subTitle={data[2].name}
              bgColor={'myJobCustomColors.lightApricot'}
              handleClick={handleClick}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 170,
  },
});

export default JobTypePopulars;
