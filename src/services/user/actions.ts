import { userApi } from '@/api/auth.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setAuthChecked, setUser } from './reducer';

import type {
  TChangeUserData,
  TLoginData,
  TNewPasswordData,
  TRegisterData,
  TResetPasswordData,
  TSuccessAuthTokenResponse,
  TSuccessResponse,
} from '@/api/types';
import type { TUserAuth } from '@/utils/types';

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

export const newPassword = createAsyncThunk<TSuccessResponse, TNewPasswordData>(
  'user/forgotPassword',
  userApi.newPassword
);

export const changeUser = createAsyncThunk<TSuccessResponse, TChangeUserData>(
  'user/changeUser',
  userApi.changeUser
);

export const logout = createAsyncThunk<TSuccessAuthTokenResponse | null, void>(
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
