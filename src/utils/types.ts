import type { TIngredientDTO } from '@/contracts/ingredientDTO';

export enum EIngredientType {
  bun = 'bun',
  main = 'main',
  sauce = 'sauce',
}

export type TIngredientType = `${EIngredientType}`;

export enum EIngredientTypeTitles {
  bun = 'Булки',
  main = 'Начинки',
  sauce = 'Соусы',
}

export type TOrder = {
  id: number;
};

export type TFetchResponse<T> = {
  data: T;
};

export type TIngredientCategoryType = {
  type: TIngredientType;
  items: TIngredientDTO[];
};
