import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TOrder } from '@/services/basket/types';
import type { TUserAuth } from '@/utils/types';

export type TFetchMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

// ============== Fertch Response ============
export type TSuccessResponse = {
  success: boolean;
  message?: string;
};

export type TIngredientsResponse = TSuccessResponse & {
  data: TIngredientDTO[];
};

export type TSuccessAuthTokenResponse = TSuccessResponse & {
  accessToken: string;
  refreshToken: string;
};

export type TSuccessAuthResponse = TSuccessResponse & {
  user: TUserAuth;
};

export type TUserResponse = TSuccessResponse & {
  user: TUserAuth;
};

export type TOrderResponse = TSuccessResponse & {
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
