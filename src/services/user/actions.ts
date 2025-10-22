import { userApi } from '@/api/auth.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setAuthChecked, setUser } from './reducer';

import type {
  TChangeUserData,
  TLoginData,
  TNewPasswordData,
  TRegisterData,
  TResetPasswordData,
  TResponseBody,
  TResponseTokenBody,
} from '@/types/transport';
import type { TUserAuth } from '@/types/types';

export const login = createAsyncThunk<TUserAuth, TLoginData>(
  'user/login',
  async (data: TLoginData) => {
    const res = await userApi.login(data);
    return res.user;
  }
);

export const register = createAsyncThunk<TUserAuth, TRegisterData>(
  'user/register',
  async (data: TRegisterData) => {
    const res = await userApi.register(data);
    return res.user;
  }
);

export const resetPassword = createAsyncThunk<boolean, TResetPasswordData>(
  'user/forgotPassword',
  userApi.resetPassword
);

export const newPassword = createAsyncThunk<TResponseBody, TNewPasswordData>(
  'user/forgotPassword',
  userApi.newPassword
);

export const changeUser = createAsyncThunk<TResponseBody, TChangeUserData>(
  'user/changeUser',
  userApi.changeUser
);

export const logout = createAsyncThunk<TResponseTokenBody, void>(
  'user/logout',
  userApi.logout
);

export const checkAuth = createAsyncThunk('user/checkAuth', async (_, { dispatch }) => {
  if (userApi.isTokenExists()) {
    const user = await userApi.getUser();

    if (user) {
      dispatch(setUser(user));
      dispatch(setAuthChecked(true));
    } else {
      dispatch(setAuthChecked(true));
    }
  } else {
    dispatch(setAuthChecked(true));
  }
});
