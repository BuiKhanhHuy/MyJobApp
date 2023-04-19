import React from 'react';
import {useSelector} from 'react-redux';
import {View, useTheme} from 'native-base';
import {StyleSheet} from 'react-native';

import JobTypePopular from '../JobTypePopular';
import jobService from '../../services/jobService';

const JobTypePopulars = () => {
  const {colors} = useTheme();
  const {allConfig} = useSelector(state => state.config);
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
          customData.push({
            name: allConfig?.typeOfWorkplaceDict[id],
            total:
              data.filter(value => value.typeOfWorkplace == id).length > 0
                ? data[0].total
                : 0,
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

  return (
    <View style={styles.container} shadow={'myJobCustomShadows.0'}>
      <View style={{flex: 1, marginRight: 10}}>
        {isLoading || data.length <= 0 ? (
          <JobTypePopular.Loading />
        ) : (
          <JobTypePopular
            imageUrl={require('../../assets/images/job-type-popular-icon.png')}
            title={data[0].total}
            subTitle={data[0].name}
            bgColor={colors.myJobCustomColors.frenchPass}
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
              title={data[1].total}
              subTitle={data[1].name}
              bgColor={colors.myJobCustomColors.paleViolet}
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
              title={data[2].total}
              subTitle={data[2].name}
              bgColor={colors.myJobCustomColors.lightApricot}
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
