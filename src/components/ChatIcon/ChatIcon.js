import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

const ChatIcon = ({color, bg}) => {
  const navigation = useNavigation();

  return (
    <IconButton
      onPress={() => navigation.navigate('ChatRoomsScreen')}
      borderRadius="full"
      _pressed={{
        bg: bg,
      }}
      icon={
        <>
          {/* <Octicons
            key={1}
            style={{position: 'absolute', top: 10, right: 10, zIndex: 1}}
            size={15}
            name="dot-fill"
            color="#E5252A"
          /> */}
          <Ionicons
            key={2}
            name="chatbubble-ellipses-outline"
            color={color}
            size={26}
          />
        </>
      }
    />
  );
};

export default ChatIcon;
