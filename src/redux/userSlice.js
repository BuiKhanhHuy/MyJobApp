import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {APP_NAME} from '../configs/constants';
import authService from '../services/authService';
import tokenService from '../services/tokenService';

const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_, thunkAPI) => {
    try {
      const resData = await authService.getUserInfo();

      return resData.data;
    } catch (error) {
      throw error;
    }
  },
);

const updateUserInfo = createAsyncThunk(
  'user/updateUser',
  async (data, thunkAPI) => {
    try {
      const resData = await authService.updateUser(data);

      return resData.data;
    } catch (error) {
      throw error;
    }
  }
);

const removeUserInfo = createAsyncThunk(
  'user/removeUserInfo',
  async (accessToken, thunkAPI) => {
    try {
      // await authService.revokToken(accessToken);

      const removeResult =
        await tokenService.removeLocalAccessTokenAndRefreshToken(APP_NAME);

      if (!removeResult) {
        return Promise.reject("Can't remove token in Cookie");
      }
    } catch (error) {
      throw error;
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    currentUser: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    });

    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    });

    builder.addCase(removeUserInfo.fulfilled, state => {
      state.isAuthenticated = false;
      state.currentUser = null;
    });
  },
});

const {actions, reducer} = userSlice;

export default reducer;
export {getUserInfo, updateUserInfo, removeUserInfo};
