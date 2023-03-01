import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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

const removeUserInfo = createAsyncThunk(
  'user/removeUserInfo',
  async (_, thunkAPI) => {
    try {
      await tokenService.removeLocalAccessTokenAndRefreshToken('MyJob');
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

    builder.addCase(removeUserInfo.fulfilled, state => {
      state.isAuthenticated = false;
      state.currentUser = null;
    });
  },
});

const {actions, reducer} = userSlice;

export default reducer;
export {getUserInfo, removeUserInfo};
