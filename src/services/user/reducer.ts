import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TUserAuth } from '@/utils/types';

export type TInitState = {
  user: TUserAuth | null;
  isAuthChecked: boolean;
};

const initialState: TInitState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUserAuth>) {
      state.user = action.payload;
    },
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    },
  },
});

export const { setUser, setAuthChecked } = userSlice.actions;

export default userSlice.reducer;
