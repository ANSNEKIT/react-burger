import type { EIngredientType, EOrderStatus } from './enums';
import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { SerializedError } from '@reduxjs/toolkit';

export type TLocationState = {
  background: {
    pathname: string;
    param?: string;
  };
};

export type TDragItem = TIngredientDTO & {
  index: number;
};

export type TIngredientType = `${EIngredientType}`;

export type TUserAuth = {
  email: string;
  name: string;
};

export type TIngredientCategoryType = {
  type: TIngredientType;
  items: TIngredientDTO[];
};

export type TMenuItem = {
  id: string;
  type?: string;
  name: string;
  to: string;
};

export type TPayloadAction<T> = {
  payload: T;
  type: string;
  error?: SerializedError;
};

export type TOrderStatus = `${EOrderStatus}`;
