import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';

const rootReducer = {
  user: userReducer,
};

export default configureStore({
  reducer: rootReducer,
});
