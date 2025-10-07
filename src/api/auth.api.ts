import { customFetch, fetchWithRefresh } from './utils';

import type {
  TLoginData,
  TNewPasswordData,
  TRegisterData,
  TResetPasswordData,
  TSuccessAuthResponse,
  TSuccessAuthTokenResponse,
  TSuccessResponse,
  TTokenData,
  TUserResponse,
} from './types';
import type { TUserAuth } from '@/utils/types';

const resetPassword = async (data: TResetPasswordData): Promise<boolean> => {
  try {
    const res = await customFetch<TResetPasswordData, TSuccessResponse>(
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

const newPassword = async (data: TNewPasswordData): Promise<TSuccessResponse> => {
  return customFetch<TNewPasswordData, TSuccessResponse>(
    'post',
    '/password-reset/reset',
    data
  );
};

const register = async (data: TRegisterData): Promise<TSuccessAuthResponse> => {
  return customFetch<TRegisterData, TSuccessAuthResponse>(
    'post',
    '/auth/register',
    data
  ).then((data) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  });
};

const login = async (data: TLoginData): Promise<TSuccessAuthResponse> => {
  return customFetch<TLoginData, TSuccessAuthResponse>('post', '/auth/login', data).then(
    (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    }
  );
};

const refreshToken = async (): Promise<TSuccessAuthTokenResponse> => {
  const data = {
    token: localStorage.getItem('refreshToken') ?? '',
  };
  return customFetch<TTokenData, TSuccessAuthTokenResponse>(
    'post',
    '/auth/token',
    data
  ).then((refreshData) => {
    if (!refreshData.success) {
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      return Promise.reject(refreshData);
    }
    localStorage.setItem('refreshToken', refreshData.refreshToken);
    localStorage.setItem('accessToken', refreshData.accessToken);
    return refreshData;
  });
};

const getUser = async (): Promise<TUserAuth | null> => {
  try {
    const res = await fetchWithRefresh<TTokenData, TUserResponse>('get', '/auth/user');
    return res.user;
  } catch (_) {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    return null;
  }
};

const changeUser = async (data: TTokenData): Promise<TUserResponse> => {
  return fetchWithRefresh<TTokenData, TUserResponse>('patch', '/auth/user', data);
};

const logout = async (): Promise<TSuccessAuthTokenResponse | null> => {
  const token = localStorage.getItem('refreshToken') ?? '';
  try {
    const res = await customFetch<TTokenData, TSuccessAuthTokenResponse>(
      'post',
      '/auth/logout',
      {
        token,
      }
    );
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return res;
  } catch (_) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return null;
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
