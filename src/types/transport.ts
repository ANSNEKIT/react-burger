import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TOrderDTO } from '@/contracts/orderDTO';
import type { TUserAuth } from '@/types/types';

export type TFetchMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type TFetchError = Error & {
  status: number;
  message: string;
};

// ============== Fertch Response ============

export type TCustomResponse<T> = Body & {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
  json(): Promise<T>;
};

export type TResponseBody = Response & {
  success: boolean;
  message?: string;
};

export type TResponseUserBody = TResponseBody & {
  accessToken: string;
  refreshToken: string;
  user: TUserAuth;
};

export type TResponseTokenBody = Omit<TResponseUserBody, 'user'>;

export type TIngredientsResponseBody = TResponseBody & {
  data: TIngredientDTO[];
};

export type TCreateOrderResponseBody = TResponseTokenBody & {
  name: string;
  order: TOrderDTO;
};

export type TOrderResponseBody = TResponseBody & {
  orders: TOrderDTO[];
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

export type TChangeUserData = Partial<TRegisterData>;

export type TTokenData = {
  token: string;
};

export type TCreateOrderData = {
  ingredients: string[];
};

export type TOrderData = {
  orderId: string;
};

export type TLoginData = Omit<TRegisterData, 'name'>;
