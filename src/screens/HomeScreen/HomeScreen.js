import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  FontFamily,
  FontSize,
  Color,
  Padding,
  Border,
} from '../../constants/globalStyles';
import JobTypePopulars from '../../components/JobTypePopulars/JobTypePopulars';
import {RecentJobPosts} from '../../components/JobPosts';

const HomeScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1}}>
          <View>
            <Text style={styles.welcomeTitle}>Xin chào,</Text>
          </View>
          <View>
            <Text style={styles.welcomeTitle}>Bùi Khánh Huy</Text>
          </View>
        </View>
        <View>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://snack-web-player.s3.us-west-1.amazonaws.com/v2/46/static/media/react-native-logo.79778b9e.png',
            }}
          />
        </View>
      </View>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={true} colors={[Color.primary]} />
        }>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.banner}>
            <Image
              style={{width: '100%', height: 200}}
              source={{
                uri: 'https://res.cloudinary.com/dtnpj540t/image/upload/v1676043960/tam_anh_myjob/a2we0s9as6hzkybn1tn5.png',
              }}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.category}>
            <View style={{paddingBottom: Padding.p_6md}}>
              <Text
                style={{
                  fontFamily: FontFamily.dMSansBold,
                  fontSize: FontSize.size_6sm,
                  lineHeight: 21,
                  color: Color.black,
                }}>
                Tìm kiếm công việc của bạn
              </Text>
            </View>
            {/* Start: Job type poplulars */}
            <JobTypePopulars />
            {/* End: Job type poplulars */}
          </View>
          <View style={styles.jobList}>
            <View style={{paddingBottom: Padding.p_6sm}}>
              <Text
                style={{
                  fontFamily: FontFamily.dMSansBold,
                  fontSize: FontSize.size_6sm,
                  lineHeight: 21,
                  color: Color.black,
                }}>
                Danh sách công việc gần đây
              </Text>
            </View>
            {/* Start: Job list */}
            <RecentJobPosts />
            {/* End: Job list */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Padding.p_10sm,
    paddingTop: Padding.p_10sm,
  },
  welcomeTitle: {
    fontFamily: FontFamily.dMSansBold,
    color: Color.midnightblue_200,
    fontSize: FontSize.size_2md,
    lineHeight: 27,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: Padding.p_5xs,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: Border.br_10xl,
  },
  banner: {
    paddingBottom: Padding.p_4md,
  },
  scrollViewContainer: {
    height: '100%',
  },
  category: {
    flex: 8,
  },
  jobList: {flex: 4},
});

export default HomeScreen;
