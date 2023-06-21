import firestore from '@react-native-firebase/firestore';

export const addDocument = async (collectionName, data) => {
  const docRef = await firestore()
    .collection(`${collectionName}`)
    .add({
      ...data,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });

  console.log('Document written with ID: ', docRef.id);
  return docRef.id;
};

export const updateChatRoomByPartnerId = (partnerId, chatRoomId) => {
  firestore()
    .collection('chatRooms')
    .doc(`${chatRoomId}`)
    .update({
      recipientId: `${partnerId}`,
      unreadCount: firestore.FieldValue.increment(1),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log('update chatRoom success');
    })
    .catch(error => {
      console.log('update chatRoom failed: ', error);
    });
};

export const checkExists = async (collectionName, docId) => {
  const user = await firestore()
    .collection(`${collectionName}`)
    .doc(`${docId}`)
    .get();

  return user.exists;
};

export const createUser = async (collectionName, userData, userId) => {
  try {
    await firestore()
      .collection(`${collectionName}`)
      .doc(`${userId}`)
      .set(userData);

    return true;
  } catch (error) {
    return false;
  }
};

export const getChatRoomById = async (chatRoomId, currentUserId) => {
  const docSnap = await firestore()
    .collection('chatRooms')
    .doc(`${chatRoomId}`)
    .get();

  if (docSnap.exists) {
    let partnerId = '';
    const chatRoomData = docSnap.data();

    if (chatRoomData?.members[0] === `${currentUserId}`) {
      partnerId = chatRoomData?.members[1];
    } else {
      partnerId = chatRoomData?.members[0];
    }

    const userAccount = await getUserAccount('accounts', `${partnerId}`);
    return {
      ...chatRoomData,
      id: docSnap.id,
      user: userAccount,
    };
  } else {
    return {};
  }
};

export const getUserAccount = async (collectionName, userId) => {
  const user = await firestore()
    .collection(`${collectionName}`)
    .doc(`${userId}`)
    .get();

  if (user.exists) {
    return user.data();
  } else {
    return null;
  }
};

export const checkChatRoomExists = async (collectionName, member1, member2) => {
  const querySnapshot = await firestore()
    .collection(collectionName)
    .where('membersString', 'array-contains', `${member1}-${member2}`)
    .get();

  if (!querySnapshot.empty) {
    const roomId = querySnapshot.docs[0].id;
    return roomId;
  } else {
    console.log('Room does not exist');
    return null;
  }
};

// tao keywords cho displayName, su dung cho search
export const generateKeywords = displayName => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(' ').filter(word => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = name => {
    const arrName = [];
    let curName = '';
    name.split('').forEach(letter => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
