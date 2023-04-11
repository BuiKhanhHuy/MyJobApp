import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import configReducer from './configSlice';
import filterReducer from './filterSlice';

const rootReducer = {
  user: userReducer,
  config: configReducer,
  filter: filterReducer
};

export default configureStore({
  reducer: rootReducer,
});
