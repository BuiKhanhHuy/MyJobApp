import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import configReducer from './configSlice';

const rootReducer = {
  user: userReducer,
  config: configReducer,
};

export default configureStore({
  reducer: rootReducer,
});
