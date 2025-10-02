import { customFetch } from './utils';

import type {
  TFetchResponse,
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

export const resetPasswordApi = (
  email: string
): Promise<TFetchResponse<TSuccessResponse>> => {
  return customFetch<TResetPasswordData, TSuccessResponse>('post', '/password-reset', {
    email,
  });
};

export const newPasswordApi = (
  data: TNewPasswordData
): Promise<TFetchResponse<TSuccessResponse>> => {
  return customFetch<TNewPasswordData, TSuccessResponse>(
    'post',
    '/password-reset/reset',
    data
  );
};

export const registerApi = (
  data: TRegisterData
): Promise<TFetchResponse<TSuccessAuthResponse>> => {
  return customFetch<TRegisterData, TSuccessAuthResponse>(
    'post',
    '/auth/register',
    data
  );
};

export const loginApi = (
  data: TLoginData
): Promise<TFetchResponse<TSuccessAuthResponse>> => {
  return customFetch<TLoginData, TSuccessAuthResponse>('post', '/auth/login', data);
};

export const getTokenApi = (
  data: TTokenData
): Promise<TFetchResponse<TSuccessAuthTokenResponse>> => {
  return customFetch<TTokenData, TSuccessAuthTokenResponse>('post', '/auth/token', data);
};

export const getUserApi = (data: TTokenData): Promise<TFetchResponse<TUserResponse>> => {
  return customFetch<TTokenData, TUserResponse>('get', '/auth/user', data);
};

export const changeUserApi = (
  data: TTokenData
): Promise<TFetchResponse<TUserResponse>> => {
  return customFetch<TTokenData, TUserResponse>('patch', '/auth/user', data);
};

export const logoutApi = (
  data: TTokenData
): Promise<TFetchResponse<TSuccessAuthTokenResponse>> => {
  return customFetch<TTokenData, TSuccessAuthTokenResponse>(
    'post',
    '/auth/logout',
    data
  );
};
