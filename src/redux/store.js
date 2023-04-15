import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import configReducer from './configSlice';
import filterReducer from './filterSlice';
import reloadSlice from './reloadSlice';

const rootReducer = {
  user: userReducer,
  config: configReducer,
  filter: filterReducer,
  reload: reloadSlice,
};

export default configureStore({
  reducer: rootReducer,
});
