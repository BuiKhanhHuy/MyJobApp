import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    fullName: '',
    email: '',
  },
  reducers: {
    update: (state, action) => {
      state.value += action.payload;
    },
  },
});

const {actions, reducer} = userSlice;

export const {update} = actions;
export default reducer;
