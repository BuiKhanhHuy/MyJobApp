import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {getUserAccount} from '../services/firebaseService';

const useFireStoreGetChatRoom = (
  condition,
  userId,
  sort = 'desc',
  limitNum = 50,
) => {
  const [docs, setDocs] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = firestore()
      .collection('chatRooms')
      .where(condition.fieldName, condition.operator, condition.compareValue)
      .orderBy('createdAt', sort)
      .limit(limitNum)
      .onSnapshot(async querySnapshot => {
        let chatRoomsData = [];

        const promises = querySnapshot.docs.map(async doc => {
          try {
            let partnerId = '';
            const chatRoomData = doc.data();

            if (chatRoomData?.userId1 === `${userId}`) {
              partnerId = chatRoomData?.userId2;
            } else {
              partnerId = chatRoomData?.userId1;
            }

            const userAccount = await getUserAccount(
              'accounts',
              `${partnerId}`,
            );

            chatRoomsData.push({
              ...chatRoomData,
              id: doc.id,
              user: userAccount,
            });
          } catch (error) {
            console.error(error);
          }
        });

        await Promise.all(promises);
        setDocs(chatRoomsData);
      });

    return unsubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, sort]);

  return docs;
};

export default useFireStoreGetChatRoom;
