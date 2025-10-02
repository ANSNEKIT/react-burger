import type { TUserAuth } from '@/utils/types';

export type TFetchMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type TFetchResponse<T> = {
  data: T;
};

export type TSuccessResponse = {
  success: boolean;
  message: string;
};

export type TSuccessAuthTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TSuccessAuthResponse = TSuccessAuthTokenResponse & {
  user: TUserAuth;
};

export type TResetPasswordData = {
  email: string;
};

export type TNewPasswordData = {
  password: string;
  token: string;
};

export type TRegisterData = {
  email: string;
  password: string;
  name: string;
};

export type TTokenData = {
  token: string;
};

export type TLoginData = Omit<TRegisterData, 'name'>;

export type TUserResponse = {
  success: boolean;
  user: TUserAuth;
};
