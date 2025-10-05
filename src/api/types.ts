import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TOrder } from '@/services/basket/types';
import type { TUserAuth } from '@/utils/types';

export type TFetchMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type TFetchError = Error & {
  status: number;
  message: string;
};

// ============== Fertch Response ============
export type TSuccessResponse = Response & {
  success: boolean;
  message?: string;
};

export type TSuccessAuthTokenResponse = TSuccessResponse & {
  accessToken: string;
  refreshToken: string;
};

export type TIngredientsResponse = TSuccessResponse & {
  data: TIngredientDTO[];
};

export type TSuccessAuthResponse = TSuccessResponse &
  TSuccessAuthTokenResponse & {
    user: TUserAuth;
  };

export type TUserResponse = TSuccessResponse &
  TSuccessAuthTokenResponse & {
    user: TUserAuth;
  };

export type TOrderResponse = TSuccessResponse &
  TSuccessAuthTokenResponse & {
    name: string;
    order: TOrder;
  };

// =============== Fetch payload data ============
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

export type TOrderData = {
  ingredients: string[];
};

export type TLoginData = Omit<TRegisterData, 'name'>;
