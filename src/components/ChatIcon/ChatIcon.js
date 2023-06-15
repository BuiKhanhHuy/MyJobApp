import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import firestore from '@react-native-firebase/firestore';

const ChatIcon = ({color, bg}) => {
  const navigation = useNavigation();
  const {currentUser} = useSelector(state => state.user);
  const [showBubble, setShowBubble] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = firestore()
      .collection('chatRooms')
      .where('recipientId', '==', `${currentUser.id}`)
      .where('unreadCount', '>', 0)
      .onSnapshot(querySnapshot => {
        if (!querySnapshot.empty) {
          setShowBubble(querySnapshot.size > 0);
        } else {
          setShowBubble(false);
        }
      });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <IconButton
      onPress={() => navigation.navigate('ChatRoomsScreen')}
      borderRadius="full"
      _pressed={{
        bg: bg,
      }}
      icon={
        <>
          {showBubble && (
            <Octicons
              key={1}
              style={{position: 'absolute', top: 10, right: 10, zIndex: 1}}
              size={15}
              name="dot-fill"
              color="#E5252A"
            />
          )}
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
