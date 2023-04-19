import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import configReducer from './configSlice';
import filterReducer from './filterSlice';
import reloadSlice from './reloadSlice';
import profileReducer from './profileSlice';

const rootReducer = {
  user: userReducer,
  config: configReducer,
  filter: filterReducer,
  reload: reloadSlice,
  profile: profileReducer,
};

export default configureStore({
  reducer: rootReducer,
});
