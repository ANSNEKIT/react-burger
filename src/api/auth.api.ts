import { customFetch, fetchWithRefresh } from './utils';

import type {
  TChangeUserData,
  TLoginData,
  TNewPasswordData,
  TRegisterData,
  TResetPasswordData,
  TResponseUserBody,
  TResponseTokenBody,
  TResponseBody,
  TTokenData,
} from '@/types/transport';
import type { TUserAuth } from '@/types/types';

const resetPassword = async (data: TResetPasswordData): Promise<boolean> => {
  try {
    const res = await customFetch<TResetPasswordData, TResponseBody>(
      'post',
      '/password-reset',
      data
    );
    if (res.success) {
      localStorage.setItem('isEmailConfirmed', `${res.success}`);
    }
    return res.success;
  } catch (_) {
    return false;
  }
};

const newPassword = async (data: TNewPasswordData): Promise<TResponseBody> => {
  return customFetch<TNewPasswordData, TResponseBody>(
    'post',
    '/password-reset/reset',
    data
  );
};

const register = async (data: TRegisterData): Promise<TResponseUserBody> => {
  return customFetch<TRegisterData, TResponseUserBody>(
    'post',
    '/auth/register',
    data
  ).then((data) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  });
};

const login = async (data: TLoginData): Promise<TResponseUserBody> => {
  return customFetch<TLoginData, TResponseUserBody>('post', '/auth/login', data).then(
    (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    }
  );
};

const refreshToken = async (): Promise<Omit<TResponseTokenBody, 'user'>> => {
  const data = {
    token: localStorage.getItem('refreshToken') ?? '',
  };
  try {
    const refreshData = await customFetch<TTokenData, Omit<TResponseTokenBody, 'user'>>(
      'post',
      '/auth/token',
      data
    );
    if (!refreshData.success) {
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      return Promise.reject(refreshData);
    }
    localStorage.setItem('refreshToken', refreshData.refreshToken);
    localStorage.setItem('accessToken', refreshData.accessToken);
    return refreshData;
  } catch (err) {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    return Promise.reject(err);
  }
};

const getUser = async (): Promise<TUserAuth> => {
  try {
    const res = await fetchWithRefresh<TTokenData, TResponseUserBody>(
      'get',
      '/auth/user'
    );
    return res.user;
  } catch (err) {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    return Promise.reject(err);
  }
};

const changeUser = async (data: TChangeUserData): Promise<TResponseBody> => {
  return fetchWithRefresh<TChangeUserData, TResponseBody>('patch', '/auth/user', data);
};

const logout = async (): Promise<TResponseTokenBody> => {
  const token = localStorage.getItem('refreshToken') ?? '';
  try {
    const res = await customFetch<TTokenData, TResponseTokenBody>(
      'post',
      '/auth/logout',
      {
        token,
      }
    );
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return res;
  } catch (err) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    return Promise.reject(err);
  }
};

const isTokenExists = (): boolean => !!localStorage.getItem('accessToken');

export const userApi = {
  resetPassword,
  newPassword,
  register,
  login,
  refreshToken,
  getUser,
  changeUser,
  logout,
  isTokenExists,
};
