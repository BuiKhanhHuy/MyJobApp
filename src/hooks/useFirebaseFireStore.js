import React from 'react';
import firestore from '@react-native-firebase/firestore';

const useFirebaseFireStore = (collectionName, condition, sort = 'desc') => {
  const [docs, setDocs] = React.useState([]);

  React.useEffect(() => {
    let subscriber = firestore().collection(`${collectionName}`);

    if (condition) {
      if (!condition.compareValue) {
        setDocs([]);
        return;
      }
      subscriber = subscriber.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue,
      );
    }

    subscriber = subscriber.orderBy('createdAt', sort).onSnapshot(snapshot => {
      const documents = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocs(documents);
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [collectionName, condition, sort]);

  return docs;
};

export default useFirebaseFireStore;
