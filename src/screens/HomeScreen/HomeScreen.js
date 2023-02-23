import * as React from 'react';
import {Avatar, Fab, Icon, ScrollView, Text, View} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import JobTypePopulars from '../../components/JobTypePopulars/JobTypePopulars';
import {RecentJobPosts} from '../../components/JobPosts';

const HomeScreen = ({navigation}) => {
  return (
    <>
      <View padding="6" flexDirection="column">
        <View
          flexDirection="row"
          justifyContent="space-between"
          paddingBottom={2}>
          <View>
            <Text
              fontFamily="dMSansBold"
              fontSize="2xl"
              lineHeight="sm"
              color="myJobCustomColors.purpleBlue">
              Hello,
            </Text>
            <Text
              fontFamily="dMSansBold"
              fontSize="2xl"
              lineHeight="sm"
              color="myJobCustomColors.purpleBlue">
              Bùi Khánh Huy
            </Text>
          </View>
          <View>
            <Avatar
              bg="green.500"
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}>
              KH
            </Avatar>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View height="48" marginTop={4} backgroundColor={'blue.100'}></View>
            <View height="56" marginTop={6}>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="md"
                  lineHeight="sm"
                  color="myJobCustomColors.haitiBluePurple">
                  Find Your Job
                </Text>
              </View>
              <View height="100%" paddingTop={4}>
                <JobTypePopulars />
              </View>
            </View>
            <View marginTop={10}>
              <View>
                <Text
                  fontFamily="DMSans-Bold"
                  fontSize="md"
                  lineHeight="sm"
                  color="myJobCustomColors.haitiBluePurple">
                  Recent Job List
                </Text>
              </View>
              <View paddingTop={4}>
                <RecentJobPosts />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Fab
        renderInPortal={false}
        size="md"
        backgroundColor="myJobCustomColors.neonCarrot"
        shadow={6}
        padding={3}
        right={5}
        bottom={24}
        icon={
          <Icon
            color="white"
            as={MaterialCommunityIcons}
            name="map-marker-radius"
            size="xl"
          />
        }
        onPress={() => navigation.navigate('MapScreen')}
      />
    </>
  );
};

export default HomeScreen;
