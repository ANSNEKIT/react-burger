import type { EIngredientType } from './enums';
import type { TIngredientDTO } from '@/contracts/ingredientDTO';

export type TLocationState = {
  background: { pathname: string };
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
