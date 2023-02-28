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
    isLoading: true,
    isAuthenticated: false,
    currentUser: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserInfo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    });
    builder.addCase(getUserInfo.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(removeUserInfo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(removeUserInfo.fulfilled, state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.currentUser = null;
    });
    builder.addCase(removeUserInfo.rejected, state => {
      state.isLoading = false;
    });
  },
});

const {actions, reducer} = userSlice;

export default reducer;
export {getUserInfo, removeUserInfo};
