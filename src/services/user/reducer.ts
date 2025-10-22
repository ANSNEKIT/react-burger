import { getErrorText } from '@/utils/getErrorText';
import { createSlice } from '@reduxjs/toolkit';

import { login, logout, register } from './actions';

import type { TUserAuth } from '@/types/types';
import type { Action, SerializedError, PayloadAction } from '@reduxjs/toolkit';

export type TUserState = {
  user: TUserAuth | null;
  isAuthChecked: boolean;
  isEmailConfirmed: boolean;
  isLoading: boolean;
  error: string | null;
};

export type TPayloadAction<T> = {
  payload: T;
  type: string;
  error?: SerializedError;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isEmailConfirmed: false,
  isLoading: false,
  error: null,
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
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(
        (action: Action) =>
          action.type.startsWith('user/') && action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action: Action) =>
          action.type.startsWith('user/') && action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action: Action): action is PayloadAction<string> =>
          action.type.startsWith('user/') && action.type.endsWith('/rejected'),
        (state, action: TPayloadAction<string | undefined>) => {
          const err = action?.error
            ? getErrorText(action?.error)
            : 'unknown action error';
          state.isLoading = false;
          state.user = null;
          state.error = err;
        }
      );
  },
});

export const { setUser, setAuthChecked } = userSlice.actions;

export default userSlice.reducer;
