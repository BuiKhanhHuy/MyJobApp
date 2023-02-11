import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const BookmarkStack = createNativeStackNavigator();
const BookmarkRouter = () => {
  return (
    <BookmarkStack.Navigator>
      <BookmarkStack.Screen name="" component={''} />
      <BookmarkStack.Screen name="" component={''} />
    </BookmarkStack.Navigator>
  );
};

export default BookmarkRouter;
