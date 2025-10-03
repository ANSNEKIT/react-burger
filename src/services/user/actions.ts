import { userApi } from '@/api/auth.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setAuthChecked, setUser } from './reducer';

import type { TLoginData, TSuccessAuthTokenResponse } from '@/api/types';
import type { TUserAuth } from '@/utils/types';

export const login = createAsyncThunk<TUserAuth, TLoginData>(
  'user/login',
  async (data: TLoginData) => {
    const res = await userApi.login(data);
    return res.user;
  }
);

export const logout = createAsyncThunk<TSuccessAuthTokenResponse, void>(
  'user/logout',
  userApi.logout
);

export const checkAuth = createAsyncThunk('user/checkAuth', async (_, { dispatch }) => {
  if (userApi.isTokenExists()) {
    const user = await userApi.getUser();
    dispatch(setUser(user));
    dispatch(setAuthChecked(true));
  } else {
    dispatch(setAuthChecked(true));
  }
});
