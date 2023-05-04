import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {
  Center,
  FlatList,
  Icon,
  IconButton,
  Spinner,
  Text,
  View,
} from 'native-base';
import {firebase} from '@react-native-firebase/database';
import database from '@react-native-firebase/database';

import {useLayout} from '../../hooks';
import NoData from '../../components/NoData/NoData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const pageSize = 12;
const NotificationScreen = () => {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const [layout, isLayoutLoading, handleLayout] = useLayout();
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const reference = firebase
      .app()
      .database('https://myjobpro-6283b-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('/users/123');
  }, []);

  return (
    <>
      <View onLayout={handleLayout} style={{marginTop: headerHeight}}>
        {isLayoutLoading ? (
          <Center mt="5">
            <Spinner size="lg" color="myJobCustomColors.deepSaffron" />
          </Center>
        ) : (
          <View>
            {isLoading ? (
              <Text>Loading</Text>
            ) : [].length === 0 ? (
              <Center marginTop={50}>
                <NoData title="Không có thông báo nào" imgSize="3xs" />
              </Center>
            ) : (
              <FlatList
                data={[]}
                renderItem={({item}) => (
                  <Center paddingX="6" paddingY="2" key={item.id}>
                    {/* Start: Notification */}

                    {/* End: Notification */}
                  </Center>
                )}
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
                onEndReachedThreshold={0}
                getItemLayout={(data, index) => {
                  const itemHeight = 120; // Chiều cao của mỗi mục trong danh sách
                  const offset = itemHeight * index; // Vị trí của mục trong danh sách
                  return {length: itemHeight, offset, index};
                }}
              />
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default NotificationScreen;
