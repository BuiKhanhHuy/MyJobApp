import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

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
  },
);

const removeUserInfo = createAsyncThunk(
  'user/removeUserInfo',
  async (_, thunkAPI) => {
    try {
      const accessToken = await tokenService.getLocalAccessToken(APP_NAME);
      if (!accessToken) {
        return Promise.reject('Not found access token!');
      }

      // neu co dang nhap google
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        console.log('LOGOUT GOOGLE.');
        await GoogleSignin.signOut();
      }

      // neu co dang nhap facebook
      const isLoggedIn = (await AccessToken.getCurrentAccessToken()) !== null;
      if (isLoggedIn) {
        console.log('LOGOUT FB.');
        LoginManager.logOut();
      }

      await authService.revokToken(accessToken);

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

const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (formData, thunkAPI) => {
    try {
      const resData = await authService.updateAvatar(formData);

      return resData.data;
    } catch (error) {
      throw error;
    }
  },
);

const deleteAvatar = createAsyncThunk(
  'user/deleteAvatar',
  async (_, thunkAPI) => {
    try {
      const resData = await authService.deleteAvatar();

      return resData.data;
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

    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        avatarUrl: action.payload?.avatarUrl || null,
      };
    });

    builder.addCase(deleteAvatar.fulfilled, (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        avatarUrl: action.payload?.avatarUrl || null,
      };
    });
  },
});

const {actions, reducer} = userSlice;

export default reducer;
export {
  getUserInfo,
  updateUserInfo,
  removeUserInfo,
  updateAvatar,
  deleteAvatar,
};
